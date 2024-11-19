import { Request, Response } from "express";
import Post from "../models/Post";
import { z } from "zod";
import { validateObjectId } from "../validators/objectIdValidator";
import { validatePost } from "../validators/postValidator";

export async function getAllPost(req: Request, res: Response) {
  const posts = await Post.find({}).populate("category").select("-__v");
  res.status(200).json(posts);
}

export async function getPostBySlug(req: Request, res: Response) {
  const slug = req.params.slug;
  const post = await Post.findOne({ slug }).populate("cateogry");
  if (!post) {
    res.status(404).json({ message: "Post not found" });
  } else {
    res.status(200).json(post);
  }
}

export async function getPostById(req: Request, res: Response) {
  const id = req.params.id;

  try {
    await validateObjectId.parseAsync(id);

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createPost(req: Request, res: Response) {
  const postBody = req.body;
  try {
    await validatePost.parseAsync(postBody); // Validate the post body
    const newPost = await Post.create(postBody);
    res.status(201).json(newPost);
  } catch (error) {
    if (error instanceof z.ZodError)
      return res.status(400).json({ error: error.errors });

    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deletePost(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await validateObjectId.parseAsync(id);
    const deletedPost = await Post.findByIdAndDelete(id);
    return res.status(200).json(deletedPost);
  } catch (error) {
    if (error instanceof z.ZodError)
      return res.status(400).json({ error: error.errors });

    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updatePost(req: Request, res: Response) {
  const postBody = req.body; // Get the updated post body
  const id = req.params.id;

  try {
    await validatePost.parseAsync(postBody); // Validate the post body
    await validateObjectId.parseAsync(id);
    const updatedPost = await Post.findByIdAndUpdate(id, postBody, {
      new: true,
    });
    return res.status(200).send(updatedPost);
  } catch (error) {
    if (error instanceof z.ZodError)
      return res.status(400).json({ error: error.errors });
    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updatePostField(req: Request, res: Response) {
  try {
    const postBody = req.body; // Get the updated post body
    const id = req.params.id;
    await validateObjectId.parseAsync(id);
    const updatedPost = await Post.updateOne(
      { _id: id },
      {
        $set: postBody,
      }
    );
    return res.status(200).send(updatedPost);
  } catch (error) {
    if (error instanceof z.ZodError)
      return res.status(400).json({ error: error.errors });
    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
