import { Button } from "@/core/components/base/button";
import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { Column } from "@/ami/shared/types/column.types";

import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";

import { useNavigate } from "react-router-dom";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import {
	InvestmentListingEquityTableType,
	PriceChange,
} from "../types/investment-listing-equity.types";
import SelectArrowIcon from "@/ami/shared/assets/icons/SelectArrowIcon";

export const useInvestmentListingEquityColumns =
	(): Column<InvestmentListingEquityTableType>[] => {
		const navigate = useNavigate();

		const columns: Column<InvestmentListingEquityTableType>[] = [
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
				key: "market_price",
				label: "Market Price",
				sortable: true,
				render: (value) => (
					<DataTableRow
						value={formatToPeso(value)}
						className="whitespace-nowrap"
					/>
				),
			},
			{
				key: "price_change",
				label: "Price Change",
				sortable: true,
				render: (value: PriceChange) => (
					<div className="text-2xs flex items-center gap-1">
						<SelectArrowIcon
							className={`${value.direction == "up" && "rotate-180"} h-3 w-3`}
							fill={value.direction == "up" ? "#22c55e" : "#ef4444"}
						/>{" "}
						{value.value}
					</div>
				),
			},
			{
				key: "price_per_unit",
				label: (
					<div className="w-[8em] whitespace-pre-wrap">Price per Unit</div>
				),
				sortable: true,
				render: (value) => (
					<DataTableRow
						value={formatToPeso(value)}
						className="whitespace-nowrap"
					/>
				),
			},
			{
				key: "total_units",
				label: "Total Units",
				sortable: true,
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "available_units",
				label: "Available Units",
				sortable: true,
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "units_bought",
				label: "Units Bought",
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
									`/investment-offers/investment-listing/investment/view/equity/${row.id}`
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
									`/investment-offers/investment-listing/investment/edit/equity/${row.id}`
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
