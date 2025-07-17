import AttributeValue from "./attribute-value.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import MESSAGES from "../../common/constants/message.js";
import Variant from "../variant/variant.model.js";
import Product from "../product/product.model.js";

export const createAttributeValue = handleAsync(async (req, res, next) => {
  const data = await AttributeValue.create(req.body);
  if (!data) next(createError(400, MESSAGES.ATTRIBUTE_VALUE.CREATE_ERROR));
  return res.json(
    createResponse(true, 201, MESSAGES.ATTRIBUTE_VALUE.CREATE_SUCCESS, data)
  );
});
export const getAttributeValue = handleAsync(async (req, res, next) => {
  const { attributeId } = req.query;
  let filter = {};
  if (attributeId) filter.attributeId = attributeId;
  const data = await AttributeValue.find(filter);
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
    // Kiểm tra liên kết Variant
    const variantCount = await Variant.countDocuments({ valueId: id });
    if (variantCount > 0)
      return next(createError(400, "Không thể xoá: Đang có biến thể sử dụng!"));
    // Kiểm tra liên kết ProductVariant embedded
    const productVariantCount = await Product.countDocuments({
      "variants.attributes.valueId": id,
    });
    if (productVariantCount > 0)
      return next(
        createError(400, "Không thể xoá: Đang có biến thể sản phẩm sử dụng!")
      );
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
