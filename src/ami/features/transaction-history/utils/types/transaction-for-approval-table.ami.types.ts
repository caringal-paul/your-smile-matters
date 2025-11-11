import { TransactionRequestResponse } from "@/core/types/base-response.types";

export type TransactionForApprovalAmiTableType = {
	[K in keyof TransactionRequestResponse]: TransactionRequestResponse[K];
} & {
	action?: string;
	transaction_reference?: string;
	transaction: string;
};
