import { GetAllTransactionsResponseAmi } from "./transaction-response.ami.types";

export type TransactionAmiTableType = {
	[K in keyof GetAllTransactionsResponseAmi]: GetAllTransactionsResponseAmi[K];
} & {
	action?: string;
	booking_reference?: string;
	customer_no?: string;
	customer_name?: string;
	customer_email?: string;
	customer_contact?: string;
	booking_total_price?: string;
	booking_id_string?: string;
};
