import { Request, Response, NextFunction } from "express";
import { Admin } from "../validators/adminValidator";
import {  verifyToken } from "../services/token.service";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header("X-API-Key");

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

declare global {
  namespace Express {
    interface Request {
      admin?: Admin; // Extend the Request type to include the `admin` field
    }
  }
}

// Admin authentication middleware
export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token; // Access token from cookies

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const admin = verifyToken(token); // Decode the token to get the admin info

  if (!admin) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.admin = admin; // Attach the admin info to the request object

  next(); // Proceed to the next middleware or route handler
};

export default authMiddleware;
