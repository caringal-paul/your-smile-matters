import {
	AvailabilityStatus,
	EquityAndCommodityInvestmentStatus,
	FixedIncomeAndManagedPortfolioInvestmentStatus,
	ForApprovalStatus,
	TransactionStatus,
} from "../types/status.types";

export const TRANSACTION_STATUS_COLORS: Record<TransactionStatus, string> = {
	Invested: "bg-[#1EE2F0]",
	"Invested Rollover": "bg-[#1EE2F0]",
	Settled: "bg-[#B89B45]",
	Terminated: "bg-[#FF6500]",
	Bought: "bg-[#43B621]",
	Sold: "bg-[#CD2028]",
};

export const AVAILABILITY_STATUS_COLORS: Record<AvailabilityStatus, string> = {
	Active: "bg-[#22c55e]",
	Inactive: "bg-[#ef4444]",
};

export const FOR_APPROVAL_STATUS_COLORS: Record<ForApprovalStatus, string> = {
	"For Approval": "bg-[#B89B45]",
	Approved: "bg-[#43B621]",
	Rejected: "bg-[#CD2028]",
};

export const EQUITY_AND_COMMODITY_STATUS_COLORS: Record<
	EquityAndCommodityInvestmentStatus,
	string
> = {
	Bought: "bg-[#43B621]",
	Sold: "bg-[#CD2028]",
	"Pending Sell (PL)": "bg-[#444242]",
	"Pending Sell (MP)": "bg-[#444242]",
	"Pending Buy (MP)": "bg-[#444242]",
	"Pending Buy (PL)": "bg-[#444242]",
};

export const FIXED_INCOME_AND_MANAGED_PORTFOLIO_STATUS_COLORS: Record<
	FixedIncomeAndManagedPortfolioInvestmentStatus,
	string
> = {
	Invested: "bg-[#1EE2F0]",
	"Invested Rollover": "bg-[#1EE2F0]",
	Settled: "bg-[#B89B45]",
	Terminated: "bg-[#FF6500]",
};
