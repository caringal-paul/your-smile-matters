import { z } from "zod";
import { Gender } from "../types/customer-table.types";
import { MetaData } from "@/core/types/base.types";

// Regex (same as Mongoose)
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^[0-9]{10,15}$/;

export const GenderEnum: { [K in Gender]: K } = {
	Male: "Male",
	Female: "Female",
	Other: "Other",
} as const;

export const customerCreateSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.regex(emailRegex, "Invalid email format")
		.toLowerCase(), // Matches Mongoose lowercase: true

	first_name: z
		.string()
		.min(1, "First name must have at least 1 character")
		.max(25, "First name cannot exceed 25 characters")
		.trim(), // Matches Mongoose trim: true

	last_name: z
		.string()
		.min(1, "Last name must have at least 1 character")
		.max(25, "Last name cannot exceed 25 characters")
		.trim(), // Matches Mongoose trim: true

	mobile_number: z
		.string()
		.min(1, "Mobile number is required") // Add required validation
		.regex(phoneRegex, "Invalid mobile number format"),

	password: z.string().min(6, "Password must be at least 6 characters"), // You may want to make this required without min since Mongoose just requires it

	gender: z.enum([GenderEnum.Male, GenderEnum.Female, GenderEnum.Other], {
		message: "Gender must be: Male, Female, Other",
	}),

	// Optional address fields - matching Mongoose constraints
	address: z
		.string()
		.min(5, "Address must be at least 5 characters") // Add min length like Mongoose
		.max(100, "Address cannot exceed 100 characters")
		.trim()
		.nullable()
		.optional(),

	barangay: z.string().max(50).trim().nullable().optional(),

	city: z.string().max(50).trim().nullable().optional(),

	province: z.string().max(50).trim().nullable().optional(),

	postal_code: z.string().max(10).trim().nullable().optional(),

	country: z.string().max(50).trim().default("Philippines"),

	// Optional profile fields
	birth_date: z.date().nullable().optional(), // Mongoose allows null, so should Zod

	profile_image: z.string().nullable().optional(), // Remove URL validation since Mongoose doesn't have it

	// Status
	is_active: z.boolean().default(true),
});

// For update operations, you might want a separate schema
export const customerUpdateSchema = customerCreateSchema.partial();

// Type inference for TS
export type CustomerCreate = z.infer<typeof customerCreateSchema>;
export type CustomerUpdate = z.infer<typeof customerUpdateSchema>;

export type CustomerModel = z.infer<typeof customerCreateSchema> & MetaData;
