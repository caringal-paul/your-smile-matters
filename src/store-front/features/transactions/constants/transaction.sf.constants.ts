import { MyTransactionsSfTableType } from "../../profile/utils/types/my-transactions-table.sf.types";

export const TRANSACTION_TABLE_SEARCH_KEYS: (keyof MyTransactionsSfTableType)[] =
	[
		"_id",
		"amount",
		"status",
		"booking_id",
		"created_at",
		"external_reference",
		"transaction_type",
		"payment_method",
		"transaction_date",
		"transaction_reference",
		"refund_reason",
		"failure_reason",
		"failed_at",
		"transaction_date",
	];
