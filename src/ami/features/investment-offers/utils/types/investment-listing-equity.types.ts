export type PriceChange = {
	value: number;
	direction: "up" | "down";
};

type InvestmentListingEquity = {
	id: string;
	investment_offer: string;
	description: string;
	market_price: number;
	price_change: PriceChange;
	price_per_unit: number;
	total_units: number;
	available_units: number;
	units_bought: number;
	isArchived: boolean;
};

export type InvestmentListingEquityTableType = {
	[K in keyof InvestmentListingEquity]: string;
} & {
	action?: any;
};
