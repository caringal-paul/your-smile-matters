import { z } from "zod";
import { MetaData } from "@/core/types/base.types";

export const packageCreateSchema = z.object({
	name: z
		.string()
		.min(3, "Package name must be at least 3 characters")
		.max(100, "Package name cannot exceed 100 characters")
		.trim(),

	description: z
		.string()
		.max(500, "Description cannot exceed 500 characters")
		.trim()
		.optional(),

	price: z
		.number({
			required_error: "Package price is required",
			invalid_type_error: "Price must be a number",
		})
		.min(0.01, "Price must be greater than 0"),

	looks: z
		.number({
			required_error: "Number of looks is required",
			invalid_type_error: "Please input number of looks",
		})
		.min(1, "Must have at least 1 look")
		.max(10, "Cannot exceed 10 looks"),

	included_services: z
		.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid service ID format"))
		.nonempty("At least one service must be included"),

	is_available: z.boolean().optional(),
});

// For update operations, you might want a separate schema
export const packageUpdateSchema = packageCreateSchema.partial();

// Type inference for TS
export type PackageAmiCreate = z.infer<typeof packageCreateSchema>;
export type PackageAmiUpdate = z.infer<typeof packageUpdateSchema>;

export type PackageAmiSchema = z.infer<typeof packageCreateSchema> & MetaData;
