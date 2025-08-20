import { ForApprovalStatus } from "@/ami/shared/types/status.types";

type CustomerApproval = {
	date_requested: string;
	requested_by: string;
	customer_name: string;
	change_request: string;
	status: ForApprovalStatus;
};

export type CustomerApprovalFilters = Partial<
	Record<keyof CustomerApproval, string[]>
>;

export type CustomerApprovalTableType = {
	[K in keyof CustomerApproval]: string;
} & {
	action?: string;
};
