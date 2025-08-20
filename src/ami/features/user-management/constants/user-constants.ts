import { FilterOptions } from "@/ami/shared/types/filter.types";
import { UserTableType } from "../utils/types/users-table.types";

// ? Options for your filter box. This will be rendered as checkboses.
// export const USERS_MODULE_FILTER_OPTIONS: FilterOptions<{ role: RoleNames }> = {
// 	role: ["Super Admin", "Admin", "Customer Experience", "Audit"],
// } as const;

export const USERS_MODULE_FILTER_OPTIONS: FilterOptions<{
	activeStatus: ["Active", "Inactive"];
}> = {
	activeStatus: ["Active", "Inactive"],
} as const;

// ?  Columns that the search text you type in the search box will search.
export const USER_TABLE_SEARCH_KEYS: (keyof UserTableType)[] = [
	"fullName",
	"email",
	"isActive",
	"mobileNumber",
	"username",
];
