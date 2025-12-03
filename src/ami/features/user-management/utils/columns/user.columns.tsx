import { Button } from "@/core/components/base/button";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { UserAmiTableType } from "../types/users-table.ami.types";
import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { Column } from "@/core/types/column.types";

import { useNavigate } from "react-router-dom";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import StatusWithIndicator from "@/ami/shared/components/indicator/StatusWithIndicator";
import { AVAILABILITY_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { AvailabilityStatus } from "@/ami/shared/types/status.types";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/core/components/base/avatar";
import { getInitials } from "@/core/helpers/getInitials";

export const useUserColumns = (): Column<UserAmiTableType>[] => {
	const navigate = useNavigate();

	const columns: Column<UserAmiTableType>[] = [
		{
			key: "profile_image",
			label: "",
			priority: 1,
			render: (_, row) => (
				<Avatar className="ml-4">
					<AvatarImage
						src={row.profile_image}
						alt="@shadcn"
						// className="size-6 bg-red-500"
					/>
					<AvatarFallback>
						{getInitials(`${row.first_name} ${row.last_name}`)}
					</AvatarFallback>
				</Avatar>
			),
		},
		{
			key: "full_name",
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
			key: "mobile_number",
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
			key: "status",
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
			key: "updated_at",
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
						onClick={() => navigate(`view/user/${row._id}`)}
					>
						<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
					</Button>
					<Button
						size="icon"
						variant="icon"
						onClick={() => navigate(`edit/user/${row._id}`)}
					>
						<EditIcon fill="#1C1B1F" className="ml-1 mt-[2px]" />
					</Button>
				</div>
			),
		},
	];

	return columns;
};
