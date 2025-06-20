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
    .populate("brand", "title")
    .populate("subCategory", "title")
    .populate("category", "title");
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
