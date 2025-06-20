import ProductSize from "./size.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import MESSAGES from "../../common/constants/message.js";

export const createProductSize = handleAsync(async (req, res, next) => {
  // const existing = await ProductSize.findOne({ title: req.body.title });
  // if (existing) next(createError(400, "This ProductSize already exists"));
  const data = await ProductSize.create(req.body);
  if (!data) next(createError(400, MESSAGES.SIZE.CREATE_ERROR));
  return res.json(
    createResponse(true, 201, MESSAGES.SIZE.CREATE_SUCCESS, data)
  );
});
export const getProductSize = handleAsync(async (req, res, next) => {
  const data = await ProductSize.find();
  return res.json(createResponse(true, 200, MESSAGES.SIZE.GET_SUCCESS, data));
});
export const getDetailProductSize = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(createError(false, 404, MESSAGES.SIZE.NOT_FOUND));
  }
  const data = await ProductSize.findById(id);
  return res.json(
    createResponse(true, 200, MESSAGES.SIZE.GET_BY_ID_SUCCESS, data)
  );
});
export const updateProductSize = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await ProductSize.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json(
      createResponse(true, 200, MESSAGES.SIZE.UPDATE_SUCCESS, data)
    );
  }
  next(createError(false, 404, MESSAGES.SIZE.UPDATE_ERROR));
});
export const deleteProductSize = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await ProductSize.findByIdAndDelete(id);
    return res.json(createResponse(true, 200, MESSAGES.SIZE.DELETE_SUCCESS));
  }
  next(createError(false, 404, MESSAGES.SIZE.DELETE_ERROR));
});

export const softDeleteProductSize = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await ProductSize.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return res.json(
      createResponse(true, 200, MESSAGES.SIZE.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.SIZE.SOFT_DELETE_FAILED));
});
export const restoreProductSize = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await ProductSize.findByIdAndUpdate(id, {
      deletedAt: null,
    });
    return res.json(createResponse(true, 200, MESSAGES.SIZE.RESTORE_SUCCESS));
  }
  next(createError(false, 404, MESSAGES.SIZE.RESTORE_FAILED));
});
