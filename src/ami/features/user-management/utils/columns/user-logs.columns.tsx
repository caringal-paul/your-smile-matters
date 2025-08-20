import { UserLogsTableType } from "../types/user-logs-table.types";
import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { Column } from "@/ami/shared/types/column.types";

export const useUserLogsColumns = (): Column<UserLogsTableType>[] => {
	const columns: Column<UserLogsTableType>[] = [
		{
			key: "date",
			label: "Date",
			sortable: true,
			render: (value) => (
				<DataTableRow value={formatToTableDate(String(value))} />
			),
		},
		{
			key: "name",
			label: "Name",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "role",
			label: "Role",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "description_log",
			label: "Description Log",
			priority: 1,
			render: (value) => <DataTableRow value={value} />,
		},
	];

	return columns;
};
