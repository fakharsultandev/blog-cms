import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  getPostBySlug,
  updatePost,
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

export default router; // export the router
