import { z } from "zod";

export const requestCancelSchema = z.object({
	cancellation_reason: z
		.string()
		.min(5, "Cancellation reason must be at least 5 characters long")
		.max(500, "Cancellation reason cannot exceed 500 characters long")
		.optional(),
});

export type RequestCancelBookingSchema = z.infer<typeof requestCancelSchema>;
