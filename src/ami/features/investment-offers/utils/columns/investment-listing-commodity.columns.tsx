import { Button } from "@/core/components/base/button";
import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { Column } from "@/ami/shared/types/column.types";

import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { InvestmentListingCommodityTableType } from "../types/investment-listing-commodity.types";
import { formatToNaira } from "@/ami/shared/helpers/formatCurrency";

import { useNavigate } from "react-router-dom";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";

export const useInvestmentListingCommodityColumns =
	(): Column<InvestmentListingCommodityTableType>[] => {
		const navigate = useNavigate();

		const columns: Column<InvestmentListingCommodityTableType>[] = [
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
				key: "amount",
				label: "Amount",
				sortable: true,
				render: (value) => (
					<DataTableRow
						value={formatToNaira(value)}
						className="whitespace-nowrap"
					/>
				),
			},
			{
				key: "portfolio_weight",
				label: (
					<div className="w-[6em] whitespace-pre-wrap">
						Portfolio Weight (%)
					</div>
				),
				sortable: true,
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "minimum_holding_period",
				label: (
					<div className="w-[8em] whitespace-pre-wrap">
						Minimum Holding Period
					</div>
				),
				sortable: true,
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "minimum_investable_amount",
				label: (
					<div className="w-[12em] whitespace-pre-wrap">
						Minimum Investable Amount (grams)
					</div>
				),
				sortable: true,
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "creation_date",
				label: "Creation Date",
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
									`/investment-offers/investment-listing/investment/view/commodity/${row.id}`
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
									`/investment-offers/investment-listing/investment/edit/commodity/${row.id}`
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
