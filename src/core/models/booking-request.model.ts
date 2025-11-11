import { MetaData } from "../types/base.types";

export type BookingRequestType = "Cancellation" | "Reschedule";
export type BookingRequestStatus = "Pending" | "Approved" | "Rejected";

export type BookingRequestModel = MetaData & {
	request_reference: string;
	booking_id: string;
	customer_id: string;
	request_type: BookingRequestType;
	status: BookingRequestStatus;

	// For cancellation requests
	cancellation_reason?: string | null;

	// For reschedule requests
	new_booking_date?: Date | null;
	new_start_time?: string | null;
	new_end_time?: string | null;
	new_photographer_id?: string | null;
	reschedule_reason?: string | null;

	// Admin response
	reviewed_by?: string | null;
	reviewed_at?: Date | null;
	admin_notes?: string | null;
	rejection_reason?: string | null;
};
