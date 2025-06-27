import { z } from "zod";

const sizeSchema = z.object({
  name: z.string().min(1, "Size name is required"),
});
export default sizeSchema;
