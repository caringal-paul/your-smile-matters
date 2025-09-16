import DataTable from "@/ami/shared/components/custom/table/DataTable";

import servicesArray from "../mock/temp-services.json";

import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";
import { ServiceAmiTableType } from "../utils/types/service-table.types";
import { useServiceColumns } from "../utils/columns/service.columns";
import {
	SERVICE_MODULE_FILTER_OPTIONS,
	SERVICE_TABLE_SEARCH_KEYS,
} from "../constants/service-constants";

const ServiceTable = () => {
	const services = servicesArray as unknown;

	const servicesData = services as ServiceAmiTableType[];
	const columns = useServiceColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<ServiceAmiTableType>({
		data: servicesData.map((service) => {
			return {
				...service,
				status: service.is_available ? "Available" : "Unavailable",
			};
		}),
		keys: SERVICE_TABLE_SEARCH_KEYS,
	});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={true}>
				<div className="flex items-center w-full gap-2 h-9 sm:w-fit">
					<TableSearch value={searchText} onChange={setSearchText} />
					<TableFilter
						filters={filtersDraft}
						setFilters={setFiltersDraft}
						filterOptions={SERVICE_MODULE_FILTER_OPTIONS}
						onApply={applyFilters}
					/>
				</div>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />
		</div>
	);
};

export default ServiceTable;
