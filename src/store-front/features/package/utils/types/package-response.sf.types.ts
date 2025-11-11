import { PackageModel } from "@/core/models/package.model";

import { PopulatedService } from "@/core/types/populated.types";

type PackageResponse = Pick<
	PackageModel,
	| "_id"
	| "name"
	| "description"
	| "image"
	| "package_price"
	| "looks"
	| "custom_duration_minutes"
	| "total_duration_minutes"
	| "is_available"
	| "is_active"
	| "created_at"
	| "updated_at"
> & {
	services: Array<{
		_id?: string;
		service_id: string;
		quantity: number;
		price_per_unit: number;
		total_price: number;
		duration_minutes: number;
		service_details: PopulatedService;
	}>;
};

export type GetAllPackageResponseSf = PackageResponse & {};

export type GetByIdPackageResponseSf = PackageResponse & {};
