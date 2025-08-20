import { AssetClass } from "../types/asset-class.types";
import { FilterOptions } from "../types/filter.types";

export const ASSET_CLASSES_FILTER_OPTIONS: FilterOptions<{
	asset_class: AssetClass;
}> = {
	asset_class: ["Fixed Income", "Equity", "Commodity"],
};
