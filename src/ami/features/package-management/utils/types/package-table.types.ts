import { PackageModel } from "@/core/models/package.model";
import { ServiceModel } from "@/core/models/service.model";

export type PackageAmi = Pick<
	PackageModel,
	| "_id"
	| "looks"
	| "price"
	| "included_services"
	| "name"
	| "description"
	| "is_available"
>;

export type PackageAmiFilters = Partial<Record<keyof PackageAmi, string[]>>;

export type PackageAmiTableType = {
	[K in keyof PackageAmi]: PackageAmi[K];
} & {
	status?: string;
	action?: string;
	servicesData?: ServiceModel[];
};
