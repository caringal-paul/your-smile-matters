type InvestmentListingFixedIncome = {
	id: string;
	is_archived: boolean;
	investment_offer: string;
	asset_class: string;
	description: string;
	return_of_investment: string;
	return_of_investment_frequency: string;
	investment_tenor: string;
	min_investment_amount: string;
	max_investment_amount: string;
	created_on: string;
};

export type InvestmentListingFixedIncomeTableType = {
	[K in keyof InvestmentListingFixedIncome]: string;
} & {
	action?: any;
};
