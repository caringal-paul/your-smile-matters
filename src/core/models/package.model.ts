import { MetaData } from "../types/base.types";

export type IncludedService = {
	service_id: string;
	quantity: number;
	price_per_unit: number;
	total_price: number;
	duration_minutes?: number;
};

export type PackageModel = MetaData & {
	name: string;
	description?: string;
	image?: string;
	package_price: number;
	services: IncludedService[];
	looks: number;
	total_duration_minutes?: number;
	is_available: boolean;
	custom_duration_minutes?: number;
};
