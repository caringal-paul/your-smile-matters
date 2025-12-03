import { z } from "zod";

// Email regex same as in mongoose
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const userCreateSchema = z.object({
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(30, "Username cannot exceed 30 characters")
		.trim(),

	email: z
		.string()
		.regex(emailRegex, { message: "Invalid email format" })
		.trim()
		.toLowerCase(),

	first_name: z
		.string()
		.min(1, "First name is required")
		.max(25, "First name cannot exceed 25 characters")
		.trim(),

	last_name: z
		.string()
		.min(1, "Last name is required")
		.max(25, "Last name cannot exceed 25 characters")
		.trim(),

	mobile_number: z.string().min(1, "Mobile number is required"), // mongoose only requires presence

	role_id: z
		.string()
		.min(1, "Role is required") // Ensures non-empty string
		.refine((val) => val.trim() !== "", {
			message: "Role is required",
		}), // no regex, backend handles ObjectId

	is_active: z.boolean(),
	profile_image: z
		.string()
		.url({ message: "Each images must be a valid URL" })
		.optional(),
});

// For update operations
export const userUpdateSchema = userCreateSchema.partial();

// Type inference
export type UserAmiCreate = z.infer<typeof userCreateSchema>;
export type UserAmiUpdate = z.infer<typeof userUpdateSchema>;
