import { ServiceModel } from "@/core/models/service.model";

export type ServiceAmi = Pick<
	ServiceModel,
	"_id" | "category" | "name" | "description" | "is_available"
>;

export type ServiceAmiFilters = Partial<Record<keyof ServiceAmi, string[]>>;

export type ServiceAmiTableType = {
	[K in keyof ServiceAmi]: string;
} & {
	status?: string;
	action?: string;
};
