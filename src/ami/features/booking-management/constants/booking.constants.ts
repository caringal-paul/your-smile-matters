import { TabRoute } from "@/ami/shared/types/tab-routes.types";
import { BookingAmiTableType } from "../utils/types/booking-table.ami.types";
import { BookingForApprovalAmiTableType } from "../utils/types/booking-for-approval-table.ami.types";

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

export const BOOKING_FOR_APPROVALTABLE_SEARCH_KEYS: (keyof BookingForApprovalAmiTableType)[] =
	["_id", "booking_reference", "request_type", "reason", "status"];

export const BOOKING_ROUTES: TabRoute[] = [
	{
		id: 1,
		path: "/admin/ami/booking-management/bookings",
		value: "bookings",
		name: "Bookings",
	},
	{
		id: 2,
		path: "/admin/ami/booking-management/bookings/for-approval",
		value: "for-approval",
		name: "For Approval",
	},
];
