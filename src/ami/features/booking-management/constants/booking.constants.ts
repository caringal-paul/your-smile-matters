import { MyBookingsSfTableType } from "@/store-front/features/profile/utils/types/my-bookings-table.sf.types";

export const BOOKING_TABLE_SEARCH_KEYS: (keyof MyBookingsSfTableType)[] = [
	"_id",
	"booking_date",
	"booking_reference",
	"customer_name",
	"end_time",
	"location",
	"photographer_name",
	"photographer_id",
	"start_time",
	"status",
	"booking_duration",
];
