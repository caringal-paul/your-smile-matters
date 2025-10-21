import { z } from "zod";

/**
 * Time regex: matches "H:MM", "HH:MM" in 24-hour format (00:00 - 23:59)
 */
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

/**
 * Body schema (for req.body)
 * - new_booking_date: required, must parse to a Date and be in the future
 * - new_start_time: required, must match HH:MM
 * - new_end_time: optional, if present must match HH:MM
 */
export const rescheduleSchema = z.object({
	new_booking_date: z
		.date()
		.refine(
			(val) => {
				// Normalize both dates to midnight (remove time part)
				const selectedDate = new Date(val);
				selectedDate.setHours(0, 0, 0, 0);

				const today = new Date();
				today.setHours(0, 0, 0, 0);

				return selectedDate.getTime() >= today.getTime();
			},
			{ message: "New booking date must be today or in the future" }
		)
		.optional(),

	dummy_time: z.string().optional(), // to bypass issue with optional date in form

	new_start_time: z.string().refine((s) => timeRegex.test(s), {
		message: "Invalid start time format (HH:MM)",
	}),

	new_end_time: z
		.string()
		.refine((s) => (s === undefined ? true : timeRegex.test(s)), {
			message: "Invalid end time format (HH:MM)",
		}),

	photographer_id: z.string(),
});

/**
 * Types
 */
export type RescheduleBookingSchema = z.infer<typeof rescheduleSchema>;
