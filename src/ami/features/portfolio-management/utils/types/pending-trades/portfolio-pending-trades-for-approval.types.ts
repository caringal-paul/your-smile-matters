import { ForApprovalStatus } from "@/ami/shared/types/status.types";

type PortfolioPendingTradeForApproval = {
	date_requested: string;
	requested_by: string;
	customer_name: string;
	investment_name: string;
	change_request: string;
	status: ForApprovalStatus;
};

export type PortfolioPendingTradeForApprovalTableType = {
	[K in keyof PortfolioPendingTradeForApproval]: string;
} & {
	action?: any;
};
