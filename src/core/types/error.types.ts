export type BaseAppError = {
	message: string;
	userMessage: string;
	status?: number;
	data?: any;
	code?: string;
};
