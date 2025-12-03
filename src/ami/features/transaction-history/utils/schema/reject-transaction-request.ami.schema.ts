import z from "zod";

export const rejectTransactionRequestSchema = z.object({
	rejection_reason: z.string().min(1, "Rejection reason is required"),
	admin_notes: z.string().optional(),
});

export type RejectTransactionRequestSchema = z.infer<
	typeof rejectTransactionRequestSchema
>;
