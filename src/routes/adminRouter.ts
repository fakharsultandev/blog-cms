import express from "express";
import {
  loginAdmin,
  registerAdmin,
  updateAdmin,
} from "../controllers/adminController";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/auth", loginAdmin);
router.put("/", updateAdmin);

export default router; // Export the router to use it in other files
