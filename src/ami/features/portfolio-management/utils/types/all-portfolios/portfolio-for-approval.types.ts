import { ForApprovalStatus } from "@/ami/shared/types/status.types";

type PortfolioForApproval = {
	date_requested: string;
	requested_by: string;
	customer_name: string;
	investment_name: string;
	change_request: "Terminate Request" | "Rollover Request";
	status: ForApprovalStatus;
};

export type PortfolioForApprovalTableType = {
	[K in keyof PortfolioForApproval]: string;
} & {
	action?: any;
};
