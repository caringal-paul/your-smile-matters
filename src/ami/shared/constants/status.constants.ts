import { FilterOptions } from "../types/filter.types";
import { AvailabilityStatus, ForApprovalStatus } from "../types/status.types";

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
