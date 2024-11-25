import mongoose from "mongoose";
import { Post } from "../validators/postValidator";

const postSchema = new mongoose.Schema<Post>(
  {
    title: { type: String, required: true },
    sanitizedHTML: { type: String, required: true },
    tags: { type: [String], required: true },
    readTime: { type: Number, required: true },
    published: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    accessedBy: { type: String, required: true },
    markdown: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

const Post = mongoose.model<Post>("Post", postSchema);

export default Post;
