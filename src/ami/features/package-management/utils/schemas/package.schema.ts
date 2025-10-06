import { z } from "zod";

// Schema for included service matching Mongoose IncludedService structure
const includedServiceSchema = z.object({
	service_id: z
		.string()
		.regex(/^[0-9a-fA-F]{24}$/, "Invalid service ID format"),

	quantity: z
		.number()
		.min(1, "Quantity must be at least 1")
		.int("Quantity must be a whole number"),

	price_per_unit: z.number().min(0, "Price per unit cannot be negative"),

	total_price: z.number().min(0, "Total price cannot be negative"),

	duration_minutes: z.number().min(0, "Duration cannot be negative").optional(),
});

const basePackageSchema = z.object({
	name: z
		.string()
		.min(2, "Package name must be at least 2 characters")
		.max(100, "Package name cannot exceed 100 characters")
		.trim(),

	description: z
		.string()
		.max(500, "Description cannot exceed 500 characters")
		.trim()
		.optional(),

	image: z.string().optional(),

	package_price: z
		.number({
			required_error: "Package price is required",
			invalid_type_error: "Price must be a number",
		})
		.min(0, "Price cannot be negative"),

	services: z
		.array(includedServiceSchema)
		.min(1, "Package must include at least one service"),

	looks: z
		.number({
			required_error: "Number of looks is required",
			invalid_type_error: "Please input number of looks",
		})
		.min(1, "Must have at least 1 look")
		.max(10, "Cannot exceed 10 looks"),

	is_available: z.boolean(),

	custom_duration_minutes: z
		.number()
		.min(0, "Duration cannot be negative")
		.optional(),
});

// Create schema
export const packageCreateSchema = basePackageSchema;

// For update operations
export const packageUpdateSchema = basePackageSchema.partial();

// Type inference
export type PackageAmiCreate = z.infer<typeof packageCreateSchema>;
export type PackageAmiUpdate = z.infer<typeof packageUpdateSchema>;
