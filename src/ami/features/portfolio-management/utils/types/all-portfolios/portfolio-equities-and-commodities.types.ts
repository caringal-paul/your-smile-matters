type PortfolioEquitiesAndCommodities = {
	id: number;
	investment_offer: string;
	total_owned_units: number;
	no_of_pending_buy: number;
	no_of_pending_sell: number;
};

export type PortfolioEquitiesAndCommoditiesTableType = {
	[K in keyof PortfolioEquitiesAndCommodities]: string;
} & {
	action?: any;
};
