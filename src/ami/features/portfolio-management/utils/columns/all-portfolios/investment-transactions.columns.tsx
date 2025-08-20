import { Column } from "@/ami/shared/types/column.types";

import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { formatToNaira } from "@/ami/shared/helpers/formatCurrency";

import { InvestmentTransactions } from "../../types/all-portfolios/portfolio-investment-transactions.types";
import StatusWithIndicator from "@/ami/shared/components/custom/indicator/StatusWithIndicator";
import { EQUITY_AND_COMMODITY_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { EquityAndCommodityInvestmentStatus } from "@/ami/shared/types/status.types";

export const useInvestmentTransactionColumns = () => {
	const columns: Column<InvestmentTransactions>[] = [
		{
			key: "transaction_id",
			label: "Transaction ID",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "order_type",
			label: "Order Type",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},

		{
			key: "price_per_unit",
			label: "Price per Unit",
			sortable: true,
			render: (value) => <DataTableRow value={formatToNaira(String(value))} />,
		},
		{
			key: "total_price",
			label: "Total Price",
			sortable: true,
			render: (value) => <DataTableRow value={formatToNaira(String(value))} />,
		},
		{
			key: "status",
			label: "Status",
			render: (value) => (
				<StatusWithIndicator
					value={value as EquityAndCommodityInvestmentStatus}
					colorMap={EQUITY_AND_COMMODITY_STATUS_COLORS}
				/>
			),
		},
		{
			key: "no_of_units",
			label: "No. of Units",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "date_of_transaction",
			label: "Date of Transaction",
			sortable: true,
			render: (value) => (
				<DataTableRow value={formatToTableDate(String(value))} />
			),
		},
	];

	return columns;
};
