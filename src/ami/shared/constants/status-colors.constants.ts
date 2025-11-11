import {
	AvailabilityStatus,
	BookingStatus,
	ForApprovalStatus,
	RequestStatus,
	TransactionStatus,
} from "../types/status.types";

export const AVAILABILITY_STATUS_COLORS: Record<AvailabilityStatus, string> = {
	Active: "bg-[#22c55e]",
	Inactive: "bg-[#ef4444]",
};

export const FOR_APPROVAL_STATUS_COLORS: Record<ForApprovalStatus, string> = {
	"For Approval": "bg-[#B89B45]",
	Approved: "bg-[#43B621]",
	Rejected: "bg-[#CD2028]",
};

export const BOOKING_STATUS_COLORS: Record<BookingStatus, string> = {
	Pending: "bg-[#facc15]",
	Cancelled: "bg-[#ef4444]",
	Completed: "bg-[#22c55e]",
	Confirmed: "bg-[#60a5fa]",
	Ongoing: "bg-[#f97316]",
	Waiting: "bg-[#f97316]",
	Rescheduled: "bg-[#a855f7]",
};

export const TRANSACTION_STATUS_COLORS: Record<TransactionStatus, string> = {
	Pending: "bg-[#facc15]",
	Completed: "bg-[#22c55e]",
	Failed: "bg-[#ef4444]",
	Refunded: "bg-[#3b82f6]",
	Cancelled: "bg-[#9ca3af]",
};

export const REQUEST_STATUS_COLORS: Record<RequestStatus, string> = {
	Pending: "bg-[#facc15]",
	Approved: "bg-[#22c55e]",
	Rejected: "bg-[#ef4444]",
};
