import Variant from "./variant.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import MESSAGES from "../../common/constants/message.js";

export const createVariant = handleAsync(async (req, res, next) => {
  const data = await Variant.create(req.body);

  if (!data) next(createError(400, MESSAGES.VARIANT.CREATE_ERROR));
  return res.json(
    createResponse(true, 201, MESSAGES.VARIANT.CREATE_SUCCESS, data)
  );
});
export const getVariant = handleAsync(async (req, res, next) => {
  const data = await Variant.find().populate("product");

  return res.json(
    createResponse(true, 200, MESSAGES.VARIANT.GET_SUCCESS, data)
  );
});
export const getDetailVariant = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(createError(false, 404, MESSAGES.VARIANT.NOT_FOUND));
  }
  const data = await Variant.findById(id);
  return res.json(
    createResponse(true, 200, MESSAGES.VARIANT.GET_BY_ID_SUCCESS, data)
  );
});
export const updateVariant = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Variant.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(
      createResponse(true, 200, MESSAGES.VARIANT.UPDATE_SUCCESS, data)
    );
  }
  next(createError(false, 404, MESSAGES.VARIANT.UPDATE_ERROR));
});
export const deleteVariant = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Variant.findByIdAndDelete(id);
    return res.json(createResponse(true, 200, MESSAGES.VARIANT.DELETE_SUCCESS));
  }
  next(createError(false, 404, MESSAGES.VARIANT.DELETE_ERROR));
});

export const softDeleteVariant = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Variant.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return res.json(
      createResponse(true, 200, MESSAGES.VARIANT.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.VARIANT.SOFT_DELETE_FAILED));
});
export const restoreVariant = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Variant.findByIdAndUpdate(id, {
      deletedAt: null,
    });
    return res.json(
      createResponse(true, 200, MESSAGES.VARIANT.RESTORE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.VARIANT.RESTORE_FAILED));
});

export const getVariantsByProduct = handleAsync(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId) {
    return next(createError(true, 400, "Thiếu productId"));
  }
  const variants = await Variant.find({ product: productId })
    .populate("attributeId")
    .populate("valueId");
  return res.json(
    createResponse(true, 200, "Lấy biến thể theo sản phẩm thành công", variants)
  );
});
