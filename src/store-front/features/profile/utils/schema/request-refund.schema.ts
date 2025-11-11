import { z } from "zod";

export const requestRefundSchema = z.object({
	refund_amount: z
		.number({
			required_error: "Refund amount is required",
			invalid_type_error: "Refund amount must be a number",
		})
		.positive("Please enter a valid refund amount"),

	refund_reason: z
		.string({
			required_error: "Refund reason is required",
			invalid_type_error: "Refund reason must be a string",
		})
		.min(5, "Reason must be at least 5 characters")
		.max(500, "Reason must not exceed 500 characters")
		.optional(),

	transaction_id: z
		.string()
		.min(1, "Transaction is required")
		.refine((val) => val.trim() !== "", {
			message: "Transaction is required",
		}),

	booking_id: z
		.string()
		.min(1, "Booking is required")
		.refine((val) => val.trim() !== "", {
			message: "Booking is required",
		}),
});

export type RequestRefundTransactionSchema = z.infer<
	typeof requestRefundSchema
>;
