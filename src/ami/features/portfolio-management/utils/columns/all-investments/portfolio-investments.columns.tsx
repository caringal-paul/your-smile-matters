import { Column } from "@/ami/shared/types/column.types";

import { PortfolioInvestmentsTableType } from "../../types/all-investments/portfolio-investments.types";
import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { formatToNaira } from "@/ami/shared/helpers/formatCurrency";

import { Button } from "@/core/components/base/button";
import { useNavigate } from "react-router-dom";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";

export const usePortfolioAllInvestmentsColumns = () => {
	const navigate = useNavigate();

	const columns: Column<PortfolioInvestmentsTableType>[] = [
		{
			key: "investment_offer",
			label: "Investment Offer",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "asset_class",
			label: "Asset Class",
			render: (value) => <DataTableRow value={value} />,
		},

		{
			key: "return_of_investment",
			label: "Return of Investment",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "tenor",
			label: "Tenor",
			render: (value) => (
				<DataTableRow
					className="whitespace-nowrap"
					value={!value ? "" : value}
				/>
			),
		},
		{
			key: "no_of_customers",
			label: "No. of Customers",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "total_investment_amount",
			label: "Total Investment Amount",
			sortable: true,
			render: (value) => <DataTableRow value={formatToNaira(value)} />,
		},
		{
			key: "action",
			label: "Actions",
			render: (_, row) => (
				<div className="flex">
					<Button
						size="icon"
						variant="icon"
						onClick={() => navigate(`view/investment/${row.id}`)}
					>
						<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
					</Button>
				</div>
			),
		},
	];

	return columns;
};
