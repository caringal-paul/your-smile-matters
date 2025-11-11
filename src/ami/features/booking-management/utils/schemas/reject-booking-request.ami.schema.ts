import z from "zod";

export const rejectBookingRequestSchema = z.object({
	rejection_reason: z.string().min(1, "Rejection reason is required"),
	admin_notes: z.string().optional(),
});

export type RejectBookingRequestSchema = z.infer<
	typeof rejectBookingRequestSchema
>;
