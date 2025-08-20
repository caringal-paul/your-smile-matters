type TopOffersInvestments = {
	order?: number;
	id: string;
	investment_offer: string;
};

export type TopOffersInvestmentsTableType = {
	[K in keyof TopOffersInvestments]: string;
} & {
	action?: string;
};
