import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { Column } from "@/core/types/column.types";

import { CustomerLogTableType } from "../types/customer-logs.types";

export const useCustomerLogsColumns = (): Column<CustomerLogTableType>[] => {
	const columns: Column<CustomerLogTableType>[] = [
		{
			key: "date",
			label: "Date",
			sortable: true,
			render: (value) => (
				<DataTableRow value={formatToTableDate(String(value))} />
			),
		},
		{
			key: "customer_id",
			label: "Customer ID",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "customer_name",
			label: "Customer Name",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "description_log",
			label: "Description Log",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
	];

	return columns;
};
