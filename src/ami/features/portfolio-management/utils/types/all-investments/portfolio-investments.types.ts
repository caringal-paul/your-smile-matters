import { AssetClass } from "@/ami/shared/types/asset-class.types";

type PortfolioInvestments = {
	id: string;
	investment_offer: string;
	asset_class: AssetClass;
	return_of_investment: string;
	tenor: string;
	no_of_customers: number;
	total_investment_amount: string;
};

export type PortfolioInvestmentsTableType = {
	[K in keyof PortfolioInvestments]: string;
} & {
	action?: any;
};
