import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  getPostBySlug,
  updatePost,
  updatePostField,
} from "../controllers/postController";
import authMiddleware from "../middlewares/auth";

const router = express.Router();

// Public Routes
router.get("/", getAllPost);
router.get("/slug/:slug", getPostBySlug);
router.get("/:id", getPostById);

// Protected Routes
router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id", authMiddleware, updatePost);
router.patch("/:id", authMiddleware, updatePostField);

export default router; // export the router
