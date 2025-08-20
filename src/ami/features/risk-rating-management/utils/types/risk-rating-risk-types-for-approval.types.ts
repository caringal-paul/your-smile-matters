import { ForApprovalStatus } from "@/ami/shared/types/status.types";

type RiskRatingRiskTypesForApproval = {
	date_requested: string;
	requested_by: string;
	change_request: string;
	status: ForApprovalStatus;
};

export type RiskRatingRiskTypesForApprovalTableType = {
	[K in keyof RiskRatingRiskTypesForApproval]: string;
} & { action?: any };
