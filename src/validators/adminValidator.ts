import { z } from "zod";

const validateAdminSchema = z.object({
  _id: z.string().uuid().optional(),
  username: z.string().min(3).max(20),
  email: z.string().email().optional(),
  password: z.string().min(8).max(50),
});

export type Admin = z.infer<typeof validateAdminSchema>;

export default validateAdminSchema;
