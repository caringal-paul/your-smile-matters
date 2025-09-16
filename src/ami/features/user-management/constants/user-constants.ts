import { FilterOptions } from "@/ami/shared/types/filter.types";
import { UserAmiTableType } from "../utils/types/users-table.types";

// ? Options for your filter box. This will be rendered as checkboses.
// export const USERS_MODULE_FILTER_OPTIONS: FilterOptions<{ role: RoleNames }> = {
// 	role: ["Super Admin", "Admin", "Customer Experience", "Audit"],
// } as const;

export const USERS_MODULE_FILTER_OPTIONS: FilterOptions<{
	status: ["Active", "Inactive"];
}> = {
	status: ["Active", "Inactive"],
} as const;

// ?  Columns that the search text you type in the search box will search.
export const USER_TABLE_SEARCH_KEYS: (keyof UserAmiTableType)[] = [
	"full_name",
	"email",
	"status",
	"mobile_number",
	"username",
];
