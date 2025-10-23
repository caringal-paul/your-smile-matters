import { TransactionType } from "@/core/models/transaction.model";
import { FilterOptions } from "../types/filter.types";

export const TRANSACTION_TYPES_FILTER_OPTIONS: FilterOptions<{
	transaction_types: TransactionType[];
}> = {
	transaction_types: ["Payment", "Refund", "Partial", "Balance"],
} as const;
