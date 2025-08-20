import { EquityAndCommodityInvestmentStatus } from "@/ami/shared/types/status.types";

export type InvestmentTransactions = {
	transaction_id: string;
	order_type: string;
	price_per_unit: number;
	total_price: number;
	status: EquityAndCommodityInvestmentStatus;
	no_of_units: number;
	date_of_transaction: string;
};
