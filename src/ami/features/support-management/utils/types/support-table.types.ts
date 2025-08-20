import { ForApprovalStatus } from "@/ami/shared/types/status.types";

export type FAQ = {
	id: number;
	question: string;
	answer: string;
	created_on: string;
	created_by: string;
};

export type SupportApproval = {
	id: number;
	change_request: string;
	requested_by: string;
	date_requested: string;
	status: ForApprovalStatus;
};

export type FAQTableType = {
	[K in keyof FAQ]: string;
} & {
	action?: string;
};

export type SupportsApprovalTableType = {
	[K in keyof SupportApproval]: string;
} & {
	action?: string;
};
