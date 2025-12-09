import { Button } from "@/core/components/base/button";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";
import { Column } from "@/core/types/column.types";

import { useNavigate } from "react-router-dom";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";

import { AVAILABILITY_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import StatusWithIndicator from "@/ami/shared/components/indicator/StatusWithIndicator";
import { AvailabilityStatus } from "@/ami/shared/types/status.types";
import { PhotographerAmiTableType } from "../types/photographer-table.types";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/core/components/base/avatar";
import { getInitials } from "@/core/helpers/getInitials";
import { Badge } from "@/core/components/base/badge";

import parse from "html-react-parser";
import { useCurrentAmiUser } from "@/ami/store/useCurrentAmiUser";

export const usePhotographerColumns =
	(): Column<PhotographerAmiTableType>[] => {
		const navigate = useNavigate();

		const currentUser = useCurrentAmiUser((state) => state.currentUser);

		const columns: Column<PhotographerAmiTableType>[] = [
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
						<AvatarFallback>{getInitials(row.name)}</AvatarFallback>
					</Avatar>
				),
			},
			{
				key: "name",
				label: "Name",
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
				key: "bio",
				label: "Bio",
				sortable: true,
				render: (_, row) => (
					<div className="max-w-[40em] line-clamp-3 whitespace-normal font-normal text-2xs 2xl:text-xs rich-text">
						{row.bio ? parse(row.bio) : "-"}
					</div>
				),
			},
			{
				key: "mobile_number",
				label: "Mobile No.",
				sortable: true,
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "specialties",
				label: "Specialties",
				sortable: true,
				render: (_, row) => (
					<div className="flex flex-wrap max-w-[10em] gap-1">
						{row.specialties.map((specialty) => {
							return <Badge>{specialty}</Badge>;
						})}
					</div>
				),
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
							onClick={() => navigate(`view/photographer/${row._id}`)}
						>
							<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
						</Button>

						{currentUser?.role_and_permissions.name === "Admin" ||
						currentUser?._id != row._id ? null : (
							<Button
								size="icon"
								variant="icon"
								onClick={() => navigate(`edit/photographer/${row._id}`)}
							>
								<EditIcon fill="#1C1B1F" className="ml-1 mt-[2px]" />
							</Button>
						)}
					</div>
				),
			},
		];

		return columns;
	};
