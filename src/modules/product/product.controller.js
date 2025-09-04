import Product from "./product.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import MESSAGES from "../../common/constants/message.js";

export const createProduct = handleAsync(async (req, res, next) => {
  // const existing = await Product.findOne({ title: req.body.title });
  // if (existing) next(createError(400, "This Product already exists"));
  const data = await Product.create(req.body);
  if (!data) next(createError(400, MESSAGES.PRODUCT.CREATE_ERROR));
  return res.json(
    createResponse(true, 201, MESSAGES.PRODUCT.CREATE_SUCCESS, data)
  );
});
export const getProduct = handleAsync(async (req, res, next) => {
  const data = await Product.find();
  return res.json(
    createResponse(true, 200, MESSAGES.PRODUCT.GET_SUCCESS, data)
  );
});
export const getDetailProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(createError(false, 404, MESSAGES.PRODUCT.NOT_FOUND));
  }
  const data = await Product.findById(id)
    .populate("subCategory", "title")
    .populate("category", "title")
    .populate({
      path: "variants.attributes.attributeId",
      model: "Attribute",
    })
    .populate({
      path: "variants.attributes.valueId",
      model: "AttributeValue",
    });
  return res.json(
    createResponse(true, 200, MESSAGES.PRODUCT.GET_BY_ID_SUCCESS, data)
  );
});
export const updateProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(
      createResponse(true, 200, MESSAGES.PRODUCT.UPDATE_SUCCESS, data)
    );
  }
  next(createError(false, 404, MESSAGES.PRODUCT.UPDATE_ERROR));
});
export const deleteProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Product.findByIdAndDelete(id);
    return res.json(createResponse(true, 200, MESSAGES.PRODUCT.DELETE_SUCCESS));
  }
  next(createError(false, 404, MESSAGES.PRODUCT.DELETE_ERROR));
});

export const softDeleteProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Product.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return res.json(
      createResponse(true, 200, MESSAGES.PRODUCT.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.PRODUCT.SOFT_DELETE_FAILED));
});
export const restoreProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Product.findByIdAndUpdate(id, {
      deletedAt: null,
    });
    return res.json(
      createResponse(true, 200, MESSAGES.PRODUCT.RESTORE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.PRODUCT.RESTORE_FAILED));
});

// ====== VARIANT API FOR PRODUCT ======

// Helper: so sánh 2 mảng attributes (dạng [{attributeId, valueId}]) bất kể thứ tự
function attributesEqual(a1, a2) {
  if (a1.length !== a2.length) return false;
  const sortFn = (a, b) =>
    String(a.attributeId).localeCompare(String(b.attributeId));
  const s1 = JSON.stringify([...a1].sort(sortFn));
  const s2 = JSON.stringify([...a2].sort(sortFn));
  return s1 === s2;
}

// Thêm variant mới cho sản phẩm
export const addProductVariant = handleAsync(async (req, res, next) => {
  const { id } = req.params; // productId
  const { attributes, price, oldPrice, stock, sku } = req.body;
  if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
    return next(createError(400, "Thiếu thuộc tính cho biến thể"));
  }
  const product = await Product.findById(id);
  if (!product) return next(createError(404, "Không tìm thấy sản phẩm"));
  // Kiểm tra trùng lặp
  const isDuplicate = product.variants.some((v) =>
    attributesEqual(v.attributes, attributes)
  );
  if (isDuplicate)
    return next(
      createError(400, "Biến thể với các thuộc tính này đã tồn tại!")
    );
  // Thêm mới
  product.variants.push({ attributes, price, oldPrice, stock, sku });
  await product.save();
  return res.json(
    createResponse(
      true,
      201,
      "Thêm biến thể thành công",
      product.variants[product.variants.length - 1]
    )
  );
});

// Lấy danh sách variants của sản phẩm
export const getProductVariants = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("variants.attributes.attributeId")
    .populate("variants.attributes.valueId");
  if (!product) return next(createError(404, "Không tìm thấy sản phẩm"));
  return res.json(
    createResponse(
      true,
      200,
      "Lấy danh sách biến thể thành công",
      product.variants
    )
  );
});

// Lấy chi tiết 1 variant embedded trong Product
export const getProductVariantDetail = handleAsync(async (req, res, next) => {
  const { id, variantId } = req.params;
  const product = await Product.findById(id)
    .populate("variants.attributes.attributeId")
    .populate("variants.attributes.valueId");
  if (!product) return next(createError(404, "Không tìm thấy sản phẩm"));
  const variant = product.variants.id(variantId);
  if (!variant) return next(createError(404, "Không tìm thấy biến thể"));
  return res.json(
    createResponse(true, 200, "Lấy chi tiết biến thể thành công", variant)
  );
});

// Cập nhật một variant
export const updateProductVariant = handleAsync(async (req, res, next) => {
  const { id, variantId } = req.params;
  const { attributes, price, oldPrice, stock, sku } = req.body;
  const product = await Product.findById(id);
  if (!product) return next(createError(404, "Không tìm thấy sản phẩm"));
  const variant = product.variants.id(variantId);
  if (!variant) return next(createError(404, "Không tìm thấy biến thể"));
  // Kiểm tra trùng lặp (trừ chính nó)
  const isDuplicate = product.variants.some(
    (v) =>
      v._id.toString() !== variantId &&
      attributesEqual(v.attributes, attributes)
  );
  if (isDuplicate)
    return next(
      createError(400, "Biến thể với các thuộc tính này đã tồn tại!")
    );
  variant.attributes = attributes;
  variant.price = price;
  variant.oldPrice = oldPrice;
  variant.stock = stock;
  variant.sku = sku;
  await product.save();
  return res.json(
    createResponse(true, 200, "Cập nhật biến thể thành công", variant)
  );
});

// Xoá một variant
export const deleteProductVariant = handleAsync(async (req, res, next) => {
  const { id, variantId } = req.params;
  const product = await Product.findById(id);
  if (!product) return next(createError(404, "Không tìm thấy sản phẩm"));
  const variant = product.variants.id(variantId);
  if (!variant) return next(createError(404, "Không tìm thấy biến thể"));
  variant.remove();
  await product.save();
  return res.json(createResponse(true, 200, "Xoá biến thể thành công"));
});
