import { BookingStatus } from "@/ami/shared/types/status.types";
import { MetaData } from "@/core/types/base.types";

export type BookingService = {
	service_id: string;
	quantity: number;
	price_per_unit: number;
	total_price: number;
	duration_minutes?: number | null;
};

export type BookingModel = MetaData & {
	booking_reference: string;
	customer_id: string;
	package_id?: string | null;
	photographer_id?: string | null;
	promo_id?: string | null;

	services: BookingService[];

	is_customized: boolean;
	customization_notes?: string | null;

	booking_date: string;
	start_time: string;
	end_time: string;
	session_duration_minutes: number;
	location: string;
	theme?: string | null;
	special_requests?: string | null;
	status: BookingStatus;

	total_amount: number;
	discount_amount: number;
	final_amount: number;

	booking_confirmed_at?: string | null;
	photographer_assigned_at?: string | null;
	booking_completed_at?: string | null;
	cancelled_reason?: string | null;
	rescheduled_from?: string | null;

	photographer_notes?: string | null;
	client_rating?: number | null;
	photographer_rating?: number | null;

	// Virtuals / computed from backend
	amount_paid?: number;
	is_payment_complete?: boolean;
};
