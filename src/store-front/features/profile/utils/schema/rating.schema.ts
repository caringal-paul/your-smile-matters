import { z } from "zod";

export const ratingSchema = z.object({
	booking_id: z
		.string({
			required_error: "Booking ID is required",
			invalid_type_error: "Booking ID must be a string",
		})
		.min(1, "Booking ID is required")
		.refine((val) => val.trim() !== "", {
			message: "Booking ID is required",
		}),

	ratable_type: z.enum(["Package", "Service", "Product"], {
		required_error: "Ratable type is required",
		invalid_type_error:
			"Ratable type must be one of: Package, Service, Product",
	}),

	ratable_id: z
		.string({
			required_error: "Ratable ID is required",
			invalid_type_error: "Ratable ID must be a string",
		})
		.min(1, "Ratable ID is required")
		.refine((val) => val.trim() !== "", {
			message: "Ratable ID is required",
		}),

	rating: z
		.number({
			required_error: "Rating is required",
			invalid_type_error: "Rating must be a number",
		})
		.int("Rating must be a whole number")
		.min(1, "Rating must be at least 1")
		.max(5, "Rating must not exceed 5"),

	comment: z
		.string({
			required_error: "Comment is required",
			invalid_type_error: "Comment must be a string",
		})
		.min(5, "Comment must be at least 5 characters")
		.max(500, "Comment must not exceed 500 characters")
		.optional(),
});

export type RatingSchema = z.infer<typeof ratingSchema>;

export const updateRatingSchema = z.object({
	rating: z
		.number({
			required_error: "Rating is required",
			invalid_type_error: "Rating must be a number",
		})
		.int("Rating must be a whole number")
		.min(1, "Rating must be at least 1")
		.max(5, "Rating must not exceed 5")
		.optional(),

	comment: z
		.string({
			required_error: "Comment is required",
			invalid_type_error: "Comment must be a string",
		})
		.min(5, "Comment must be at least 5 characters")
		.max(500, "Comment must not exceed 500 characters")
		.optional(),
});

export type UpdateRatingSchema = z.infer<typeof updateRatingSchema>;
