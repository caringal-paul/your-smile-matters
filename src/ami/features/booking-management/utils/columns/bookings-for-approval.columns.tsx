import { Column } from "@/core/types/column.types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/core/components/base/button";
import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";
import { BookingForApprovalAmiTableType } from "../types/booking-for-approval-table.ami.types";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";

export const useBookingForApprovalColumns =
	(): Column<BookingForApprovalAmiTableType>[] => {
		const navigate = useNavigate();

		const columns: Column<BookingForApprovalAmiTableType>[] = [
			{
				key: "request_reference",
				label: "Reference No",
				sortable: true,
				priority: 1,
				render: (value) => (
					<DataTableRow className="font-light" value={value} />
				),
			},
			{
				key: "booking_reference",
				label: "Booking Ref No",
				sortable: true,
				priority: 1,
				render: (value) => (
					<DataTableRow className="font-light" value={value} />
				),
			},
			{
				key: "request_type",
				label: "Request Type",
				sortable: true,
				render: (value) => {
					return <DataTableRow value={value} />;
				},
			},
			{
				key: "reason",
				label: "Reason",
				sortable: true,
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "status",
				label: "Status",
				sortable: true,
				render: (value) => {
					return <DataTableRow value={value} />;
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
							onClick={() => {
								navigate(`view/request/${row._id}`);
							}}
						>
							<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
						</Button>
					</div>
				),
			},
		];

		return columns;
	};
