import Attribute from "./attribute.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import MESSAGES from "../../common/constants/message.js";
import AttributeValue from "../attribute-value/attribute-value.model.js";
import Variant from "../variant/variant.model.js";
import Product from "../product/product.model.js";

export const createAttribute = handleAsync(async (req, res, next) => {
  const data = await Attribute.create(req.body);
  if (!data) next(createError(400, MESSAGES.ATTRIBUTE.CREATE_ERROR));
  return res.json(
    createResponse(true, 201, MESSAGES.ATTRIBUTE.CREATE_SUCCESS, data)
  );
});
export const getAllAttribute = handleAsync(async (req, res, next) => {
  const data = await Attribute.find();
  return res.json(
    createResponse(true, 200, MESSAGES.ATTRIBUTE.GET_SUCCESS, data)
  );
});
export const getAttributeById = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(createError(false, 404, MESSAGES.ATTRIBUTE.NOT_FOUND));
  }
  const data = await Attribute.findById(id);

  return res.json(
    createResponse(true, 200, MESSAGES.ATTRIBUTE.GET_BY_ID_SUCCESS, data)
  );
});
export const updateAttribute = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Attribute.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE.UPDATE_SUCCESS, data)
    );
  }
  next(createError(false, 404, MESSAGES.ATTRIBUTE.UPDATE_ERROR));
});
export const deleteAttribute = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    // Kiểm tra liên kết AttributeValue
    const valueCount = await AttributeValue.countDocuments({ attributeId: id });
    if (valueCount > 0)
      return next(
        createError(400, "Không thể xoá: Đang có giá trị thuộc tính sử dụng!")
      );
    // Kiểm tra liên kết Variant
    const variantCount = await Variant.countDocuments({ attributeId: id });
    if (variantCount > 0)
      return next(createError(400, "Không thể xoá: Đang có biến thể sử dụng!"));
    // Kiểm tra liên kết ProductVariant embedded
    const productVariantCount = await Product.countDocuments({
      "variants.attributes.attributeId": id,
    });
    if (productVariantCount > 0)
      return next(
        createError(400, "Không thể xoá: Đang có biến thể sản phẩm sử dụng!")
      );
    await Attribute.findByIdAndDelete(id);
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE.DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.ATTRIBUTE.DELETE_ERROR));
});

export const softDeleteAttribute = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Attribute.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.ATTRIBUTE.SOFT_DELETE_FAILED));
});
export const restoreAttribute = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Attribute.findByIdAndUpdate(id, {
      deletedAt: null,
    });
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE.RESTORE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.ATTRIBUTE.RESTORE_FAILED));
});
