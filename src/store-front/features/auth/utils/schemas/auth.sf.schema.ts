import { z } from "zod";

// Regex patterns
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const customerLoginSchema = z.object({
	email: z
		.string()
		.nonempty("Email is required")
		.regex(emailRegex, { message: "Invalid email format" })
		.trim(),

	password: z.string().nonempty("Password is required"),

	agreedToTerms: z.boolean().refine((val) => val === true, {
		message: "You must agree to the terms and conditions",
	}),
});

export type CustomerSfLogin = z.infer<typeof customerLoginSchema>;
