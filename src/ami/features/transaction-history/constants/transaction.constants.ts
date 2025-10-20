import { TransactionAmiTableType } from "../utils/types/transaction-history-table.types";

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
