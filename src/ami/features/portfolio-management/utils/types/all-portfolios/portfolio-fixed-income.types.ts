import { FixedIncomeAndManagedPortfolioInvestmentStatus } from "@/ami/shared/types/status.types";

type FixedIncomeInvestment = {
	investment_offer: string;
	tenor: string;
	principal_amount: number;
	alt_bank_used: string;
	rollover_enabled: boolean;
	status: FixedIncomeAndManagedPortfolioInvestmentStatus;
	investment_date: string;
	reason_for_termination?: string;
};

export type FixedIncomeInvestmentTableType = {
	[K in keyof FixedIncomeInvestment]: string;
} & {
	action?: string;
};
