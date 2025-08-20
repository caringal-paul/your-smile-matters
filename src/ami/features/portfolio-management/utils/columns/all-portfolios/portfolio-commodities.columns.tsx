import { Column } from "@/ami/shared/types/column.types";

import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { Button } from "@/core/components/base/button";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import { PortfolioEquitiesAndCommoditiesTableType } from "../../types/all-portfolios/portfolio-equities-and-commodities.types";
import { useNavigate } from "react-router-dom";

export const usePortfolioCommoditiesColumns = () => {
	const navigate = useNavigate();

	const columns: Column<PortfolioEquitiesAndCommoditiesTableType>[] = [
		{
			key: "investment_offer",
			label: "Investment Offer",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},

		{
			key: "total_owned_units",
			label: "Total Owned Units",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "no_of_pending_buy",
			label: "No. of Pending Buy",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "no_of_pending_sell",
			label: "No. of Pending Sell",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
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
								`investment/${row.id}/transactions/?name=${row.investment_offer}`
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
