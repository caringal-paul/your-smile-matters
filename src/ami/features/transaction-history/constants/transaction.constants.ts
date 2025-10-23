import { FilterOptions } from "@/ami/shared/types/filter.types";
import { TransactionAmiTableType } from "../utils/types/transaction-history-table.types";
import { TransactionStatus } from "@/ami/shared/types/status.types";
import { TransactionType } from "@/core/models/transaction.model";

export const TRANSACTION_TABLE_SEARCH_KEYS: (keyof TransactionAmiTableType)[] =
	[
		"_id",
		"amount",
		"status",
		"booking_reference",
		"customer_name",
		"customer_email",
		"customer_no",
		"payment_method",
		"transaction_reference",
		"transaction_type",
		"booking_total_price",
		"transaction_date",
	];

export const TRANSACTION_TABLE_AMI_FILTER_OPTIONS: FilterOptions<{
	status: TransactionStatus[];
	transaction_type: TransactionType[];
	payment_method: string[];
}> = {
	status: ["Pending", "Completed", "Failed", "Refunded", "Cancelled"],
	transaction_type: ["Payment", "Refund", "Partial", "Balance"],
	payment_method: ["Gcash", "Cash"],
} as const;
