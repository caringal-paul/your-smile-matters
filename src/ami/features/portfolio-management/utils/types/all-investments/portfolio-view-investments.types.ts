import { FixedIncomeAndManagedPortfolioInvestmentStatus } from "@/ami/shared/types/status.types";

export type ViewInvestments = {
	customer_id: string;
	first_name: string;
	surname: string;
	tenor: string;
	principal_amount: string;
	status: FixedIncomeAndManagedPortfolioInvestmentStatus;
	investment_date: string;
};
