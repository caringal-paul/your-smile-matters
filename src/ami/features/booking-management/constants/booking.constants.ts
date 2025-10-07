import { BookingStatus } from "@/ami/shared/types/status.types";
import { BookingAmiTableType } from "../utils/types/booking-table.types";
import { FilterOptions } from "@/ami/shared/types/filter.types";

export const BOOKING_TABLE_SEARCH_KEYS: (keyof BookingAmiTableType)[] = [
	"_id",
	"amount_paid",
	"booking_date",
	"booking_reference",
	"customer_name",
	"end_time",
	"final_amount",
	"location",
	"photographer_name",
	"photographer_id",
	"remaining_balance",
	"services_summary",
	"start_time",
	"status",
	"booking_duration",
];
