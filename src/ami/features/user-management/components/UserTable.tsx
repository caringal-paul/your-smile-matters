import DataTable from "@/ami/shared/components/custom/table/DataTable";
import {
	USER_TABLE_SEARCH_KEYS,
	USERS_MODULE_FILTER_OPTIONS,
} from "../constants/user-constants";
import { useUserColumns } from "../utils/columns/user.columns";
import { UserTableType } from "../utils/types/users-table.types";
import usersArray from "../mock/temp-user.json";

import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";
import { AvailabilityStatus } from "@/ami/shared/types/status.types";

const UserTable = () => {
	const users = usersArray as unknown;

	const usersData = users as UserTableType[];
	const columns = useUserColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		setDateFilterDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<UserTableType>({
		data: usersData.map((user) => {
			return {
				...user,
				fullName: `${user.firstName} ${user.lastName}`,
				activeStatus: user.isActive ? "Active" : "Inactive",
			};
		}),
		keys: USER_TABLE_SEARCH_KEYS,
		dateFields: ["updated_date"],
	});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={true}>
				<div className="flex gap-2 items-center h-9 w-full sm:w-fit">
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
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />
		</div>
	);
};

export default UserTable;
