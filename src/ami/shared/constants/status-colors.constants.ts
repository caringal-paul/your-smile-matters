import {
	AvailabilityStatus,
	BookingStatus,
	ForApprovalStatus,
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
	Assigned: "bg-[#3b82f6]",
	Cancelled: "bg-[#ef4444]",
	Completed: "bg-[#22c55e]",
	Confirmed: "bg-[#10b981]",
	Ongoing: "bg-[#f97316]",
	Rescheduled: "bg-[#a855f7]",
};
