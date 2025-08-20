import { TabRoute } from "@/ami/shared/types/tab-routes.types";
import { PortfolioTableType } from "../utils/types/all-portfolios/portfolio.types";
import { FixedIncomeInvestmentTableType } from "../utils/types/all-portfolios/portfolio-fixed-income.types";
import { PortfolioEquitiesAndCommoditiesTableType } from "../utils/types/all-portfolios/portfolio-equities-and-commodities.types";
import { CustomerManagedPortfolioTableType } from "../utils/types/all-portfolios/managed-portfolio.types";
import { InvestmentTransactions } from "../utils/types/all-portfolios/portfolio-investment-transactions.types";
import { PortfolioForApprovalTableType } from "../utils/types/all-portfolios/portfolio-for-approval.types";
import { PortfolioInvestmentsTableType } from "../utils/types/all-investments/portfolio-investments.types";
import { ViewInvestments } from "../utils/types/all-investments/portfolio-view-investments.types";
import { PortfolioPendingTradeForApprovalTableType } from "../utils/types/pending-trades/portfolio-pending-trades-for-approval.types";
import { PortfolioPendingTradeTableType } from "../utils/types/pending-trades/portfolio-pending-trades.types";

export const PORTFOLIO_TABLE_SEARCH_KEYS: (keyof PortfolioTableType)[] = [
	"id",
	"commodity",
	"customer_id",
	"equity",
	"surname",
	"equity",
	"fixed_income",
	"last_investment_date",
	"no_of_investments",
	"first_name",
	"portfolio_balance",
];

export const CUSTOMER_FIXED_INCOME_TABLE_SEARCH_KEYS: (keyof FixedIncomeInvestmentTableType)[] =
	[
		"alt_bank_used",
		"investment_date",
		"investment_offer",
		"principal_amount",
		"rollover_enabled",
		"status",
		"tenor",
	];

export const PORTFOLIO_INVESTMENT_TRANSACTIONS_TABLE_SEARCH_KEYS: (keyof InvestmentTransactions)[] =
	[
		"date_of_transaction",
		"no_of_units",
		"order_type",
		"price_per_unit",
		"status",
		"total_price",
		"transaction_id",
	];

export const CUSTOMER_EQUITIES_AND_COMMODITIES_TABLE_SEARCH_KEYS: (keyof PortfolioEquitiesAndCommoditiesTableType)[] =
	[
		"investment_offer",
		"no_of_pending_buy",
		"no_of_pending_sell",
		"total_owned_units",
	];

export const MANAGED_PORTFOLIOS_TABLE_SEARCH_KEYS: (keyof CustomerManagedPortfolioTableType)[] =
	[
		"funded_date",
		"investment_amount",
		"investment_duration",
		"investment_risk_type",
		"plan_name",
		"rollover_enabled",
		"status",
		"target_date",
	];

export const PORTFOLIO_FOR_APPROVAL_TABLE_SEARCH_KEYS: (keyof PortfolioForApprovalTableType)[] =
	[
		"change_request",
		"customer_name",
		"date_requested",
		"investment_name",
		"requested_by",
		"status",
	];

export const PORTFOLIO_INVESTMENTS_TABLE_SEARCH_KEYS: (keyof PortfolioInvestmentsTableType)[] =
	[
		"asset_class",
		"id",
		"investment_offer",
		"no_of_customers",
		"return_of_investment",
		"tenor",
		"total_investment_amount",
	];

export const PORTFOLIO_VIEW_INVESTMENTS_TABLE_SEARCH_KEYS: (keyof ViewInvestments)[] =
	[
		"customer_id",
		"first_name",
		"investment_date",
		"principal_amount",
		"status",
		"tenor",
		"surname",
	];

export const PORTFOLIO_PENDING_TRADES_TABLE_SEARCH_KEYS: (keyof PortfolioPendingTradeTableType)[] =
	[
		"aging",
		"amount_per_unit",
		"asset_class",
		"customer_name",
		"investment_name",
		"price_type",
		"quantity",
		"transaction_date",
		"total_price",
		"transaction_no",
	];

export const PORTFOLIO_PENDING_TRADES_FOR_APPROVAL_TABLE_SEARCH_KEYS: (keyof PortfolioPendingTradeForApprovalTableType)[] =
	[
		"change_request",
		"customer_name",
		"date_requested",
		"investment_name",
		"status",
		"requested_by",
	];

export const ALL_PORTFOLIO_ROUTES: TabRoute[] = [
	{
		id: 1,
		path: "/portfolio-management/portfolios",
		value: "portfolios",
		name: "Portfolio List",
	},
	{
		id: 2,
		path: "/portfolio-management/portfolios/for-approval",
		value: "portfolios/for-approval",
		name: "For Approval",
	},
];

export const PENDING_TRADES_ROUTES: TabRoute[] = [
	{
		id: 1,
		path: "/portfolio-management/pending-trades",
		value: "pending-trades",
		name: "Pending Trades",
	},
	{
		id: 2,
		path: "/portfolio-management/pending-trades/for-approval",
		value: "pending-trades/for-approval",
		name: "For Approval",
	},
];

export const VIEW_CUSTOMER_PORTFOLIO_ROUTES: TabRoute[] = [
	{
		id: 1,
		path: "fixed-income",
		value: "fixed-income",
		name: "Fixed Income",
	},
	{
		id: 2,
		path: "equities",
		value: "equities",
		name: "Equities",
	},
	{
		id: 3,
		path: "commodities",
		value: "commodities",
		name: "Commodities",
	},
	{
		id: 4,
		path: "managed-portfolio",
		value: "managed-portfolio",
		name: "Managed Portfolio",
	},
];
