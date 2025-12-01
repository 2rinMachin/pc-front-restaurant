import { z } from "zod";

export const USER_ROLES = [
  "client",
  "cook",
  "dispatcher",
  "driver",
  "admin",
] as const;

export const UserRole = z.literal(USER_ROLES);
export type UserRole = z.infer<typeof UserRole>;

export const User = z.object({
  tenant_id: z.string(),
  user_id: z.string(),
  email: z.string(),
  username: z.string(),
  role: UserRole,
});

export type User = z.infer<typeof User>;
