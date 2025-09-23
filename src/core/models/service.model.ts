import { MetaData } from "../types/base.types";

// [x]
export type ServiceCategory =
	| "Photography"
	| "Beauty"
	| "Styling"
	| "Equipment"
	| "Other";

export type ServiceModel = MetaData & {
	name: string;
	description?: string;
	category: string;
	is_available: boolean;
};
