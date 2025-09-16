import { AvailabilityStatus } from "@/ami/shared/types/status.types";

export type Gender = "Male" | "Female" | "Other";

export type CustomerTableFields = {
	id: number;
	customer_no: number;
	first_name: string;
	last_name: string;
	email: string;
	total_spent: number;
	mobile_number?: string;
	address?: string;
	gender: Gender;
	is_active: boolean;
	// created_on: string;
};

export type CustomerFilters = Partial<
	Record<keyof CustomerTableFields, string[]>
>;

export type CustomerTableType = {
	[K in keyof CustomerTableFields]: string;
} & {
	action?: string;
	status?: AvailabilityStatus;
};
