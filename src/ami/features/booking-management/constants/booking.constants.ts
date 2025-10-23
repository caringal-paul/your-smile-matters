import { BookingAmiTableType } from "../utils/types/booking-table.ami.types";

export const BOOKING_TABLE_SEARCH_KEYS: (keyof BookingAmiTableType)[] = [
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
