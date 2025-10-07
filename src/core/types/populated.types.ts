import { Gender } from "./base.types";

export type PopulatedCustomer = {
	_id: string;
	first_name: string;
	last_name: string;
	email: string;
	mobile_number?: string;
	profile_image?: string | null;
	gender: Gender;
};

export type PopulatedPackage = {
	_id: string;
	name: string;
	package_price: number;
	description?: string;
	is_available: boolean;
};

export type PopulatedPhotographer = {
	_id: string;
	name: string;
	email: string;
	specialties?: string;
	bio?: string;
	profile_image?: string | null;
	mobile_number?: string | null;
};

export type PopulatedPromo = {
	_id: string;
	promo_code: string;
	discount_type: string;
	discount_value: number;
};

export type PopulatedService = {
	_id: string;
	name: string;
	category: string;
	price: number;
	duration_minutes?: number;
};

export type PopulatedBookingService = {
	service_id: PopulatedService;
	quantity: number;
	price_per_unit: number;
	total_price: number;
	duration_minutes?: number | null;
	_id: string;
};

// Transaction populated export type
export type PopulatedTransaction = {
	_id: string;
	transaction_reference: string;
	amount: number;
	transaction_type: string;
	payment_method: string;
	status: string;
	transaction_date: Date;
	payment_proof_images: string[];
	external_reference?: string | null;
	notes?: string | null;
};
