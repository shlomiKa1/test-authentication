import z from "zod";

export const UserSignup = z.object({
  username: z.string().trim().min(2).max(100),
  email: z.email(),
  password: z.string().trim().min(6).max(100),
});

export const UserLogin = z.object({
  email: z.email(),
  password: z.string().trim().min(6).max(100),
});
