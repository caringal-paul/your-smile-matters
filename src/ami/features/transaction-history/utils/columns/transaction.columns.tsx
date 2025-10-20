import { TransactionAmiTableType } from "../types/transaction-history-table.types";
import { Column } from "@/core/types/column.types";

import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import StatusWithIndicator from "@/ami/shared/components/indicator/StatusWithIndicator";
import { TransactionStatus } from "@/ami/shared/types/status.types";
import { TRANSACTION_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";

import { HandCoins, SmartphoneNfc } from "lucide-react";
import { Button } from "@/core/components/base/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/core/components/base/tooltip";
import { useNavigate } from "react-router-dom";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";

export const useTransactionColumns = () => {
	const navigate = useNavigate();

	const columns: Column<TransactionAmiTableType>[] = [
		{
			key: "transaction_reference",
			label: "Transaction Ref No.",
			sortable: true,
			render: (value) => (
				<DataTableRow
					value={value}
					className="line-clamp-4 text-ellipsis overflow-hidden"
				/>
			),
		},
		{
			key: "booking_reference",
			label: "Booking Reference",
			sortable: true,
			render: (_, row) => (
				<Tooltip delayDuration={200}>
					<TooltipTrigger asChild className="cursor-pointer">
						<Button
							variant="link"
							size="link"
							onClick={() => {
								navigate(
									`/admin/ami/booking-management/bookings/view/booking/${row.booking_id_string}`
								);
							}}
						>
							{row.booking_reference}
						</Button>
					</TooltipTrigger>
					<TooltipContent
						className="text-white bg-admin-secondary text-3xs"
						side="right"
						sideOffset={5}
						align="end"
						alignOffset={10}
					>
						<p>View Booking?</p>
					</TooltipContent>
				</Tooltip>
			),
			// booking_id_string,
		},
		{
			key: "transaction_type",
			label: "Transaction Type",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
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
			key: "payment_method",
			label: "MOP",
			sortable: true,
			render: (_, row) => (
				<div
					className={
						"font-normal text-2xs 2xl:text-xs truncate flex flex-row items-center gap-1"
					}
				>
					{row.payment_method == "Cash" ? (
						<HandCoins className="size-3 2xl:size-4" />
					) : (
						<SmartphoneNfc className="size-3 2xl:size-4" />
					)}
					{row.payment_method}
				</div>
			),
		},
		{
			key: "amount",
			label: "Amount",
			render: (value) => <DataTableRow value={formatToPeso(String(value))} />,
		},

		{
			key: "booking_total_price",
			label: "Booking Price",
			sortable: true,
			render: (value) => <DataTableRow value={formatToPeso(String(value))} />,
		},
		{
			key: "customer_name",
			label: "Customer Name",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "customer_no",
			label: "Customer No.",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "customer_email",
			label: "Customer Email",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},

		{
			key: "customer_contact",
			label: "Customer Contact",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
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
		{
			key: "action",
			label: "Actions",
			render: (_, row) => (
				<div className="flex">
					<Button
						size="icon"
						variant="icon"
						onClick={() => navigate(`view/transaction/${row._id}`)}
					>
						<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
					</Button>
				</div>
			),
		},
	];

	return columns;
};
