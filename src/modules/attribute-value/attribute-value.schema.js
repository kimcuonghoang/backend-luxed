import { z } from "zod";

export const attributeValueSchema = z.object({
  value: z.string().min(1, "Value is required"),
  attributeId: z.string().min(1, "Attribute ID is required"),
  deletedAt: z.date().optional(),
});
