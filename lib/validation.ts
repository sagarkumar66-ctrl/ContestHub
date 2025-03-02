import { z } from "zod"

export const signupSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

export const contestRegistrationSchema = z.object({
  contestId: z.string().uuid(),
  registrationId: z.string().regex(/^REG-\d{8}-[A-Z0-9]{6}$/),
})

export const contestJoinSchema = z.object({
  contestId: z.string().uuid(),
  registrationId: z.string().regex(/^REG-\d{8}-[A-Z0-9]{6}$/),
})

