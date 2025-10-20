import { BookingStatus } from "@/ami/shared/types/status.types";
import { BookingModel } from "@/core/models/booking.model";
import {
	PopulatedBookingService,
	PopulatedCustomer,
	PopulatedPackage,
	PopulatedPhotographer,
	PopulatedPromo,
	PopulatedTransaction,
} from "@/core/types/populated.types";

type BookingListItem = Pick<
	BookingModel,
	| "_id"
	| "booking_reference"
	| "booking_date"
	| "start_time"
	| "end_time"
	| "location"
	| "status"
	| "final_amount"
	| "photographer_id"
> & {
	photographer_name: string;
	amount_paid: number;
	remaining_balance: number;
	is_payment_complete: boolean;
	customer_name: string;
	services_summary: string;
};

export type GetAllBookingsResponseAmi = BookingListItem & {};

export type GetByIdBookingResponseAmi = {
	_id: string;
	booking_reference: string;
	customer_id: PopulatedCustomer;
	package_id?: PopulatedPackage | null;
	photographer_id?: PopulatedPhotographer | null;
	promo_id?: PopulatedPromo;
	services: PopulatedBookingService[];
	is_customized: boolean;
	customization_notes?: string | null;
	booking_date: Date;
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
	booking_confirmed_at?: Date | null;
	booking_completed_at?: Date | null;
	cancelled_reason?: string | null;
	rescheduled_from?: Date | null;
	photographer_notes?: string | null;
	client_rating?: number | null;
	photographer_rating?: number | null;
	is_active: boolean;
	created_by: string;
	updated_by?: string | null;
	deleted_by?: string | null;
	retrieved_by?: string | null;
	deleted_at?: Date | null;
	retrieved_at?: Date | null;
	created_at: Date;
	updated_at: Date;
	payment_status: {
		amount_paid: number;
		remaining_balance: number;
		is_partially_paid: boolean;
		is_payment_complete: boolean;
		transactions: PopulatedTransaction[];
	};
};
