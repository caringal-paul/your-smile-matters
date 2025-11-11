import { Column } from "@/core/types/column.types";
import { useNavigate } from "react-router-dom";
import { formatToNormalDate } from "@/ami/shared/helpers/formatDate";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { Button } from "@/core/components/base/button";
import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";
import { MyBookingRequestsSfTableType } from "../types/my-booking-requests-table.sf.types";
import { EyeIcon, XIcon } from "lucide-react";

export const useMyBookingRequestsColumns =
	(): Column<MyBookingRequestsSfTableType>[] => {
		const navigate = useNavigate();

		const columns: Column<MyBookingRequestsSfTableType>[] = [
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
					return (
						<DataTableRow className="font-light text-center" value={value} />
					);
				},
			},
			{
				key: "reason",
				label: "Reason",
				sortable: true,
				render: (value) => (
					<DataTableRow className="font-light" value={value} />
				),
			},
			{
				key: "status",
				label: "Status",
				sortable: true,
				render: (value) => {
					return (
						<DataTableRow className="font-light text-center" value={value} />
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
							onClick={() => {
								navigate(`request/${row._id}/details`);
							}}
						>
							<EyeIcon fill="white" className="mt-[1px]" />
						</Button>
						<Button
							size="icon"
							variant="icon"
							onClick={() => {
								navigate(`booking/${row._id}/details`);
							}}
						>
							<XIcon fill="#1C1B1F" className="ml-1 mt-[2px]" />
						</Button>
					</div>
				),
			},
		];

		return columns;
	};
