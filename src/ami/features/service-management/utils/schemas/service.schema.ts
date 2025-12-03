import { z } from "zod";
import { ServiceCategory } from "@/core/models/service.model";

export const ServiceCategoryEnum: { [K in ServiceCategory]: K } = {
	Photography: "Photography",
	Beauty: "Beauty",
	Equipment: "Equipment",
	Styling: "Styling",
	Other: "Other",
} as const;

const baseServiceSchema = z.object({
	name: z
		.string()
		.min(2, "Service name must be at least 2 characters")
		.max(50, "Service name cannot exceed 50 characters")
		.trim(),

	description: z
		.string()
		.max(200, "Description cannot exceed 200 characters")
		.trim()
		.optional(),

	category: z
		.enum(
			Object.values(ServiceCategoryEnum) as [
				ServiceCategory,
				...ServiceCategory[]
			],
			{ message: "Category is required" }
		)
		.optional(),

	price: z.number().min(0, "Price cannot be negative"),

	old_price: z.number().optional(),

	duration_minutes: z
		.number()
		.min(30, "Duration must be at least 30 minutes")
		.max(24 * 60, "Duration cannot exceed 24 hours")
		.optional(),

	is_available: z.boolean(),

	service_gallery: z
		.array(z.string().url({ message: "Each images must be a valid URL" }))
		.min(1, "Service gallery must have at least 1 image")
		.max(4, "Service gallery must have at most 4 images"),
});

// Create schema with refine for validation
export const serviceCreateSchema = baseServiceSchema.refine(
	(data) => {
		if (data.old_price && data.old_price > 0) {
			return data.price < data.old_price;
		}
		return true;
	},
	{
		message:
			"New price must be lower than the old price when applying a discount",
		path: ["price"],
	}
);

// For update operations - use .partial() on the base schema, then apply refine
export const serviceUpdateSchema = baseServiceSchema.partial().refine(
	(data) => {
		if (data.old_price && data.old_price > 0 && data.price !== undefined) {
			return data.price < data.old_price;
		}
		return true;
	},
	{
		message: "Price must be lower than the old price when applying a discount",
		path: ["price"],
	}
);

// Type inference
export type ServiceAmiCreate = z.infer<typeof serviceCreateSchema>;
export type ServiceAmiUpdate = z.infer<typeof serviceUpdateSchema>;
