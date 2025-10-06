import { FilterOptions } from "@/ami/shared/types/filter.types";
import { PackageAmiTableType } from "../utils/types/package-table.types";

export const PACKAGE_MODULE_FILTER_OPTIONS: FilterOptions<{
	status: "Available" | "Unavailable";
}> = {
	status: ["Available", "Unavailable"],
} as const;

export const PACKAGE_TABLE_SEARCH_KEYS: (keyof PackageAmiTableType)[] = [
	"_id",
	"name",
	"status",
	"services",
	"looks",
	"package_price",
	"description",
	"is_available",
];
