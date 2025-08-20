import { AssetClass } from "@/ami/shared/types/asset-class.types";

type PortfolioPendingTrade = {
	transaction_no: string;
	customer_name: string;
	investment_name: string;
	asset_class: AssetClass;
	transaction_date: string;
	aging: string;
	price_type: string;
	amount_per_unit: number;
	quantity: number;
	total_price: number;
};

export type PortfolioPendingTradeTableType = {
	[K in keyof PortfolioPendingTrade]: string;
} & {
	action?: any;
};
