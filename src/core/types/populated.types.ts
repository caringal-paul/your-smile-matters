import { Gender } from "./base.types";

export type PopulatedCustomer = {
	_id: string;
	customer_no: string;
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
	image?: string | null;
};

export type PopulatedPhotographer = {
	_id: string;
	name: string;
	email: string;
	mobile_number?: string | null;
	bio?: string;
	profile_image?: string | null;
	specialties?: string;
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
	description?: string;
	category: string;
	price: number;
	old_price?: number;
	duration_minutes?: number;
	is_available: boolean;
	service_gallery: string[];
	is_active: boolean;
	created_at?: Date;
	updated_at?: Date;
};

export type PopulatedBookingService = {
	_id: string;
	service_id: PopulatedService;
	quantity: number;
	price_per_unit: number;
	total_price: number;
	duration_minutes?: number | null;
};

export type PopulatedBooking = {
	_id: string;
	booking_reference: string;
	final_amount: number;
	customer_id: PopulatedCustomer;
	package_id?: PopulatedPackage;
	photographer_id?: PopulatedPhotographer;
	promo_id?: unknown;
	status: string;
	booking_date: Date;
	location?: string;
	services?: { service_id: PopulatedService }[];
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
