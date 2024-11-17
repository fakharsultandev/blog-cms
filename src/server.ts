import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authMiddleware from "./middlewares/auth";
import cors from "cors";
import postRouter from "./routes/postRouter";
import categoryRouter from "./routes/categoryRouter";

// Apply auth middleware to all routes
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// app.use(authMiddleware);
app.use(cors());

// Add this line before connecting to MongoDB
mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Blog CMS API");
});

app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);

// Start server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
