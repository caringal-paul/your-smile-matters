import { z } from "zod";

export const cancelSchema = z.object({
	cancelled_reason: z
		.string()
		.max(200, "Cancellation reason cannot exceed 200 characters")
		.optional(),
});

export type CancelBookingSchema = z.infer<typeof cancelSchema>;
