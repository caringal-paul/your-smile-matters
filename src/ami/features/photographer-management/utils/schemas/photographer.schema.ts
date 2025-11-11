import { z } from "zod";
import { ServiceCategoryEnum } from "@/ami/features/service-management/utils/schemas/service.schema";

// ==================== ENUMS ====================

export const DayOfWeekEnum = {
	Sunday: "Sunday",
	Monday: "Monday",
	Tuesday: "Tuesday",
	Wednesday: "Wednesday",
	Thursday: "Thursday",
	Friday: "Friday",
	Saturday: "Saturday",
} as const;

export type DayOfWeek = (typeof DayOfWeekEnum)[keyof typeof DayOfWeekEnum];

// ==================== REGEX PATTERNS ====================

const timeRegex = /^(([0-1]?[0-9]|2[0-3]):[0-5][0-9]|24:00)$/;
const imageUrlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// ==================== SUB-SCHEMAS ====================

// Weekly schedule item schema
const weeklyScheduleItemSchema = z
	.object({
		day_of_week: z.enum([
			DayOfWeekEnum.Sunday,
			DayOfWeekEnum.Monday,
			DayOfWeekEnum.Tuesday,
			DayOfWeekEnum.Wednesday,
			DayOfWeekEnum.Thursday,
			DayOfWeekEnum.Friday,
			DayOfWeekEnum.Saturday,
		]),
		start_time: z
			.string()
			.regex(timeRegex, "Invalid time format (use HH:MM or 24:00)"),
		end_time: z
			.string()
			.regex(timeRegex, "Invalid time format (use HH:MM or 24:00)"),
		is_available: z.boolean(),
		notes: z.string().optional(),
	})
	.refine(
		(data) => {
			// ✅ 24:00 is always valid as end time
			if (data.end_time === "24:00") return true;

			const [sh, sm] = data.start_time.split(":").map(Number);
			const [eh, em] = data.end_time.split(":").map(Number);
			return eh * 60 + em > sh * 60 + sm;
		},
		{
			message: "End time must be later than start time",
			path: ["end_time"],
		}
	);

// Date override schema
const dateOverrideSchema = z.object({
	date: z.date(),
	is_available: z.boolean(),
	custom_hours: z
		.object({
			start_time: z
				.string()
				.regex(timeRegex, "Invalid time format (use HH:MM)"),
			end_time: z.string().regex(timeRegex, "Invalid time format (use HH:MM)"),
		})
		.optional(),
	reason: z.string().optional(),
	notes: z.string().optional(),
});

// ==================== BASE SCHEMA ====================

const photographerBaseSchema = z.object({
	name: z.string().min(1, "Photographer name is required").trim(),

	email: z
		.string()
		.regex(emailRegex, { message: "Invalid email format" })
		.trim()
		.toLowerCase(),

	mobile_number: z.string().trim().optional(),

	bio: z.string().max(1000, "Bio cannot exceed 1000 characters").optional(),

	profile_image: z.string().optional(),

	specialties: z
		.array(
			z.enum([
				ServiceCategoryEnum.Photography,
				ServiceCategoryEnum.Beauty,
				ServiceCategoryEnum.Equipment,
				ServiceCategoryEnum.Styling,
				ServiceCategoryEnum.Other,
			])
		)
		.min(1, "Photographer must have at least one specialty")
		.max(5, "Cannot have more than 5 specialties"),

	photo_gallery: z
		.array(z.string())
		// .regex(imageUrlRegex, "Invalid image URL format"))
		.max(9, "Photo gallery cannot have more than 9 images")
		.optional(),

	weekly_schedule: z.array(weeklyScheduleItemSchema).optional(),

	date_overrides: z.array(dateOverrideSchema).optional(),

	booking_lead_time_hours: z
		.number({
			required_error: "Booking lead time is required",
			invalid_type_error: "Booking lead time must be a valid number",
		})
		.int()
		.optional(),

	is_active: z.boolean().optional(),
});

// ==================== MAIN SCHEMAS ====================

export const photographerCreateSchema = photographerBaseSchema;

export const photographerUpdateSchema = photographerBaseSchema.partial();

// ==================== TYPES ====================

export type PhotographerAmiCreate = z.infer<typeof photographerCreateSchema>;
export type PhotographerAmiUpdate = z.infer<typeof photographerUpdateSchema>;
