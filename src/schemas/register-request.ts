import z from "zod";
import { UserRole } from "./user";

export const RegisterRequest = z.object({
  email: z.email(),
  username: z.string().min(3),
  password: z.string().min(4),
  role: UserRole,
});

export type RegisterRequest = z.infer<typeof RegisterRequest>;
