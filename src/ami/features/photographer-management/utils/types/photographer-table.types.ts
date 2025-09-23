import { AvailabilityStatus } from "@/ami/shared/types/status.types";

export type Gender = "Male" | "Female" | "Other";

export type Customer = {
	id: number;
	customer_no: number;
	first_name: string;
	last_name: string;
	email: string;
	total_spent: number;
	mobile_number?: string;
	address?: string;
	gender: Gender;
	isActive: boolean;
	// created_on: string;
};

export type CustomerFilters = Partial<Record<keyof Customer, string[]>>;

export type CustomerAmiTableType = {
	[K in keyof Customer]: string;
} & {
	action?: string;
	status?: AvailabilityStatus;
};
