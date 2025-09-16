import { z } from "zod";
import { MetaData } from "@/core/types/base.types";

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
		.trim(),

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

	mobile_number: z
		.string()
		.min(7, "Mobile number must have at least 7 digits")
		.max(15, "Mobile number cannot exceed 15 digits"),

	password: z.string().min(6, "Password must be at least 6 characters"), // same as Mongoose required

	role_id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid role ID format"),

	is_active: z.boolean(),

	// Metadata (optional fields)
	created_at: z.string().optional(),
	updated_at: z.string().optional(),
	deleted_at: z.string().optional(),
	retrieved_at: z.string().optional(),

	// Optional hidden fields
	reset_password_token: z.string().optional(),
	reset_password_expires: z.string().optional(),
});

// For update operations
export const userUpdateSchema = userCreateSchema.partial();

// Type inference for TS
export type UserAmiCreate = z.infer<typeof userCreateSchema>;
export type UserAmiUpdate = z.infer<typeof userUpdateSchema>;

export type UserAmiSchema = z.infer<typeof userCreateSchema> & MetaData;
