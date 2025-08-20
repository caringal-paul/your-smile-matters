import { Column } from "@/ami/shared/types/column.types";

import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { formatToNaira } from "@/ami/shared/helpers/formatCurrency";

import { PortfolioTableType } from "../../types/all-portfolios/portfolio.types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/core/components/base/button";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";

export const usePortfolioColumns = () => {
	const navigate = useNavigate();

	const columns: Column<PortfolioTableType>[] = [
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
			key: "no_of_investments",
			label: "No. of Investments",
			sortable: true,
			priority: 2,
			render: (value) => (
				<DataTableRow value={value} className="xl:text-center" />
			),
		},
		{
			key: "fixed_income",
			label: "Fixed Income",
			sortable: true,
			render: (value) => (
				<DataTableRow value={value} className="xl:text-center" />
			),
		},
		{
			key: "equity",
			label: "Equity",
			sortable: true,
			render: (value) => (
				<DataTableRow value={value} className="xl:text-center" />
			),
		},
		{
			key: "commodity",
			label: "Commodity",
			sortable: true,
			render: (value) => (
				<DataTableRow value={value} className="xl:text-center" />
			),
		},

		{
			key: "portfolio_balance",
			label: "Portfolio Balance",
			priority: 1,
			sortable: true,
			render: (value) => <DataTableRow value={formatToNaira(value)} />,
		},
		{
			key: "last_investment_date",
			label: "Last Investment Date",
			sortable: true,
			render: (value) => (
				<DataTableRow
					value={formatToTableDate(String(value))}
					className="whitespace-nowrap"
				/>
			),
		},
		{
			key: "action",
			label: "Actions",
			render: (_, row) => (
				<div className="flex">
					<Button
						size="icon"
						variant="icon"
						onClick={() =>
							navigate(
								`view/portfolio/${row.id}/customer/${row.customer_id}/fixed-income`
							)
						}
					>
						<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
					</Button>
				</div>
			),
		},
	];

	return columns;
};
