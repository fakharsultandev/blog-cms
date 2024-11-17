import { Request, Response } from "express";
import Category from "../models/Category";
import { validateObjectId } from "../validators/objectIdValidator";
import { z } from "zod";
import { validateCategory } from "../validators/categoryValidator";

export async function getAllCategories(req: Request, res: Response) {
  const categories = await Category.find({});
  res.status(200).json(categories);
}

export async function getCategoryById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await validateObjectId.parseAsync(id);
    const category = await Category.findById(id);
    return res.status(200).json(category);
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json(error.errors);

    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createCategory(req: Request, res: Response) {
  const categoryBody = req.body;
  try {
    await validateCategory.parseAsync(categoryBody);
    const category = await Category.create(categoryBody);
    return res.status(201).json(category);
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json(error.errors);

    return res.status(500).json({ error: "Internal Service Error" });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await validateObjectId.parseAsync(id);
    const deletedCategory = await Category.findByIdAndDelete(id);
    return res.status(200).json(deletedCategory);
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json(error.errors);

    return res.status(500).json({ error: "Internal Service Error" });
  }
}

export async function updateCategory(req: Request, res: Response) {
  const categoryBody = req.body;
  const id = req.params.id;
  try {
    await validateCategory.parseAsync(categoryBody);
    await validateObjectId.parseAsync(id);
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      categoryBody,
      { new: true }
    );
    return res.status(200).json(updatedCategory);
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json(error.errors);

    return res.status(500).json({ error: "Internal server error" });
  }
}
