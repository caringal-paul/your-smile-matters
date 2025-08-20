import { TabRoute } from "@/ami/shared/types/tab-routes.types";
import { InvestmentListingForApprovalTableType } from "../utils/types/investment-listing-for-approval.types";
import { InvestmentListingCommodityTableType } from "../utils/types/investment-listing-commodity.types";
import { InvestmentListingEquityTableType } from "../utils/types/investment-listing-equity.types";
import { InvestmentListingFixedIncomeTableType } from "../utils/types/investment-listing-fixed-income.types";

export const INVESTMENT_LISTING_FOR_APPROVAL_TABLE_SEARCH_KEYS: (keyof InvestmentListingForApprovalTableType)[] =
	[
		"date_requested",
		"change_request",
		"investment_offer",
		"asset_class",
		"requested_by",
		"status",
	];

export const INVESTMENT_LISTING_COMMODITY_TABLE_SEARCH_KEYS: (keyof InvestmentListingCommodityTableType)[] =
	[
		"amount",
		"creation_date",
		"description",
		"investment_offer",
		"minimum_holding_period",
		"minimum_investable_amount",
		"portfolio_weight",
	];

export const INVESTMENT_LISTING_EQUITY_TABLE_SEARCH_KEYS: (keyof InvestmentListingEquityTableType)[] =
	[
		"available_units",
		"description",
		"id",
		"investment_offer",
		"market_price",
		"price_change",
		"price_per_unit",
		"total_units",
		"units_bought",
	];

export const INVESTMENT_LISTING_FIXED_INCOME_TABLE_SEARCH_KEYS: (keyof InvestmentListingFixedIncomeTableType)[] =
	[
		"asset_class",
		"description",
		"id",
		"investment_offer",
		"investment_tenor",
		"return_of_investment_frequency",
		"return_of_investment",
		"min_investment_amount",
		"max_investment_amount",
		"created_on",
	];

export const INVESTMENT_LISTING_ROUTES: TabRoute[] = [
	{
		id: 1,
		path: "/investment-offers/investment-listing/fixed-income",
		value: "fixed-income",
		name: "Fixed Income",
	},
	{
		id: 2,
		path: "/investment-offers/investment-listing/equities",
		value: "equities",
		name: "Equity",
	},
	{
		id: 3,
		path: "/investment-offers/investment-listing/commodities",
		value: "commodities",
		name: "Commodity",
	},
	{
		id: 4,
		path: "/investment-offers/investment-listing/for-approval",
		value: "for-approval",
		name: "For Approval",
	},
];
