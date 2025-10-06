import { z } from "zod";

// Email regex same as in mongoose
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// Login request schema
export const amiLoginSchema = z.object({
	email: z
		.string()
		.regex(emailRegex, { message: "Invalid email format" })
		.trim()
		.toLowerCase(),

	password: z.string().min(1, "Password is required").trim(),
});

// Type inference
export type AuthAmiLogin = z.infer<typeof amiLoginSchema>;
