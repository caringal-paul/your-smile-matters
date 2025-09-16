import { TransactionHistoryTableType } from "../types/transaction-history-table.types";
import { Column } from "@/ami/shared/types/column.types";

import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import StatusWithIndicator from "@/ami/shared/components/custom/indicator/StatusWithIndicator";
import { TRANSACTION_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { TransactionStatus } from "@/ami/shared/types/status.types";

export const useTransactionColumns = () => {
	const columns: Column<TransactionHistoryTableType>[] = [
		{
			key: "reference_no",
			label: "Reference No.",
			sortable: true,
			render: (value) => (
				<DataTableRow
					value={value}
					className="line-clamp-4 text-ellipsis overflow-hidden"
				/>
			),
		},

		{
			key: "customer_name",
			label: "Customer Name",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "investment_offer",
			label: "Investment Offer",
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
			key: "alt_bank_used",
			label: "AltBank Used",
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "principal_amount",
			label: "Principal Amount",
			sortable: true,
			render: (value) => <DataTableRow value={formatToPeso(value)} />,
		},
		{
			key: "status",
			label: "Status",
			sortable: true,
			render: (value) => (
				<StatusWithIndicator
					value={value as TransactionStatus}
					colorMap={TRANSACTION_STATUS_COLORS}
				/>
			),
		},
		{
			key: "transaction_date",
			label: "Transaction Date",
			sortable: true,
			render: (value) => (
				<DataTableRow
					value={formatToTableDate(String(value))}
					className="whitespace-nowrap"
				/>
			),
		},
	];

	return { columns };
};
