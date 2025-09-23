import { CustomerModel } from "@/core/models/customer.model";

export type CustomerAmi = Pick<
	CustomerModel,
	| "_id"
	| "customer_no"
	| "email"
	| "birth_date"
	| "first_name"
	| "last_name"
	| "mobile_number"
	| "is_active"
	| "gender"
	| "address"
	| "barangay"
	| "city"
	| "province"
	| "postal_code"
	| "country"
	| "profile_image"
>;

export type CustomerAmiFilters = Partial<Record<keyof CustomerAmi, string[]>>;

export type CustomerAmiTableType = {
	[K in keyof CustomerAmi]: CustomerAmi[K];
} & {
	status?: string;
	detailed_address?: string;
	total_spent?: string;
	action?: string;
};
