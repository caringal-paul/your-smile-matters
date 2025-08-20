import DataTable from "@/ami/shared/components/custom/table/DataTable";

import customerLogs from "../mock/temp-customer-logs.json";

import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { Button } from "@/core/components/base/button";
import InfoIcon from "@/ami/shared/assets/icons/InfoIcon";

import ExportIcon from "@/ami/shared/assets/icons/ExportIcon";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import { CustomerLogTableType } from "../utils/types/customer-logs.types";
import { CUSTOMER_LOGSL_TABLE_SEARCH_KEYS } from "../constants/customer-constants";
import { useCustomerLogsColumns } from "../utils/columns/customer-logs.columns";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";

const CustomerActivityLogsTable = () => {
	const logs = customerLogs as unknown;

	const usersLogsData = logs as CustomerLogTableType[];

	const columns = useCustomerLogsColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		setDateFilterDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<CustomerLogTableType>({
		data: usersLogsData,
		keys: CUSTOMER_LOGSL_TABLE_SEARCH_KEYS,
		dateFields: ["date"],
	});

	return (
		<div>
			<SectionHeader hasSeparator={true}>
				<div className="flex flex-col sm:flex-row gap-2 items-center justify-between h-fit sm:h-9 w-full">
					<div className="flex gap-2 w-full items-center">
						<TableSearch value={searchText} onChange={setSearchText} />

						<TableFilter
							hasDateFilter
							filters={filtersDraft}
							setFilters={setFiltersDraft}
							dateFilter={dateFilterDraft}
							setDateFilter={setDateFilterDraft}
							onApply={applyFilters}
						/>
					</div>

					<Button className="bg-primary w-full sm:w-fit border-none [&_svg]:size-5 [&_svg]:shrink-0">
						Export Log <ExportIcon className="h-5 w-5" />
					</Button>
				</div>
			</SectionHeader>

			<div className="flex bg-accent text-[10px] md:text-xs gap-2 my-4 md:mt-0 md:mb-4 p-4 items-center rounded-md">
				<InfoIcon
					fill={"#1C1B1F"}
					className="h-8 w-8 sm:h-3 sm:w-3 md:sm:h-4 md:sm:w-4"
				/>
				This log records all account-related activites performed by customers in
				the application.
			</div>

			<DataTable data={filteredData} columns={columns} />
		</div>
	);
};

export default CustomerActivityLogsTable;
