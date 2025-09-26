import { Button } from "@/core/components/base/button";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { Column } from "@/ami/shared/types/column.types";

import { useNavigate } from "react-router-dom";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";

import { AVAILABILITY_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import StatusWithIndicator from "@/ami/shared/components/indicator/StatusWithIndicator";
import { AvailabilityStatus } from "@/ami/shared/types/status.types";
import { CustomerAmiTableType } from "../types/customer-table.types";

export const useCustomerColumns = (): Column<CustomerAmiTableType>[] => {
	const navigate = useNavigate();

	const columns: Column<CustomerAmiTableType>[] = [
		{
			key: "customer_no",
			label: "Customer No",
			sortable: true,
			priority: 1,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "first_name",
			label: "First Name",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			label: "Last Name",
			key: "last_name",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "email",
			label: "Email Address",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "address",
			label: "Address",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "gender",
			label: "Gender",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "mobile_number",
			label: "Mobile Number",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "total_spent",
			label: "Total Spent",
			sortable: true,
			render: (value) => <DataTableRow value={formatToPeso(String(value))} />,
		},
		{
			key: "status",
			label: "Status",
			sortable: true,
			render: (value) => {
				return (
					<StatusWithIndicator
						value={value as AvailabilityStatus}
						colorMap={AVAILABILITY_STATUS_COLORS}
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
						onClick={() => navigate(`view/customer/${row._id}`)}
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
