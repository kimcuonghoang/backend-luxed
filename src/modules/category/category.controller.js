import Category from "./category.model.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import findByIdCategory from "./category.service.js";

export const createCategory = handleAsync(async (req, res, next) => {
  const existing = await Category.findOne({ title: req.body.title });
  if (existing) next(createError(400, "This category already exists"));
  const data = await Category.create(req.body);
  if (!data) next(createError(400, "Create Category failed!"));
  return res.json(
    createResponse(true, 201, "Create Category Successfully!", data)
  );
});
export const getCategory = handleAsync(async (req, res, next) => {
  const data = await Category.find();
  return res.json(
    createResponse(true, 200, "Get list category successfully!", data)
  );
});
export const getDetailCategory = handleAsync(async (req, res, next) => {
  const data = await findByIdCategory(req.params.id);
  if (!data) {
    next(createError(404, "Category not found!"));
  }
  return res.json(
    createResponse(true, 200, "Get category detail successfully!", data)
  );
});
export const updateCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Category.findByIdAndUpdate(id, req.body);
    return res.json(
      createResponse(true, 200, "Update category successfully!", data)
    );
  }
  next(createError(false, 404, "Category update failed!"));
});
export const deleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Category.findByIdAndDelete(id);
    return res.json(createResponse(true, 200, "Delete category successfully!"));
  }
  next(createError(false, 404, "Category delete failed!"));
});

export const softDeleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Category.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return res.json(createResponse(true, 200, "Hiden category successfully!"));
  }
  next(createError(false, 404, "Hiden category failed"));
});
export const restoreCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Category.findByIdAndUpdate(id, {
      deletedAt: null,
    });
    return res.json(
      createResponse(true, 200, "Restore category successfully!")
    );
  }
  next(createError(false, 404, "Restore category failed"));
});
