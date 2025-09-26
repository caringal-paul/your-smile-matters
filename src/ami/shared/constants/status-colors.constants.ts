import { AvailabilityStatus, ForApprovalStatus } from "../types/status.types";

export const AVAILABILITY_STATUS_COLORS: Record<AvailabilityStatus, string> = {
	Active: "bg-[#22c55e]",
	Inactive: "bg-[#ef4444]",
};

export const FOR_APPROVAL_STATUS_COLORS: Record<ForApprovalStatus, string> = {
	"For Approval": "bg-[#B89B45]",
	Approved: "bg-[#43B621]",
	Rejected: "bg-[#CD2028]",
};
