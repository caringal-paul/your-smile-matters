import { z } from "zod";
import { MetaData } from "@/core/types/base.types";
import { ServiceCategory } from "@/core/models/service.model";

export const ServiceCategoryEnum: { [K in ServiceCategory]: K } = {
	Photography: "Photography",
	Beauty: "Beauty",
	Equipment: "Equipment",
	Styling: "Styling",
	Other: "Other",
} as const;

export const serviceCreateSchema = z.object({
	name: z
		.string()
		.min(2, "Service name is required")
		.max(50, "Service name cannot exceed 50 characters"),

	description: z
		.string()
		.max(200, "Description cannot exceed 25 characters")
		.trim()
		.optional(),

	category: z.enum(
		[
			ServiceCategoryEnum.Photography,
			ServiceCategoryEnum.Beauty,
			ServiceCategoryEnum.Equipment,
			ServiceCategoryEnum.Styling,
			ServiceCategoryEnum.Other,
		],
		{
			message:
				"Category must be: Photography, Beauty, Equipment, Styling, Other",
		}
	),

	is_available: z.boolean().default(true),
});

// For update operations, you might want a separate schema
export const serviceUpdateSchema = serviceCreateSchema.partial();

// Type inference for TS
export type ServiceAmiCreate = z.infer<typeof serviceCreateSchema>;
export type ServiceAmiUpdate = z.infer<typeof serviceUpdateSchema>;

export type ServiceAmiSchema = z.infer<typeof serviceCreateSchema> & MetaData;
