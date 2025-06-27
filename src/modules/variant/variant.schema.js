import { z } from "zod";

const variantSchema = z.object({
  product: z.string().min(1, "Product ID is required"),
  price: z.number().min(0, "Variant price must be a positive number"),
  stock: z
    .number()
    .int()
    .min(0, "Variant stock must be a non-negative integer"),

  color: z.string().min(1, "Color ID is required"),
  size: z.string().min(1, "Size ID is required"),
  sku: z.string().optional(),
  image: z.string().url("Invalid image URL").optional(),
  soldCount: z.number().default(0),
  oldPrice: z.number().optional(),
  deletedAt: z.date().optional(),
});

export default variantSchema;
