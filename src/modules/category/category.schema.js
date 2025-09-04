import { z } from "zod";

const categorySchema = z.object({
  title: z.string().min(1, "Title is required!"),
  description: z.string().optional(),
  slug: z.string().min(1, "Slug is required!"),
  logoUrl: z.string().url("Invalid URL").optional(),
  deleteAt: z.date().nullable().optional(),
});

export default categorySchema;
