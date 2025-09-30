import { MetaData } from "../types/base.types";

export type ServiceCategory =
	| "Photography"
	| "Beauty"
	| "Styling"
	| "Equipment"
	| "Other";

// export type ServiceModel = MetaData & {
// 	name: string;
// 	description?: string;
// 	category: string;
// 	is_available: boolean;
// };

export type ServiceModel = MetaData & {
	_id: string;
	name: string;
	description?: string | null;
	category: ServiceCategory;
	price: number;
	old_price?: number;
	duration_minutes?: number | null;
	is_available: boolean;
	service_gallery: string[];
};
