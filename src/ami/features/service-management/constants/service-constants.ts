import { FilterOptions } from "@/ami/shared/types/filter.types";
import { ServiceCategory } from "@/core/models/service.model";
import { ServiceAmiTableType } from "../utils/types/service-table.types";

export const SERVICE_MODULE_FILTER_OPTIONS: FilterOptions<{
	status: "Available" | "Unavailable";
	category: ServiceCategory[];
}> = {
	status: ["Available", "Unavailable"],
	category: ["Photography", "Beauty", "Equipment", "Styling", "Other"],
} as const;

export const SERVICE_TABLE_SEARCH_KEYS: (keyof ServiceAmiTableType)[] = [
	"_id",
	"name",
	"category",
	"description",
	"is_available",
];
