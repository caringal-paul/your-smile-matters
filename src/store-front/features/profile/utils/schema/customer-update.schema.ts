import { z } from "zod";

// ==================== ENUMS ====================

export const GenderEnum = {
	Male: "Male",
	Female: "Female",
	Other: "Other",
} as const;

export type Gender = (typeof GenderEnum)[keyof typeof GenderEnum];

// ==================== REGEX PATTERNS ====================

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^[0-9]{10,15}$/;
const customerNoRegex = /^CUST-\d{8}-\d{4}$/;
const imageUrlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;

// ==================== BASE SCHEMA ====================

const customerBaseSchema = z.object({
	customer_no: z
		.string()
		.regex(customerNoRegex, {
			message: "Invalid format. Expected: CUST-YYYYMMDD-XXXX",
		})
		.optional(),

	email: z
		.string({
			required_error: "Email is required",
		})
		.regex(emailRegex, { message: "Invalid email format" })
		.trim()
		.toLowerCase(),

	first_name: z
		.string({
			required_error: "First name is required",
		})
		.min(1, "First name must have at least 1 character")
		.max(25, "First name cannot exceed 25 characters")
		.trim(),

	last_name: z
		.string({
			required_error: "Last name is required",
		})
		.min(1, "Last name must have at least 1 character")
		.max(25, "Last name cannot exceed 25 characters")
		.trim(),

	mobile_number: z
		.string({
			required_error: "Mobile number is required",
		})
		.regex(phoneRegex, { message: "Invalid mobile number format" })
		.trim(),

	password: z
		.string({
			required_error: "Password is required",
		})
		.min(6, "Password must be at least 6 characters long"),

	gender: z.enum([GenderEnum.Male, GenderEnum.Female, GenderEnum.Other], {
		errorMap: () => ({
			message: "Invalid gender. Must be Male, Female, or Other",
		}),
	}),

	// Address fields
	address: z
		.string()
		.min(5, "Address must be at least 5 characters")
		.max(100, "Address cannot exceed 100 characters")
		.trim()
		.optional(),

	barangay: z
		.string()
		.max(50, "Barangay cannot exceed 50 characters")
		.trim()
		.optional(),

	city: z
		.string()
		.max(50, "City cannot exceed 50 characters")
		.trim()
		.optional(),

	province: z
		.string()
		.max(50, "Province cannot exceed 50 characters")
		.trim()
		.optional(),

	postal_code: z
		.string()
		.max(10, "Postal code cannot exceed 10 characters")
		.trim()
		.optional(),

	country: z
		.string()
		.max(50, "Country cannot exceed 50 characters")
		.trim()
		.default("Philippines"),

	birth_date: z.coerce.date().nullable().optional(),

	profile_image: z.string().optional(),

	is_active: z.boolean().default(true).optional(),
});

// ==================== MAIN SCHEMAS ====================

export const customerUpdateSchema = customerBaseSchema.partial();

// ==================== TYPES ====================

export type CustomerSfUpdate = z.infer<typeof customerUpdateSchema>;
