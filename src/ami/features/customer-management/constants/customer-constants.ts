import { CustomerAmiTableType } from "../utils/types/customer-table.types";
import { FilterOptions } from "@/ami/shared/types/filter.types";
import { TabRoute } from "@/ami/shared/types/tab-routes.types";
import { Gender } from "@/core/types/base.types";

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
	status: ["Active", "Inactive"];
	gender: Gender[];
}> = {
	status: ["Active", "Inactive"],
	gender: ["Male", "Female", "Other"],
} as const;

export const CUSTOMER_TABLE_SEARCH_KEYS: (keyof CustomerAmiTableType)[] = [
	"_id",
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
