import AttributeValue from "./attribute-value.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import MESSAGES from "../../common/constants/message.js";

export const createAttributeValue = handleAsync(async (req, res, next) => {
  const data = await AttributeValue.create(req.body);
  if (!data) next(createError(400, MESSAGES.ATTRIBUTE_VALUE.CREATE_ERROR));
  return res.json(
    createResponse(true, 201, MESSAGES.ATTRIBUTE_VALUE.CREATE_SUCCESS, data)
  );
});
export const getAttributeValue = handleAsync(async (req, res, next) => {
  const data = await AttributeValue.find();
  return res.json(
    createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.GET_SUCCESS, data)
  );
});
export const getAttributeValueById = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(createError(false, 404, MESSAGES.ATTRIBUTE_VALUE.NOT_FOUND));
  }
  const data = await AttributeValue.findById(id);

  return res.json(
    createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.GET_BY_ID_SUCCESS, data)
  );
});
export const updateAttributeValue = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await AttributeValue.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.UPDATE_SUCCESS, data)
    );
  }
  next(createError(false, 404, MESSAGES.ATTRIBUTE_VALUE.UPDATE_ERROR));
});
export const deleteAttributeValue = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await AttributeValue.findByIdAndDelete(id);
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.ATTRIBUTE_VALUE.DELETE_ERROR));
});

export const softDeleteAttributeValue = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await AttributeValue.findOneAndUpdate(
      {
        _id: id,
        deletedAt: null,
      },
      {
        deletedAt: new Date(),
      }
    );
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.ATTRIBUTE_VALUE.SOFT_DELETE_FAILED));
});
export const restoreAttributeValue = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const foundedAttribute = await AttributeValue.findOneAndUpdate(
      {
        _id: id,
        deletedAt: { $ne: null },
      },
      {
        deletedAt: null,
      }
    );
    if (!foundedAttribute) {
      return next(
        createError(false, 404, MESSAGES.ATTRIBUTE_VALUE.RESTORE_FAILED)
      );
    }
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.RESTORE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.ATTRIBUTE_VALUE.RESTORE_FAILED));
});
