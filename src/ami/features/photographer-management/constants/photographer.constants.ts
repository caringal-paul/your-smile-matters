import { TabRoute } from "@/ami/shared/types/tab-routes.types";

import { FilterOptions } from "@/ami/shared/types/filter.types";
import { PhotographerAmiTableType } from "../utils/types/photographer-table.types";

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
	status: ["Active", "Inactive"];
}> = {
	status: ["Active", "Inactive"],
} as const;

export const PHOTOGRAPHER_TABLE_SEARCH_KEYS: (keyof PhotographerAmiTableType)[] =
	["bio", "email", "is_active", "mobile_number", "name", "specialties"];
