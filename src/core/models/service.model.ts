import { MetaData } from "../types/base.types";

export type ServiceCategory =
	| "Photography"
	| "Beauty"
	| "Styling"
	| "Equipment"
	| "Other";

export type ServiceModel = MetaData & {
	name: string;
	description?: string;
	category: ServiceCategory;
	price: number;
	old_price?: number;
	duration_minutes?: number;
	is_available: boolean;
	service_gallery: string[];
};
