import { ForApprovalStatus } from "@/ami/shared/types/status.types";

type InvestmentListingForApproval = {
	date_requested: string;
	requested_by: string;
	investment_offer: string;
	asset_class: string;
	status: ForApprovalStatus;
	change_request: string;
};

export type InvestmentListingForApprovalTableType = {
	[K in keyof InvestmentListingForApproval]: string;
} & { action?: any };
