import { z } from "zod/v4";

export const InvestmentDetailsEquitySchema = z.object({
	isArchived: z.boolean(),
	description: z.string().nonempty("Description is required."),
});

export type InvestmentDetailsEquity = z.infer<
	typeof InvestmentDetailsEquitySchema
>;
