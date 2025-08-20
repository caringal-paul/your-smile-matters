import { ForApprovalStatus } from "@/ami/shared/types/status.types";

type RiskRatingQuestionnaireForApproval = {
	date_requested: string;
	requested_by: string;
	change_request: string;
	status: ForApprovalStatus;
};

export type RiskRatingQuestionnaireForApprovalTableType = {
	[K in keyof RiskRatingQuestionnaireForApproval]: string;
} & { action?: any };
