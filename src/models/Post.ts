import mongoose from "mongoose";

export interface IPost extends mongoose.Document {
  title: string;
  content: string;
  tags: string[];
  readTime: number;
  isPublished: boolean;
  description: string;
  slug: string;
  access: "user" | "guest";
  category: mongoose.Schema.Types.ObjectId;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], required: true },
    readTime: { type: Number, required: true },
    isPublished: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    access: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
