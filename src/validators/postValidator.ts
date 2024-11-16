import { z } from "zod";
import mongoose from "mongoose";
import Category from "../models/Category";

// Async category validation
const categoryValidation = z.string().refine(
  async (value) => {
    // Check if the provided value is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("Invalid category ID");
    }

    const exists = await Category.exists({ _id: value });
    if (!exists) {
      throw new Error("Category does not exist");
    }

    return true;
  },
  {
    message: "Invalid category",
  }
);

export const validatePost = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  tags: z.array(z.string()).min(1, { message: "Tags are required" }),
  readTime: z.number().min(1, { message: "Read time is required" }),
  isPublished: z.boolean().default(false),
  description: z.string().min(1, { message: "Description is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  access: z.enum(["user", "guest"]),
  category: categoryValidation, // Apply the category validation here
});
