import { Button } from "@/core/components/base/button";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";
import {
	formatToNormalDate,
	formatToTableDate,
} from "@/ami/shared/helpers/formatDate";
import { Column } from "@/ami/shared/types/column.types";

import { useNavigate } from "react-router-dom";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";

import {
	AVAILABILITY_STATUS_COLORS,
	BOOKING_STATUS_COLORS,
} from "@/ami/shared/constants/status-colors.constants";
import StatusWithIndicator from "@/ami/shared/components/indicator/StatusWithIndicator";
import {
	AvailabilityStatus,
	BookingStatus,
} from "@/ami/shared/types/status.types";
import { BookingAmiTableType } from "../types/booking-table.types";

export const useBookingColumns = (): Column<BookingAmiTableType>[] => {
	const navigate = useNavigate();

	const columns: Column<BookingAmiTableType>[] = [
		{
			key: "booking_reference",
			label: "Reference No",
			sortable: true,
			priority: 1,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "photographer_name",
			label: "Assigned Photographer",
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
			key: "booking_date",
			label: "Booking Date",
			sortable: true,
			render: (_, row) => (
				<DataTableRow value={formatToNormalDate(row.booking_date)} />
			),
		},
		{
			key: "booking_duration",
			label: "Booking Duration",
			sortable: true,
			render: (value) => <DataTableRow value={value} className="text-center" />,
		},

		{
			key: "location",
			label: "Location",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "remaining_balance",
			label: "Remaining Balance",
			sortable: true,
			render: (value) => (
				<DataTableRow
					value={formatToPeso(String(value))}
					className="text-center"
				/>
			),
		},
		{
			key: "final_amount",
			label: "Total Amount",
			sortable: true,
			render: (value) => (
				<DataTableRow
					value={formatToPeso(String(value))}
					className="text-center"
				/>
			),
		},
		{
			key: "status",
			label: "Status",
			sortable: true,
			render: (value) => {
				return (
					<StatusWithIndicator
						value={value as BookingStatus}
						colorMap={BOOKING_STATUS_COLORS}
					/>
				);
			},
		},
		{
			key: "action",
			label: "Actions",
			render: (_, row) => (
				<div className="flex">
					<Button
						size="icon"
						variant="icon"
						onClick={() => navigate(`view/booking/${row._id}`)}
					>
						<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
					</Button>
					{/* TODO Make this a trash icon for deac react */}
					{/* <Button
						size="icon"
						variant="icon"
						onClick={() => navigate(`edit/customer/${row.id}`)}
					>
						<EditIcon fill="#1C1B1F" className="ml-1 mt-[2px]" />
					</Button> */}
				</div>
			),
		},
	];

	return columns;
};
