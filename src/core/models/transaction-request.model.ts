import { MetaData } from "../types/base.types";

export type TransactionRequestType = "Refund";
export type TransactionRequestStatus = "Pending" | "Approved" | "Rejected";

export type TransactionRequestModel = MetaData & {
	request_reference: string;
	transaction_id: string;
	booking_id: string;
	customer_id: string;

	request_type: TransactionRequestType;
	status: TransactionRequestStatus;

	refund_amount: number;
	refund_reason: string;
	reviewed_by?: string | null;
	reviewed_at?: Date | null;
	admin_notes?: string | null;
	rejection_reason?: string | null;
};
