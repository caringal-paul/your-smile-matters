export type Customer = {
	id: number;
	first_name: string;
	surname: string;
	email: string;
	portfolio_balance: number;
	created_on: string; // ISO 8601 format date string
	mobile_number?: string;
	status: boolean;
};

export type CustomerFilters = Partial<Record<keyof Customer, string[]>>;

export type CustomerTableType = {
	[K in keyof Customer]: string;
} & {
	action?: string;
};
