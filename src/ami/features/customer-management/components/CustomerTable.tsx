import DataTable from "@/ami/shared/components/custom/table/DataTable";

import customersArray from "../mock/temp-customers.json";

import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";
import { CustomerTableType } from "../utils/types/customer-table.types";
import { useCustomerColumns } from "../utils/columns/customer.columns";
import {
	CUSTOMER_MODULE_FILTER_OPTIONS,
	CUSTOMER_TABLE_SEARCH_KEYS,
} from "../constants/customer-constants";

const CustomerTable = () => {
	const customers = customersArray as unknown;

	const customersData = customers as CustomerTableType[];
	const columns = useCustomerColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<CustomerTableType>({
		data: customersData.map((customer) => {
			return {
				...customer,
				status: customer.isActive ? "Active" : "Inactive",
			};
		}),
		keys: CUSTOMER_TABLE_SEARCH_KEYS,
	});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={true}>
				<div className="flex gap-2 items-center h-9 w-full sm:w-fit">
					<TableSearch value={searchText} onChange={setSearchText} />
					<TableFilter
						filters={filtersDraft}
						setFilters={setFiltersDraft}
						filterOptions={CUSTOMER_MODULE_FILTER_OPTIONS}
						onApply={applyFilters}
					/>
				</div>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />
		</div>
	);
};

export default CustomerTable;
