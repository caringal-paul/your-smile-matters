import { TransactionStatus } from "@/ami/shared/types/status.types";
import { MetaData } from "../types/base.types";
import { PaymentMethod } from "@/store-front/store/useBookingFormStore";

export type TransactionType = "Payment" | "Refund" | "Partial" | "Balance";

export type TransactionModel = MetaData & {
	transaction_reference: string;
	booking_id: string;
	customer_id: string;

	amount: number;
	transaction_type: TransactionType;
	payment_method: PaymentMethod;
	status: TransactionStatus;

	payment_proof_images: string[];
	external_reference?: string | null;

	transaction_date: string; // ISO date string for frontend use
	processed_at?: string | null;
	failed_at?: string | null;
	refunded_at?: string | null;

	notes?: string | null;
	failure_reason?: string | null;
	refund_reason?: string | null;

	refund_transaction_id?: string | null;
	original_transaction_id?: string | null;
};
