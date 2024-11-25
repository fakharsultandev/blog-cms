import bcrypt from "bcryptjs";
import Admin from "../models/Admin";
import { Request, Response } from "express";
import validateAdminSchema from "../validators/adminValidator";
import { generateToken } from "../services/token.service";
import { z } from "zod";

export async function loginAdmin(req: Request, res: Response) {
  try {
    validateAdminSchema.parseAsync(req.body);
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken({ id: user._id });
    return res
      .status(200)
      .json({ token })
      .cookie("token", token, {
        httpOnly: true,
        // secure: process.env.Node_ENV === "production",
        // sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateAdmin(req: Request, res: Response) {
  try {
    const { admin } = req;
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    validateAdminSchema.parseAsync(req.body);
    const { username, email, password } = req.body;
    const existedAdmin = await Admin.findById({ email: admin.email });
    if (!existedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (existedAdmin.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(
      existedAdmin._id,
      {
        username,
        email,
        password,
      },
      { new: true }
    );
    return res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }
  }
}

export async function registerAdmin(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const existedAdmin = await Admin.findOne({ email });
    if (existedAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }
  }
}

export default { loginAdmin, registerAdmin, updateAdmin };
