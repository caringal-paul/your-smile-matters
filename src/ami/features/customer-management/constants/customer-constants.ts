import { TabRoute } from "@/ami/shared/types/tab-routes.types";
import { CustomerTableType, Gender } from "../utils/types/customer-table.types";
import { CustomerApprovalTableType } from "../utils/types/customer-approval-table.types";
import { CustomerLogTableType } from "../utils/types/customer-logs.types";
import { FilterOptions } from "@/ami/shared/types/filter.types";

export const CUSTOMER_ROUTES: TabRoute[] = [
	{
		id: 1,
		path: "/admin/ami/customer-management/customers",
		value: "customers",
		name: "Customer List",
	},
	{
		id: 2,
		path: "/admin/ami/customer-management/customers/activity-log",
		value: "activity-log",
		name: "Activity Log",
	},
];

export const CUSTOMER_MODULE_FILTER_OPTIONS: FilterOptions<{
	activeStatus: ["Active", "Inactive"];
	gender: Gender[];
}> = {
	activeStatus: ["Active", "Inactive"],
	gender: ["Male", "Female", "Other"],
} as const;

export const CUSTOMER_TABLE_SEARCH_KEYS: (keyof CustomerTableType)[] = [
	"id",
	"customer_no",
	"email",
	"last_name",
	"first_name",
	"total_spent",
	"mobile_number",
	"gender",
	"address",
	"is_active",
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
