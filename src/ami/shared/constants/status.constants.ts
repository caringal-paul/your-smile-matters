import { FilterOptions } from "../types/filter.types";
import {
	AvailabilityStatus,
	EquityAndCommodityInvestmentStatus,
	FixedIncomeAndManagedPortfolioInvestmentStatus,
	ForApprovalStatus,
	TransactionStatus,
} from "../types/status.types";

export const FOR_APPROVAL_STATUSES_FILTER_OPTIONS: FilterOptions<{
	status: ForApprovalStatus;
}> = {
	status: ["For Approval", "Approved", "Rejected"],
};

export const AVAILABILITY_STATUSES_FILTER_OPTIONS: FilterOptions<{
	status: AvailabilityStatus;
}> = {
	status: ["Active", "Inactive"],
};

export const FIXED_INCOME_AND_MANAGED_PORTFOLIO_STATUSES_FILTER_OPTIONS: FilterOptions<{
	status: FixedIncomeAndManagedPortfolioInvestmentStatus;
}> = {
	status: ["Invested", "Invested Rollover", "Settled", "Terminated"],
};

export const EQUITY_AND_COMMODITY_STATUSES_FILTER_OPTIONS: FilterOptions<{
	status: EquityAndCommodityInvestmentStatus;
}> = {
	status: [
		"Pending Sell (PL)",
		"Pending Sell (MP)",
		"Pending Buy (PL)",
		"Pending Buy (MP)",
		"Bought",
		"Sold",
	],
};

export const TRANSACTION_STATUSES_FILTER_OPTIONS: FilterOptions<{
	status: TransactionStatus;
}> = {
	status: [
		"Bought",
		"Sold",
		"Invested",
		"Invested Rollover",
		"Settled",
		"Terminated",
	],
};
