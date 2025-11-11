import { MyBookingRequestsSfTableType } from "../utils/types/my-booking-requests-table.sf.types";
import { MyBookingsSfTableType } from "../utils/types/my-bookings-table.sf.types";

export const MY_BOOKING_REQUESTS_TABLE_SEARCH_KEYS: (keyof MyBookingRequestsSfTableType)[] =
	["_id", "booking_reference", "request_type", "reason", "status"];
