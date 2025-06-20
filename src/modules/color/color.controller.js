import ProductColor from "./color.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import MESSAGES from "../../common/constants/message.js";

export const createProductColor = handleAsync(async (req, res, next) => {
  // const existing = await ProductColor.findOne({ title: req.body.title });
  // if (existing) next(createError(400, "This ProductColor already exists"));
  const data = await ProductColor.create(req.body);
  if (!data) next(createError(400, MESSAGES.COLOR.CREATE_ERROR));
  return res.json(
    createResponse(true, 201, MESSAGES.COLOR.CREATE_SUCCESS, data)
  );
});
export const getProductColor = handleAsync(async (req, res, next) => {
  const data = await ProductColor.find();
  return res.json(createResponse(true, 200, MESSAGES.COLOR.GET_SUCCESS, data));
});
export const getDetailProductColor = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(createError(false, 404, MESSAGES.COLOR.NOT_FOUND));
  }
  const data = await ProductColor.findById(id);
  return res.json(
    createResponse(true, 200, MESSAGES.COLOR.GET_BY_ID_SUCCESS, data)
  );
});
export const updateProductColor = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await ProductColor.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json(
      createResponse(true, 200, MESSAGES.COLOR.UPDATE_SUCCESS, data)
    );
  }
  next(createError(false, 404, MESSAGES.COLOR.UPDATE_ERROR));
});
export const deleteProductColor = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await ProductColor.findByIdAndDelete(id);
    return res.json(createResponse(true, 200, MESSAGES.COLOR.DELETE_SUCCESS));
  }
  next(createError(false, 404, MESSAGES.COLOR.DELETE_ERROR));
});

export const softDeleteProductColor = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await ProductColor.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return res.json(
      createResponse(true, 200, MESSAGES.COLOR.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.COLOR.SOFT_DELETE_FAILED));
});
export const restoreProductColor = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await ProductColor.findByIdAndUpdate(id, {
      deletedAt: null,
    });
    return res.json(createResponse(true, 200, MESSAGES.COLOR.RESTORE_SUCCESS));
  }
  next(createError(false, 404, MESSAGES.COLOR.RESTORE_FAILED));
});
