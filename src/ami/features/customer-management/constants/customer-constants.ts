import { TabRoute } from "@/ami/shared/types/tab-routes.types";
import { CustomerTableType } from "../utils/types/customer-table.types";
import { CustomerApprovalTableType } from "../utils/types/customer-approval-table.types";
import { CustomerLogTableType } from "../utils/types/customer-logs.types";

export const CUSTOMER_ROUTES: TabRoute[] = [
	{
		id: 1,
		path: "/customer-management/customers",
		value: "customers",
		name: "Customer List",
	},
	{
		id: 2,
		path: "/customer-management/customers/for-approval",
		value: "for-approval",
		name: "For Approval",
	},
];

export const CUSTOMER_TABLE_SEARCH_KEYS: (keyof CustomerTableType)[] = [
	"id",
	"email",
	"surname",
	"first_name",
	"portfolio_balance",
	"created_on",
	"status",
];

export const CUSTOMER_FOR_APPROVAL_TABLE_SEARCH_KEYS: (keyof CustomerApprovalTableType)[] =
	[
		"date_requested",
		"change_request",
		"requested_by",
		"customer_name",
		"status",
	];

export const CUSTOMER_LOGSL_TABLE_SEARCH_KEYS: (keyof CustomerLogTableType)[] =
	["customer_id", "customer_name", "date", "description_log"];
