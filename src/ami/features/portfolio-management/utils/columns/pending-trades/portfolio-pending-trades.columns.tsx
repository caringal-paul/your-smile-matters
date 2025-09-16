import { Column } from "@/ami/shared/types/column.types";

import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";

import { PortfolioPendingTradeTableType } from "../../types/pending-trades/portfolio-pending-trades.types";
import { Button } from "@/core/components/base/button";
import XCircleIcon from "@/ami/shared/assets/icons/XCircleIcon";

export const usePortfolioPendingTradeColumns = (
	setIsCancelTradeModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const columns: Column<PortfolioPendingTradeTableType>[] = [
		{
			key: "transaction_no",
			label: "Transaction No.",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "customer_name",
			label: "Customer Name",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},

		{
			key: "investment_name",
			label: "Investment Name",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "asset_class",
			label: "Asset Class",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "transaction_date",
			label: "Transaction Date",
			sortable: true,
			render: (value) => (
				<DataTableRow value={formatToTableDate(String(value))} />
			),
		},
		{
			key: "aging",
			label: "Aging",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "price_type",
			label: "Price Type",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "amount_per_unit",
			label: "Amount per Unit",
			sortable: true,
			render: (value) => <DataTableRow value={formatToPeso(String(value))} />,
		},
		{
			key: "quantity",
			label: "Quantity",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "total_price",
			label: "Total Price",
			sortable: true,
			render: (value) => <DataTableRow value={formatToPeso(String(value))} />,
		},
		{
			key: "action",
			label: "Actions",
			render: (_) => (
				<div className="flex">
					<Button
						size="icon"
						variant="icon"
						className="hover:bg-transparent w-6"
						onClick={() => setIsCancelTradeModalOpen(true)}
					>
						<XCircleIcon className="h-5 w-5" />
					</Button>
				</div>
			),
		},
	];

	return columns;
};
