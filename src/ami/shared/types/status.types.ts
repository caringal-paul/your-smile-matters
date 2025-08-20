export type ForApprovalStatus = "For Approval" | "Approved" | "Rejected";

export type AvailabilityStatus = "Active" | "Inactive";

export type FixedIncomeAndManagedPortfolioInvestmentStatus =
	| "Invested"
	| "Invested Rollover"
	| "Settled"
	| "Terminated";

export type EquityAndCommodityInvestmentStatus =
	| "Pending Sell (PL)"
	| "Pending Sell (MP)"
	| "Pending Buy (PL)"
	| "Pending Buy (MP)"
	| "Bought"
	| "Sold";

export type TransactionStatus =
	| "Invested"
	| "Invested Rollover"
	| "Settled"
	| "Terminated"
	| "Bought"
	| "Sold";
