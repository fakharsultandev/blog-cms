import { Request, Response } from "express";
import Post from "../models/Post";

export async function getAllPost(req: Request, res: Response) {
  const posts = await Post.find({});
  res.status(200).json(posts);
}
