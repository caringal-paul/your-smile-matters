import { TransactionModel } from "@/core/models/transaction.model";
import {
	PopulatedBooking,
	PopulatedCustomer,
	PopulatedTransaction,
} from "@/core/types/populated.types";

type TransactionsResponseAmi = Pick<
	TransactionModel,
	| "_id"
	| "transaction_reference"
	| "amount"
	| "status"
	| "transaction_type"
	| "payment_method"
	| "payment_proof_images"
	| "external_reference"
	| "transaction_date"
	| "processed_at"
	| "failed_at"
	| "refunded_at"
	| "notes"
	| "failure_reason"
	| "refund_reason"
	| "is_active"
	| "created_at"
	| "updated_at"
	| "created_by"
	| "updated_by"
> & {
	booking_id: PopulatedBooking;
	customer_id: PopulatedCustomer;
	refund_transaction_id?: PopulatedTransaction | null;
	original_transaction_id?: PopulatedTransaction | null;
};

export type GetAllTransactionsResponseAmi = TransactionsResponseAmi & {};

export type GetByIdTransactionResponseAmi = TransactionsResponseAmi & {};

// WORKON ADD REMAINING API
