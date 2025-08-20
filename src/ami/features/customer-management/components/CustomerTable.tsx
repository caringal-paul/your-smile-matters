import DataTable from "@/ami/shared/components/custom/table/DataTable";

import customersArray from "../mock/temp-customers.json";

import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";
import { CustomerTableType } from "../utils/types/customer-table.types";
import { useCustomerColumns } from "../utils/columns/customer.columns";
import { CUSTOMER_TABLE_SEARCH_KEYS } from "../constants/customer-constants";
import { AVAILABILITY_STATUSES_FILTER_OPTIONS } from "@/ami/shared/constants/status.constants";

const CustomerTable = () => {
	const customers = customersArray as unknown;

	const customersData = customers as CustomerTableType[];
	const columns = useCustomerColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		setDateFilterDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<CustomerTableType>({
		data: customersData,
		keys: CUSTOMER_TABLE_SEARCH_KEYS,
		dateFields: ["created_on"],
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
						filterOptions={AVAILABILITY_STATUSES_FILTER_OPTIONS}
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

export default CustomerTable;
