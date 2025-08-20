import { TabRoute } from "@/ami/shared/types/tab-routes.types";
import { RiskRatingQuestionnaireForApprovalTableType } from "../utils/types/risk-rating-questionnaire-for-approval.types";
import { RiskRatingQuestionnaireTableType } from "../utils/types/risk-rating-questionnaire.types";

export const RISK_RATING_QUESTIONNAIRE_FOR_APPROVAL_TABLE_SEARCH_KEYS: (keyof RiskRatingQuestionnaireForApprovalTableType)[] =
	["date_requested", "change_request", "requested_by", "status"];

export const RISK_RATING_QUESTIONNAIRE_TABLE_SEARCH_KEYS: (keyof RiskRatingQuestionnaireTableType)[] =
	["id", "question", "answer", "submitted_by", "created_on"];

export const RISK_RATING_QUESTIONNAIRE_TAB_ROUTES: TabRoute[] = [
	{
		id: 1,
		path: "/risk-rating-management/questionnaires",
		value: "questionnaires",
		name: "Questions",
	},
	{
		id: 2,
		path: "/risk-rating-management/questionnaires/for-approval",
		value: "for-approval",
		name: "For Approval",
	},
];
