import ProductColor from "./color.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";

export const createProductColor = handleAsync(async (req, res, next) => {
  // const existing = await ProductColor.findOne({ title: req.body.title });
  // if (existing) next(createError(400, "This ProductColor already exists"));
  const data = await ProductColor.create(req.body);
  if (!data) next(createError(400, "Create ProductColor failed!"));
  return res.json(
    createResponse(true, 201, "Create ProductColor Successfully!", data)
  );
});
export const getProductColor = handleAsync(async (req, res, next) => {
  const data = await ProductColor.find();
  return res.json(
    createResponse(true, 200, "Get list ProductColor successfully!", data)
  );
});
export const getDetailProductColor = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(createError(false, 404, "Not found ProductColor!"));
  }
  const data = await ProductColor.findById(id);
  return res.json(
    createResponse(true, 200, "Get ProductColor detail successfully!", data)
  );
});
export const updateProductColor = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await ProductColor.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json(
      createResponse(true, 200, "Update ProductColor successfully!", data)
    );
  }
  next(createError(false, 404, "ProductColor update failed!"));
});
export const deleteProductColor = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await ProductColor.findByIdAndDelete(id);
    return res.json(
      createResponse(true, 200, "Delete ProductColor successfully!")
    );
  }
  next(createError(false, 404, "ProductColor delete failed!"));
});

export const softDeleteProductColor = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await ProductColor.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return res.json(
      createResponse(true, 200, "Hidden ProductColor successfully!")
    );
  }
  next(createError(false, 404, "Hidden ProductColor failed"));
});
export const restoreProductColor = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await ProductColor.findByIdAndUpdate(id, {
      deletedAt: null,
    });
    return res.json(
      createResponse(true, 200, "Restore ProductColor successfully!")
    );
  }
  next(createError(false, 404, "Restore ProductColor failed"));
});
