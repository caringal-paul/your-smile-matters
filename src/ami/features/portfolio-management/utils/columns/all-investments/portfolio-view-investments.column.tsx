import { Column } from "@/ami/shared/types/column.types";

import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { formatToNaira } from "@/ami/shared/helpers/formatCurrency";

import { ViewInvestments } from "../../types/all-investments/portfolio-view-investments.types";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import StatusWithIndicator from "@/ami/shared/components/custom/indicator/StatusWithIndicator";
import { FixedIncomeAndManagedPortfolioInvestmentStatus } from "@/ami/shared/types/status.types";
import { FIXED_INCOME_AND_MANAGED_PORTFOLIO_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";

export const usePortfolioViewInvestmentsColumns = () => {
	const columns: Column<ViewInvestments>[] = [
		{
			key: "customer_id",
			label: "Customer ID",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "first_name",
			label: "First Name",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},

		{
			key: "surname",
			label: "Surname",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "tenor",
			label: "Tenor",
			sortable: true,
			render: (value) => <DataTableRow value={!value ? "" : value} />,
		},
		{
			key: "principal_amount",
			label: "Principal Amount",
			sortable: true,
			render: (value) => <DataTableRow value={formatToNaira(value)} />,
		},
		{
			key: "status",
			label: "Status",
			sortable: true,
			render: (value) => (
				<StatusWithIndicator
					value={value as FixedIncomeAndManagedPortfolioInvestmentStatus}
					colorMap={FIXED_INCOME_AND_MANAGED_PORTFOLIO_STATUS_COLORS}
				/>
			),
		},
		{
			key: "investment_date",
			label: "Investment Date",
			sortable: true,
			render: (value) => (
				<DataTableRow value={formatToTableDate(String(value))} />
			),
		},
	];

	return columns;
};
