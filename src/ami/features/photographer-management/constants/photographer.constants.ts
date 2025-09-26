import { TabRoute } from "@/ami/shared/types/tab-routes.types";
import {
	CustomerAmiTableType,
	Gender,
} from "../utils/types/photographer-table.types";

import { FilterOptions } from "@/ami/shared/types/filter.types";

export const PHOTOGRAPHER_ROUTES: TabRoute[] = [
	{
		id: 1,
		path: "/admin/ami/photographer-management/photographers",
		value: "photographers",
		name: "Photographers",
	},
	{
		id: 2,
		path: "/admin/ami/photographer-management/photographers/for-approval",
		value: "for-approval",
		name: "For Approval",
	},
];

export const PHOTOGRAPHER_MODULE_FILTER_OPTIONS: FilterOptions<{
	activeStatus: ["Active", "Inactive"];
	gender: Gender[];
}> = {
	activeStatus: ["Active", "Inactive"],
	gender: ["Male", "Female", "Other"],
} as const;

export const PHOTOGRAPHER_TABLE_SEARCH_KEYS: (keyof CustomerAmiTableType)[] = [
	"id",
	"customer_no",
	"email",
	"last_name",
	"first_name",
	"total_spent",
	"mobile_number",
	"gender",
	"address",
	"isActive",
];
