type PortfolioLogs = {
	date: string;
	description_log: string;
};

export type PortfolioLogsTableType = {
	[K in keyof PortfolioLogs]: string;
} & { action?: any };
