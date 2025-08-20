import { SupportsApprovalTableType } from "../utils/types/support-table.types";
import { TabRoute } from "@/ami/shared/types/tab-routes.types";

export const SUPPORT_TABLE_SEARCH_KEYS: (keyof SupportsApprovalTableType)[] = [
	"change_request",
	"date_requested",
	"requested_by",
	"status",
];

export const SUPPORT_ROUTES: TabRoute[] = [
	{
		id: 1,
		path: "/support-management/faq",
		value: "faq",
		name: "Frequently Asked Questions",
	},
	{
		id: 2,
		path: "/support-management/for-approval",
		value: "for-approval",
		name: "For Approval",
	},
];
