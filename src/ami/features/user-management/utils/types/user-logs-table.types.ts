export type UserActivityLogs = {
	id: number;
	name: string;
	description_log: string;
	role: string;
	status: boolean;
	date: string;
};

export type UserLogsFilter = Partial<Record<keyof UserActivityLogs, string[]>>;

export type UserLogsTableType = {
	[K in keyof UserActivityLogs]: string;
};
