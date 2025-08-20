import { AssetClass } from "@/ami/shared/types/asset-class.types";
import { TransactionStatus } from "@/ami/shared/types/status.types";

export type TransactionHistory = {
	id: number;
	reference_no: string;
	customer_name: string;
	investment_offer: string;
	asset_class: AssetClass;
	alt_bank_used: string;
	principal_amount: string;
	status: TransactionStatus;
	transaction_date: string;
};

export type TransactionHistoryTableType = {
	[K in keyof TransactionHistory]: string;
} & {
	action?: string;
};
