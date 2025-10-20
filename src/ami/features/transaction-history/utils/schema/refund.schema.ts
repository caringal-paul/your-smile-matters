import { z } from "zod";

export const refundSchema = z.object({
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
		.min(3, "Refund reason must be at least 3 characters long")
		.max(1000, "Refund reason must not exceed 200 characters"),

	notes: z
		.string()
		.max(1000, "Notes must not exceed 500 characters")
		.optional(),

	payment_proof_images: z.array(
		z.string().url({ message: "Each images must be a valid URL" })
	),
});

export type RefundTransactionSchema = z.infer<typeof refundSchema>;
