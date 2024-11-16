import express from "express";
import { getAllPost } from "../controllers/postController";

const router = express.Router();

router.get("/", getAllPost);

export default router; // export the router
