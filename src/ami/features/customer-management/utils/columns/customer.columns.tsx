import { Button } from "@/core/components/base/button";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { Column } from "@/ami/shared/types/column.types";

import { useNavigate } from "react-router-dom";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import { CustomerTableType } from "../types/customer-table.types";
import { formatToNaira } from "@/ami/shared/helpers/formatCurrency";

import { AVAILABILITY_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import StatusWithIndicator from "@/ami/shared/components/custom/indicator/StatusWithIndicator";
import { AvailabilityStatus } from "@/ami/shared/types/status.types";

export const useCustomerColumns = (): Column<CustomerTableType>[] => {
	const navigate = useNavigate();

	const columns: Column<CustomerTableType>[] = [
		{
			key: "id",
			label: "Customer ID",
			sortable: true,
			priority: 1,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "surname",
			label: "Surname",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "first_name",
			label: "First Name",
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
			key: "portfolio_balance",
			label: "Portfolio Balance",
			sortable: true,
			render: (value) => <DataTableRow value={formatToNaira(value)} />,
		},
		{
			key: "created_on",
			label: "Created on",
			sortable: true,
			render: (value) => (
				<DataTableRow value={formatToTableDate(String(value))} />
			),
		},
		{
			key: "status",
			label: "Status",
			sortable: true,
			render: (value) => (
				<StatusWithIndicator
					value={value as AvailabilityStatus}
					colorMap={AVAILABILITY_STATUS_COLORS}
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
						onClick={() => navigate(`view/customer/${row.id}`)}
					>
						<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
					</Button>
					<Button
						size="icon"
						variant="icon"
						onClick={() => navigate(`edit/customer/${row.id}`)}
					>
						<EditIcon fill="#1C1B1F" className="ml-1 mt-[2px]" />
					</Button>
				</div>
			),
		},
	];

	return columns;
};
