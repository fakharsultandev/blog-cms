import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController";
import authMiddleware from "../middlewares/auth";

const router = express.Router();

// Public Routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Protected Routes
router.post("/", authMiddleware, createCategory);
router.delete("/:id", authMiddleware, deleteCategory);
router.put("/:id", authMiddleware, updateCategory);

export default router; // export the router
