import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(3, "Fullname must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum(["admin", "member"]).default("member"),
  avatar: z
    .string()
    .url("Avatar must be a valid URL")
    .default(
      "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    ),
  social: z
    .object({
      facebook: z.string().url("Invalid Facebook URL").optional(),
      twitter: z.string().url("Invalid Twitter URL").optional(),
      instagram: z.string().url("Invalid Instagram URL").optional(),
      youtube: z.string().url("Invalid YouTube URL").optional(),
      tiktok: z.string().url("Invalid TikTok URL").optional(),
    })
    .default({}),
  isActive: z.boolean().default(true),
  isVerifyEmail: z.boolean().default(false),
  isVerifyPhoneNumber: z.boolean().default(false),
  is2StepVerify: z.boolean().default(false),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
