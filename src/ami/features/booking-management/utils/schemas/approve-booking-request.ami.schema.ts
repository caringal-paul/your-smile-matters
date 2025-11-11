import { z } from "zod";

export const approveBookingRequestSchema = z.object({
	admin_notes: z.string().optional(),
});

export type ApproveBookingRequestSchema = z.infer<
	typeof approveBookingRequestSchema
>;
