import { z } from "zod/v4";

export const InvestmentDetailsFixedIncomeSchema = z.object({
	isArchived: z.boolean(),
	investment_name: z.string().nonempty("Investment Name is required."),
	asset_class: z.string().nonempty("Asset Class is required."),
	description: z.string().nonempty("Description is required."),
	return_of_investment: z.string().nonempty("Amount is required."),
	return_of_investment_frequency: z
		.string()
		.nonempty("Portfolio Weight is required."),
	min_investment_amount: z
		.string()
		.nonempty("Minimum Holding Period is required."),
	max_investment_amount: z
		.string()
		.nonempty("Minimum Investable Amount is required"),
	investment_tenor: z
		.string()
		.nonempty("Minimum Investable Amount is required"),
});

export type InvestmentDetailsFixedIncome = z.infer<
	typeof InvestmentDetailsFixedIncomeSchema
>;
