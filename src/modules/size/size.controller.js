import ProductSize from "./size.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";

export const createProductSize = handleAsync(async (req, res, next) => {
  // const existing = await ProductSize.findOne({ title: req.body.title });
  // if (existing) next(createError(400, "This ProductSize already exists"));
  const data = await ProductSize.create(req.body);
  if (!data) next(createError(400, "Create ProductSize failed!"));
  return res.json(
    createResponse(true, 201, "Create ProductSize Successfully!", data)
  );
});
export const getProductSize = handleAsync(async (req, res, next) => {
  const data = await ProductSize.find();
  return res.json(
    createResponse(true, 200, "Get list ProductSize successfully!", data)
  );
});
export const getDetailProductSize = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(createError(false, 404, "Not found ProductSize!"));
  }
  const data = await ProductSize.findById(id);
  return res.json(
    createResponse(true, 200, "Get ProductSize detail successfully!", data)
  );
});
export const updateProductSize = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await ProductSize.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json(
      createResponse(true, 200, "Update ProductSize successfully!", data)
    );
  }
  next(createError(false, 404, "ProductSize update failed!"));
});
export const deleteProductSize = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await ProductSize.findByIdAndDelete(id);
    return res.json(
      createResponse(true, 200, "Delete ProductSize successfully!")
    );
  }
  next(createError(false, 404, "ProductSize delete failed!"));
});

export const softDeleteProductSize = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await ProductSize.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return res.json(
      createResponse(true, 200, "Hidden ProductSize successfully!")
    );
  }
  next(createError(false, 404, "Hidden ProductSize failed"));
});
export const restoreProductSize = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await ProductSize.findByIdAndUpdate(id, {
      deletedAt: null,
    });
    return res.json(
      createResponse(true, 200, "Restore ProductSize successfully!")
    );
  }
  next(createError(false, 404, "Restore ProductSize failed"));
});
