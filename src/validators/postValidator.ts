import { z } from "zod";
import mongoose from "mongoose";

export const validatePost = z.object({
  _id: z.string().uuid().optional(),
  title: z
    .string()
    .min(1)
    .max(50, { message: "Title must be at most 50 characters" }),
  tags: z.array(z.string()).min(1, { message: "At least one tag is required" }),
  image: z.string().optional(),
  slug: z.string().min(1, { message: "Slug must be at least 1 character" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(50, { message: "Description must be at most 50 characters" }),
  sanitizedHTML: z.string().min(1, { message: "HTML content required" }),
  markdown: z.string().min(1, { message: "Markdown content required" }),
  accessedBy: z.enum(["user", "guest"]),
  published: z.boolean().default(false),
  readTime: z.number().min(1), // in minutes
  category: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Invalid category ID",
    })
    .transform((value) => new mongoose.Types.ObjectId(value)),
});

export type Post = z.infer<typeof validatePost>;
