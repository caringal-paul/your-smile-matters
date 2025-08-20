import { z } from "zod/v4";

export const InvestmentDetailsCommoditySchema = z.object({
	isArchived: z.boolean(),
	investment_name: z.string().nonempty("Investment Name is required."),
	asset_class: z.string().nonempty("Asset Class is required."),
	description: z.string().nonempty("Description is required."),
	amount: z.string().nonempty("Amount is required."),
	portfolio_weight: z.string().nonempty("Portfolio Weight is required."),
	minimum_holding_period: z
		.string()
		.nonempty("Minimum Holding Period is required."),
	minimum_investable_amount: z
		.string()
		.nonempty("Minimum Investable Amount is required"),
});

export type InvestmentDetailsCommodity = z.infer<
	typeof InvestmentDetailsCommoditySchema
>;
