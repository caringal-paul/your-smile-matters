import DataTable from "@/ami/shared/components/custom/table/DataTable";
import {
	USER_TABLE_SEARCH_KEYS,
	USERS_MODULE_FILTER_OPTIONS,
} from "../constants/user-constants";
import { useUserColumns } from "../utils/columns/user.columns";
import { UserAmiTableType } from "../utils/types/users-table.types";
import usersArray from "../mock/temp-user.json";

import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";
import { Button } from "@/core/components/base/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const UserTable = () => {
	const navigate = useNavigate();
	const users = usersArray as unknown;

	const usersData = users as UserAmiTableType[];
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
	} = useFilteredTableData<UserAmiTableType>({
		data: usersData.map((user) => {
			return {
				...user,
				full_name: `${user.first_name} ${user.last_name}`,
				status: user.is_active ? "Active" : "Inactive",
			};
		}),
		keys: USER_TABLE_SEARCH_KEYS,
		dateFields: ["updated_at"],
	});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={true}>
				<div className="flex items-center w-full gap-2 h-9 sm:w-fit">
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

				<Button onClick={() => navigate("create/user")}>
					<PlusCircle />
					Create User
				</Button>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />
		</div>
	);
};

export default UserTable;
