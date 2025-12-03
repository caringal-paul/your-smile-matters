import DataTable from "@/ami/shared/components/table/DataTable";

import servicesArray from "../mock/temp-services.json";

import TableFilter from "@/ami/shared/components/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/filter/TableSearch";
import { ServiceAmiTableType } from "../utils/types/service-table.types";
import { useServiceColumns } from "../utils/columns/service.columns";
import {
	SERVICE_MODULE_FILTER_OPTIONS,
	SERVICE_TABLE_SEARCH_KEYS,
} from "../constants/service-constants";
import { Button } from "@/core/components/base/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAllServicesQuery } from "../queries/getServices.ami.query";
import LoadingFallback from "@/core/components/custom/LoadingFallback";

const ServiceTable = () => {
	const navigate = useNavigate();

	const { data: services = [], isLoading } = useGetAllServicesQuery();

	const columns = useServiceColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<ServiceAmiTableType>({
		data: services.map((service) => {
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
					<TableSearch
						value={searchText}
						onChange={setSearchText}
						disabled={isLoading}
					/>
					<TableFilter
						filters={filtersDraft}
						setFilters={setFiltersDraft}
						filterOptions={SERVICE_MODULE_FILTER_OPTIONS}
						onApply={applyFilters}
						disabled={isLoading}
					/>
				</div>

				<Button
					onClick={() => navigate("create/service")}
					className="w-full sm:w-fit"
				>
					<PlusCircle />
					Create Service
				</Button>
			</SectionHeader>

			{isLoading ? (
				<LoadingFallback />
			) : (
				<DataTable data={filteredData} columns={columns} />
			)}
		</div>
	);
};

export default ServiceTable;
