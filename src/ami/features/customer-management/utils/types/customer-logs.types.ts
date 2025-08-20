type CustomerLog = {
	date: string;
	customer_id: string;
	customer_name: string;
	description_log: string;
};

export type CustomerLogTableType = {
	[K in keyof CustomerLog]: string;
} & {
	action?: string;
};
