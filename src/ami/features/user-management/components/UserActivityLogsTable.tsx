import DataTable from "@/ami/shared/components/custom/table/DataTable";
import { USERS_MODULE_FILTER_OPTIONS } from "../constants/user-constants";

import userLogs from "../mock/temp-user-logs.json";

import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";

import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { Button } from "@/core/components/base/button";
import InfoIcon from "@/ami/shared/assets/icons/InfoIcon";
import { UserLogsTableType } from "../utils/types/user-logs-table.types";
import { useUserLogsColumns } from "../utils/columns/user-logs.columns";
import ExportIcon from "@/ami/shared/assets/icons/ExportIcon";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";

const USER_LOGS_TABLE_SEARCH_KEYS: (keyof UserLogsTableType)[] = [
	"name",
	"role",
	"description_log",
];

const UserActivityLogsTable = () => {
	const logs = userLogs as unknown;

	const usersLogsData = logs as UserLogsTableType[];

	const columns = useUserLogsColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		setDateFilterDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<UserLogsTableType>({
		data: usersLogsData,
		keys: USER_LOGS_TABLE_SEARCH_KEYS,
		dateFields: ["date"],
	});

	return (
		<div>
			<SectionHeader hasSeparator={true}>
				<div className="flex flex-col sm:flex-row gap-2 items-center justify-between h-fit sm:h-9 w-full">
					<div className="flex gap-2 w-full sm:w-fit items-center">
						<TableSearch value={searchText} onChange={setSearchText} />

						<TableFilter
							hasDateFilter
							filters={filtersDraft}
							setFilters={setFiltersDraft}
							filterOptions={USERS_MODULE_FILTER_OPTIONS}
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
				This log records all changes in the system, including additions, edits,
				deletions, approvals, and assignments.
			</div>

			<DataTable data={filteredData} columns={columns} />
		</div>
	);
};

export default UserActivityLogsTable;
