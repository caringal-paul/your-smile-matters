import { z } from "zod";

export const approveTransactionRequestSchema = z.object({
	admin_notes: z.string().optional(),
});

export type ApproveTransactionRequestSchema = z.infer<
	typeof approveTransactionRequestSchema
>;
