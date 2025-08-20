import { TabRoute } from "@/ami/shared/types/tab-routes.types";
import { RiskRatingRiskTypesForApprovalTableType } from "../utils/types/risk-rating-risk-types-for-approval.types";

export const RISK_RATING_RISK_TYPES_FOR_APPROVAL_TABLE_SEARCH_KEYS: (keyof RiskRatingRiskTypesForApprovalTableType)[] =
	["date_requested", "change_request", "requested_by", "status"];

export const RISK_RATING_RISK_TYPES_TAB_ROUTES: TabRoute[] = [
	{
		id: 1,
		path: "/risk-rating-management/risk-types",
		value: "risk-types",
		name: "Risk Types",
	},
	{
		id: 2,
		path: "/risk-rating-management/risk-types/for-approval",
		value: "for-approval",
		name: "For Approval",
	},
];
