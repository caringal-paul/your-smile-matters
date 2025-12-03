import { Gender, MetaData } from "@/core/types/base.types";

export type CustomerModel = MetaData & {
	email: string;
	customer_no: string;
	first_name: string;
	last_name: string;
	mobile_number: string;
	password: string;
	gender: Gender;
	address?: string;
	barangay?: string;
	city?: string;
	province?: string;
	postal_code?: string;
	country?: string;
	birth_date?: string;
	profile_image?: string;
};
