import { Button } from "@/core/components/base/button";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { UserTableType } from "../types/users-table.types";
import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { Column } from "@/ami/shared/types/column.types";

import { useNavigate } from "react-router-dom";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import StatusWithIndicator from "@/ami/shared/components/custom/indicator/StatusWithIndicator";
import { AVAILABILITY_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { AvailabilityStatus } from "@/ami/shared/types/status.types";

export const useUserColumns = (): Column<UserTableType>[] => {
	const navigate = useNavigate();

	const columns: Column<UserTableType>[] = [
		{
			key: "fullName",
			label: "Name",
			sortable: true,
			priority: 1,
			render: (value) => <DataTableRow value={value} />,
		},

		{
			key: "email",
			label: "Email Address",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "mobileNumber",
			label: "Mobile Number",
			sortable: true,
			priority: 1,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "username",
			label: "Username",
			sortable: true,
			priority: 1,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "activeStatus",
			label: "Status",
			sortable: true,
			render: (value) => (
				<StatusWithIndicator
					value={String(value) as AvailabilityStatus}
					colorMap={AVAILABILITY_STATUS_COLORS}
				/>
			),
		},
		{
			key: "updated_date",
			label: "Updated on",
			sortable: true,
			render: (value) => (
				<DataTableRow value={formatToTableDate(String(value))} />
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
						onClick={() => navigate(`view/user/${row.id}`)}
					>
						<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
					</Button>
					<Button
						size="icon"
						variant="icon"
						onClick={() => navigate(`edit/user/${row.id}`)}
					>
						<EditIcon fill="#1C1B1F" className="ml-1 mt-[2px]" />
					</Button>
				</div>
			),
		},
	];

	return columns;
};
