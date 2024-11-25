import jwt from "jsonwebtoken";
import { Admin } from "../validators/adminValidator";

const secretKey = process.env.JWT_SECRET_KEY as string; // Make sure you use the same secret key for decoding

export function generateToken(payload: any) {
  return jwt.sign(payload, secretKey);
}

// Function to decode the JWT token
export const verifyToken = (token: string): Admin | null => {
  try {
    const decoded = jwt.verify(token, secretKey!) as Admin;
    return decoded; // Return decoded admin data if the token is valid
  } catch (error) {
    return null; // Return null if the token is invalid or expired
  }
};

export function decodeToken(token: any) {
  return jwt.decode(token);
}
