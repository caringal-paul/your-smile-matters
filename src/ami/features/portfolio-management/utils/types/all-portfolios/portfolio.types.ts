type Portfolio = {
	id: string;
	customer_id: string;
	surname: string;
	first_name: string;
	no_of_investments: number;
	fixed_income: number;
	equity: number;
	commodity: number;
	portfolio_balance: number;
	last_investment_date: string;
};

export type PortfolioTableType = {
	[K in keyof Portfolio]: string;
} & {
	action?: string;
};
