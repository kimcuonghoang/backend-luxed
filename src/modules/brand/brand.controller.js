import Brand from "./brand.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";

export const createBrand = handleAsync(async (req, res, next) => {
  const data = await Brand.create(req.body);
  if (!data) next(createError(400, "Create Brand failed!"));
  return res.json(
    createResponse(true, 201, "Create Brand Successfully!", data)
  );
});
export const getBrand = handleAsync(async (req, res, next) => {
  const data = await Brand.find();
  return res.json(
    createResponse(true, 200, "Get list Brand successfully!", data)
  );
});
export const getDetailBrand = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(createError(false, 404, "Not found Brand!"));
  }
  const data = await Brand.findById(id);
  return res.json(
    createResponse(true, 200, "Get Brand detail successfully!", data)
  );
});
export const updateBrand = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Brand.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(
      createResponse(true, 200, "Update Brand successfully!", data)
    );
  }
  next(createError(false, 404, "Brand update failed!"));
});
export const deleteBrand = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Brand.findByIdAndDelete(id);
    return res.json(createResponse(true, 200, "Delete Brand successfully!"));
  }
  next(createError(false, 404, "Brand delete failed!"));
});

export const softDeleteBrand = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Brand.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return res.json(createResponse(true, 200, "Hidden Brand successfully!"));
  }
  next(createError(false, 404, "Hidden Brand failed"));
});
export const restoreBrand = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Brand.findByIdAndUpdate(id, {
      deletedAt: null,
    });
    return res.json(createResponse(true, 200, "Restore Brand successfully!"));
  }
  next(createError(false, 404, "Restore Brand failed"));
});
