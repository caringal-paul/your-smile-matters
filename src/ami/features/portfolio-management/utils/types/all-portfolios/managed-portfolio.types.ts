import { FixedIncomeAndManagedPortfolioInvestmentStatus } from "@/ami/shared/types/status.types";

type InvestmentRiskType = "Low Risk" | "Moderate Risk" | "High Risk";

type CustomerManagedPortfolio = {
	plan_name: string;
	investment_risk_type: InvestmentRiskType;
	investment_duration: string;
	investment_amount: number;
	target_date: string;
	rollover_enabled: boolean;
	status: FixedIncomeAndManagedPortfolioInvestmentStatus;
	funded_date: string;
};

export type CustomerManagedPortfolioTableType = {
	[K in keyof CustomerManagedPortfolio]: string;
} & {
	action?: string;
};
