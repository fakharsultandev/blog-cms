import mongoose from "mongoose";

interface ICategory extends mongoose.Document {
  title: string;
}

const categorySchema = new mongoose.Schema<ICategory>({
  title: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
