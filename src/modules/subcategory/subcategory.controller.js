import SubCategory from "./subcategory.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import MESSAGES from "../../common/constants/message.js";

export const createSubCategory = handleAsync(async (req, res, next) => {
  const existing = await SubCategory.findOne({ title: req.body.title });
  if (existing)
    next(createError(400, MESSAGES.SUBCATEGORY.CREATE_ERROR_EXISTS));
  const { parentCategoryId } = req.body;
  if (!parentCategoryId)
    return next(createError(400, MESSAGES.SUBCATEGORY.CREATE_ERROR));
  const data = await SubCategory.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.SUBCATEGORY.CREATE_SUCCESS, data)
  );
});
export const getSubCategory = handleAsync(async (req, res, next) => {
  const { parentCategoryId } = req.query;
  const filter = parentCategoryId ? { parentCategoryId } : {};
  const data = await SubCategory.find(filter);
  if (!data && data?.length === 0) {
    next(createError(404, MESSAGES.SUBCATEGORY.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.SUBCATEGORY.GET_SUCCESS, data)
  );
});
export const getDetailSubCategory = handleAsync(async (req, res, next) => {
  const data = await SubCategory.findById(req.params.id);
  if (!data) {
    next(createError(404, MESSAGES.SUBCATEGORY.GET_BY_ID_FAILED));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.SUBCATEGORY.GET_BY_ID_SUCCESS, data)
  );
});
export const updateSubCategory = handleAsync(async (req, res, next) => {
  const data = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!data) {
    return next(createError(false, 404, MESSAGES.SUBCATEGORY.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.SUBCATEGORY.UPDATE_SUCCESS, data)
  );
});
export const deleteSubCategory = handleAsync(async (req, res, next) => {
  const data = await SubCategory.findByIdAndDelete(req.params.id);
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.SUBCATEGORY.DELETE_SUCCESS, data)
    );
  next(createError(false, 404, MESSAGES.SUBCATEGORY.DELETE_FAILED));
});

export const softDeleteSubCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await SubCategory.findOneAndUpdate(
      { _id: id },
      {
        deletedAt: new Date(),
      },
      { new: true }
    );
    return res.json(
      createResponse(true, 200, MESSAGES.SUBCATEGORY.SOFT_DELETE_SUCCESS, data)
    );
  }
  next(createError(false, 404, MESSAGES.SUBCATEGORY.SOFT_DELETE_FAILED));
});
export const restoreSubCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await SubCategory.findOneAndUpdate(
      { _id: id },
      {
        deletedAt: null,
      },
      { new: true }
    );
    return res.json(
      createResponse(true, 200, MESSAGES.SUBCATEGORY.RESTORE_SUCCESS, data)
    );
  }
  next(createError(false, 404, MESSAGES.SUBCATEGORY.RESTORE_FAILED));
});
