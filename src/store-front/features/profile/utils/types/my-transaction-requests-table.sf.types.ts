import { TransactionRequestResponse } from "@/core/types/base-response.types";

export type MyTransactionRequestsSfTableType = {
	[K in keyof TransactionRequestResponse]: TransactionRequestResponse[K];
} & {
	action?: string;
	transaction_reference?: string;
	transaction: string;
};
