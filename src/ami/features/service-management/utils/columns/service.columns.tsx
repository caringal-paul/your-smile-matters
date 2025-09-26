import { Button } from "@/core/components/base/button";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";
import { Column } from "@/ami/shared/types/column.types";
import { useNavigate } from "react-router-dom";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import { ServiceAmiTableType } from "../types/service-table.types";

export const useServiceColumns = (): Column<ServiceAmiTableType>[] => {
	const navigate = useNavigate();

	const columns: Column<ServiceAmiTableType>[] = [
		{
			key: "name",
			label: "Service Name",
			sortable: true,
			priority: 1,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "description",
			label: "Description",
			sortable: true,
			render: (value) => <DataTableRow value={!value ? "-" : value} />,
		},
		{
			key: "category",
			label: "Category",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "is_available",
			label: "Service Status",
			sortable: true,
			render: (value) => (
				<DataTableRow value={!value ? "Unavailable" : "Available"} />
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
						onClick={() => navigate(`view/service/${row._id}`)}
					>
						<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
					</Button>
					<Button
						size="icon"
						variant="icon"
						onClick={() => navigate(`edit/service/${row._id}`)}
					>
						<EditIcon fill="#1C1B1F" className="ml-1 mt-[2px]" />
					</Button>
				</div>
			),
		},
	];

	return columns;
};
