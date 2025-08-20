import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const userCreateSchema = z
	.object({
		username: z.string().min(3).max(30),
		email: z.string().regex(emailRegex, { message: "Invalid email format" }),
		firstName: z.string().min(1).max(25),
		lastName: z.string().min(1).max(25),
		mobileNumber: z.string(),
		isActive: z.boolean(),
		roleId: z.string(),
		createdAt: z.string().optional(),
		updatedAt: z.string().optional(),
		lastLogin: z.string().optional(),
	})
	.strict();

export type UserCreate = z.infer<typeof userCreateSchema>;
