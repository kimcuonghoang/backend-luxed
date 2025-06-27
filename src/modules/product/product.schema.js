import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.string().min(1, "Category ID is required"),
  subCategory: z.string().optional(),
  brandId: z.string().optional(),

  image: z.string(z.string().url("Invalid image URL")).optional(),
  attributes: z
    .array(
      z.object({
        attributeId: z.string().min(1, "Attribute ID is required"),
        value: z.string().min(1, "Value is required"),
      })
    )
    .optional(),
  variants: z
    .array(
      z.object({
        name: z.string().min(1, "Variant name is required"),
        price: z.number().min(0, "Variant price must be a positive number"),
        stock: z
          .number()
          .int()
          .min(0, "Variant stock must be a non-negative integer"),
        attributes: z
          .array(
            z.object({
              attributeId: z.string().min(1, "Attribute ID is required"),
              value: z.string().min(1, "Value is required"),
            })
          )
          .optional(),
      })
    )
    .optional(),
  deletedAt: z.date().optional(),
});

export default productSchema;
