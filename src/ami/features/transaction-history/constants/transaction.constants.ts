import { TransactionAmiTableType } from "../utils/types/transaction-history-table.types";

export const TRANSACTION_TABLE_SEARCH_KEYS: (keyof TransactionAmiTableType)[] =
	["_id", "amount", "status"];
