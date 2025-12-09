import { Button } from "@/core/components/base/button";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";
import { Column } from "@/core/types/column.types";
import { useNavigate } from "react-router-dom";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import { PackageAmiTableType } from "../types/package-table.types";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { ServiceModel } from "@/core/models/service.model";
import { Badge } from "@/core/components/base/badge";
import parse from "html-react-parser";
import { useCurrentAmiUser } from "@/ami/store/useCurrentAmiUser";

export const useServiceColumns = (): Column<PackageAmiTableType>[] => {
	const navigate = useNavigate();

	const currentUser = useCurrentAmiUser((state) => state.currentUser);

	const columns: Column<PackageAmiTableType>[] = [
		{
			key: "name",
			label: "Package Name",
			sortable: true,
			priority: 1,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "description",
			label: "Description",
			sortable: true,
			render: (value, row) => (
				<div
					className={
						"font-normal text-2xs 2xl:text-xs rich-text max-h-[10em] max-w-[40em] line-clamp-3 truncate"
					}
				>
					{!value ? <>-</> : <> {parse(String(row.description))}</>}
				</div>
			),
		},
		{
			key: "servicesData",
			label: "Services",
			sortable: true,
			render: (value) => {
				return (
					<div className="space-y-1">
						{Array.isArray(value) && value.length > 0 ? (
							<>
								{(value as ServiceModel[]).map((service) => {
									return (
										<div
											key={service._id}
											className="flex flex-row items-center gap-2"
										>
											<DataTableRow value={service.name} />{" "}
											<Badge
												className={`text-white text-2xs font-bold whitespace-nowrap
													${service.is_available ? "bg-admin-primary" : "bg-admin-background-sidebar"}
												`}
											>
												{service.is_available
													? "Service Available"
													: "Service Unavailable"}
											</Badge>
										</div>
									);
								})}
							</>
						) : (
							<DataTableRow value={"-"} />
						)}
					</div>
				);
			},
		},
		{
			key: "package_price",
			label: "Price",
			sortable: true,
			render: (value) => <DataTableRow value={formatToPeso(String(value))} />,
		},
		{
			key: "looks",
			label: "Looks",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "is_available",
			label: "Package Status",
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
						onClick={() => {
							console.log(row);
							navigate(`view/package/${row._id}`);
						}}
					>
						<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
					</Button>

					{currentUser?.is_photographer ? null : (
						<Button
							size="icon"
							variant="icon"
							onClick={() => navigate(`edit/package/${row._id}`)}
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
