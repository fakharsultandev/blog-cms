import mongoose from "mongoose";
import { z } from "zod";

// Async validation function for ObjectId
export const validateObjectId = z
  .string()
  .refine(async (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return false; // Instead of throwing an error, return false if invalid
    }
    return true; // Return true if valid
  }, {
    message: "Invalid ID",
  });
