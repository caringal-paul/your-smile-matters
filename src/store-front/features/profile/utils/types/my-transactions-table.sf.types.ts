import { TransactionResponse } from "@/core/types/base-response.types";

export type MyTransactionsSfTableType = {
	[K in keyof TransactionResponse]: TransactionResponse[K];
} & {
	action?: string;
	booking_reference: string;
	booking_status: string;
};
