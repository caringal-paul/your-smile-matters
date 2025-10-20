import { FilterOptions } from "../types/filter.types";
import {
	AvailabilityStatus,
	BookingStatus,
	ForApprovalStatus,
	TransactionStatus,
} from "../types/status.types";

export const FOR_APPROVAL_STATUSES_FILTER_OPTIONS: FilterOptions<{
	status: ForApprovalStatus;
}> = {
	status: ["For Approval", "Approved", "Rejected"],
};

export const AVAILABILITY_STATUSES_FILTER_OPTIONS: FilterOptions<{
	status: AvailabilityStatus;
}> = {
	status: ["Active", "Inactive"],
};

export const BOOKING_STATUSES_FILTER_OPTIONS: FilterOptions<{
	status: BookingStatus[];
}> = {
	status: [
		"Pending",
		"Confirmed",
		"Ongoing",
		"Completed",
		"Cancelled",
		"Rescheduled",
	],
} as const;

export const TRANSACTION_STATUSES_FILTER_OPTIONS: FilterOptions<{
	status: TransactionStatus[];
}> = {
	status: ["Pending", "Completed", "Failed", "Refunded", "Cancelled"],
} as const;
