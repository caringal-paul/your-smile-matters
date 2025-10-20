import { BookingModel } from "@/core/models/booking.model";
import { CustomerModel } from "@/core/models/customer.model";
import { PackageModel } from "@/core/models/package.model";
import { PhotographerModel } from "@/core/models/photographer.model";
import { ServiceModel } from "@/core/models/service.model";
import { TransactionModel } from "@/core/models/transaction.model";
import { PopulatedPromo } from "@/core/types/populated.types";
import { BookingFormService } from "@/store-front/store/useBookingFormStore";

export type BookingSfCreate = {
	// Step 1: Services & Customization
	services: BookingFormService[];
	is_customized: boolean;
	customization_notes?: string | null;
	customer_id?: string;
	package_id?: string | null;

	// Step 2: Date, Time & Location
	booking_date: Date;
	start_time: string;
	end_time: string;
	session_duration_minutes: number;
	location: string;

	// Step 3: Photographer & Details
	photographer_id: string;
	photographer_name?: string | null;
	theme?: string | null;
	special_requests?: string | null;

	// Step 4: Payment & Pricing
	old_amount?: number;
	total_amount: number;
	discount_amount: number;
	promo_id?: string | null;
	final_amount: number;

	// Metadata
	is_booking_sent: boolean;
	status: "Pending";
	booking_reference: string;
};

export type GetAvailablePhotographersByTimeRangeResponseSf = PhotographerModel &
	{
		completed_bookings: number;
		total_bookings: number;
	}[];

export type BookingResponseSf = Pick<
	BookingModel,
	| "_id"
	| "booking_reference"
	| "is_customized"
	| "customization_notes"
	| "booking_date"
	| "start_time"
	| "end_time"
	| "session_duration_minutes"
	| "location"
	| "theme"
	| "special_requests"
	| "status"
	| "total_amount"
	| "discount_amount"
	| "final_amount"
	| "booking_confirmed_at"
	| "photographer_assigned_at"
	| "booking_completed_at"
	| "cancelled_reason"
	| "rescheduled_from"
	| "photographer_notes"
	| "client_rating"
	| "photographer_rating"
	| "is_active"
	| "created_by"
	| "updated_by"
	| "deleted_by"
	| "retrieved_by"
	| "deleted_at"
	| "retrieved_at"
	| "created_at"
	| "updated_at"
> & {
	customer_id: CustomerModel;
	package_id?: PackageModel | null;
	photographer_id: PhotographerModel;
	promo_id?: PopulatedPromo | null;
	services: {
		duration_minutes: number;
		price_per_unit: number;
		quantity: string;
		total_price: number;
		_id: string;
		service_id: ServiceModel;
	}[];
	payment_status: {
		amount_paid: number;
		remaining_balance: number;
		is_partially_paid: boolean;
		is_payment_complete: boolean;
		transactions: TransactionModel[];
	};
};
