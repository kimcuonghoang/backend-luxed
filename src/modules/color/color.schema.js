import { z } from "zod";

const colorSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  hexCode: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Invalid hex color code"),

  deletedAt: z.date().optional(),
});

export default colorSchema;
