import { z } from "zod";
import { MetaData } from "@/core/types/base.types";

// Regex (same as Mongoose)
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^[0-9]{10,15}$/;

export const customerCreateSchema = z.object({
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
		.regex(phoneRegex, { message: "Invalid mobile number format" }),

	password: z.string().min(1, "Password is required"), // Mongoose only requires it, no min length

	gender: z.enum(["Male", "Female", "Other"], {
		errorMap: () => ({ message: "Gender must be: Male, Female, Other" }),
	}),

	// Hybrid address fields
	address: z
		.string()
		.min(5, "Address must be at least 5 characters")
		.max(100, "Address cannot exceed 100 characters")
		.trim()
		.optional(),

	barangay: z.string().max(50).trim().optional(),
	city: z.string().max(50).trim().optional(),
	province: z.string().max(50).trim().optional(),
	postal_code: z.string().max(10).trim().optional(),
	country: z.string().max(50).trim().default("Philippines"),

	// Profile fields
	birth_date: z.string().optional(),
	profile_image: z.string().optional(),

	// Status
	is_active: z.boolean(),

	// Metadata (optional fields)
	created_at: z.string().optional(),
	updated_at: z.string().optional(),
	deleted_at: z.string().optional(),
	retrieved_at: z.string().optional(),

	// Audit fields
	created_by: z.string().optional(),
	updated_by: z.string().optional(),
	deleted_by: z.string().optional(),
	retrieved_by: z.string().optional(),
});

// For update operations
export const customerUpdateSchema = customerCreateSchema.partial();

// Type inference for TS
export type CustomerAmiCreate = z.infer<typeof customerCreateSchema>;
export type CustomerAmiUpdate = z.infer<typeof customerUpdateSchema>;

export type CustomerAmiSchema = z.infer<typeof customerCreateSchema> & MetaData;
