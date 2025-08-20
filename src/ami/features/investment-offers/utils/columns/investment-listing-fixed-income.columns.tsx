import { Button } from "@/core/components/base/button";
import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { Column } from "@/ami/shared/types/column.types";

import { formatToNaira } from "@/ami/shared/helpers/formatCurrency";

import { useNavigate } from "react-router-dom";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { InvestmentListingFixedIncomeTableType } from "../types/investment-listing-fixed-income.types";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";

export const useInvestmentListingFixedIncomeColumns =
	(): Column<InvestmentListingFixedIncomeTableType>[] => {
		const navigate = useNavigate();

		const columns: Column<InvestmentListingFixedIncomeTableType>[] = [
			{
				key: "investment_offer",
				label: "Investment Offer",
				sortable: true,
				priority: 1,
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "description",
				label: "Description",
				sortable: true,
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "return_of_investment",
				label: "Return of Investment",
				sortable: true,
				render: (value, row) => (
					<DataTableRow
						value={`${value} ${row.return_of_investment_frequency}`}
						className="whitespace-nowrap"
					/>
				),
			},
			{
				key: "investment_tenor",
				label: "Tenor",
				sortable: true,
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "min_investment_amount",
				label: (
					<div className="w-[8em] whitespace-pre-wrap">Min. Principal</div>
				),
				sortable: true,
				render: (value) => (
					<DataTableRow
						value={formatToNaira(value)}
						className="whitespace-nowrap"
					/>
				),
			},
			{
				key: "max_investment_amount",
				label: (
					<div className="w-[8em] whitespace-pre-wrap">Max. Principal</div>
				),
				sortable: true,
				render: (value) => (
					<DataTableRow
						value={formatToNaira(value)}
						className="whitespace-nowrap"
					/>
				),
			},
			{
				key: "created_on",
				label: "Created on",
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
									`/investment-offers/investment-listing/investment/view/fixed-income/${row.id}`
								)
							}
						>
							<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
						</Button>
						<Button
							size="icon"
							variant="icon"
							onClick={() =>
								navigate(
									`/investment-offers/investment-listing/investment/edit/fixed-income/${row.id}`
								)
							}
						>
							<EditIcon fill="#1C1B1F" className="ml-1 mt-[2px]" />
						</Button>
					</div>
				),
			},
		];

		return columns;
	};
