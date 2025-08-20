type InvestmentListingCommodity = {
	id: string;
	investment_offer: string;
	description: string;
	amount: string;
	portfolio_weight: string;
	minimum_holding_period: string;
	minimum_investable_amount: string;
	creation_date: string;
};

export type InvestmentListingCommodityTableType = {
	[K in keyof InvestmentListingCommodity]: string;
} & {
	action?: any;
};
