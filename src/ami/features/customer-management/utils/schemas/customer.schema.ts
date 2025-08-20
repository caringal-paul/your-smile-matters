import { z } from "zod/v4";

export const CustomerSchema = z.object({
	mobile_number: z.string().nonempty("Mobile Number is required."),
	status: z.boolean(),
});

export type Customer = z.infer<typeof CustomerSchema>;
