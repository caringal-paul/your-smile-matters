import { z } from "zod";

export const durationSchema = z
	.number()
	.min(30, { message: "Minimum duration is 30 minutes" })
	.max(1440, { message: "Maximum duration is 1440 minutes (24 hours)" })
	.refine((val) => val % 30 === 0, {
		message: "Duration must be in 30-minute intervals",
	});
