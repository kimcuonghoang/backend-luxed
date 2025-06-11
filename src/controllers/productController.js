import Product from "../models/Product.js";
import createError from "../utils/error.js";
import handleAsync from "../utils/handleAsync.js";
import createResponse from "../utils/response.js";

export const createProduct = handleAsync(async (req, res, next) => {
  // const existing = await Product.findOne({ title: req.body.title });
  // if (existing) next(createError(400, "This Product already exists"));
  const data = await Product.create(req.body);
  if (!data) next(createError(400, "Create Product failed!"));
  return res.json(
    createResponse(true, 201, "Create Product Successfully!", data)
  );
});
export const getProduct = handleAsync(async (req, res, next) => {
  const data = await Product.find();
  return res.json(
    createResponse(true, 200, "Get list Product successfully!", data)
  );
});
export const getDetailProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(createError(false, 404, "Not found Product!"));
  }
  const data = await Product.findById(id);
  return res.json(
    createResponse(true, 200, "Get Product detail successfully!", data)
  );
});
export const updateProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(
      createResponse(true, 200, "Update Product successfully!", data)
    );
  }
  next(createError(false, 404, "Product update failed!"));
});
export const deleteProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Product.findByIdAndDelete(id);
    return res.json(createResponse(true, 200, "Delete Product successfully!"));
  }
  next(createError(false, 404, "Product delete failed!"));
});

export const softDeleteProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Product.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return res.json(createResponse(true, 200, "Hidden Product successfully!"));
  }
  next(createError(false, 404, "Hidden Product failed"));
});
export const restoreProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Product.findByIdAndUpdate(id, {
      deletedAt: null,
    });
    return res.json(createResponse(true, 200, "Restore Product successfully!"));
  }
  next(createError(false, 404, "Restore Product failed"));
});
