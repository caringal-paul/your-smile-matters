import { CustomerModel } from "@/core/models/customer.model";

export type CustomerAuthResponse = {
	_id: string;
	customer_no?: string;
	email: string;
	first_name: string;
	last_name: string;
	mobile_number: string;
	gender: string;
	is_active?: boolean;
	created_at?: Date;
	updated_at?: Date;
};

export type CustomerLoginResponse = {
	customer: CustomerModel;
	access_token: string;
	refresh_token: string;
	expires_in: string;
};
