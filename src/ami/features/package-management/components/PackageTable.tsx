import DataTable from "@/ami/shared/components/custom/table/DataTable";

import packagesArray from "../mock/temp-packages.json";
import servicesArray from "../../service-management/mock/temp-services.json";

import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";
import { PackageAmiTableType } from "../utils/types/package-table.types";
import { useServiceColumns } from "../utils/columns/package.columns";
import {
	PACKAGE_MODULE_FILTER_OPTIONS,
	PACKAGE_TABLE_SEARCH_KEYS,
} from "../constants/package-constants";
import { Button } from "@/core/components/base/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PackageTable = () => {
	const navigate = useNavigate();
	const packages = packagesArray as unknown;

	const packagesData = packages as PackageAmiTableType[];
	const columns = useServiceColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<PackageAmiTableType>({
		data: packagesData.map((pkg) => {
			return {
				...pkg,
				servicesData: servicesArray.filter((service) =>
					pkg.included_services.includes(service._id)
				),
				status: pkg.is_available ? "Available" : "Unavailable",
			};
		}),
		keys: PACKAGE_TABLE_SEARCH_KEYS,
	});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={true}>
				<div className="flex items-center w-full gap-2 h-9 sm:w-fit">
					<TableSearch value={searchText} onChange={setSearchText} />
					<TableFilter
						filters={filtersDraft}
						setFilters={setFiltersDraft}
						filterOptions={PACKAGE_MODULE_FILTER_OPTIONS}
						onApply={applyFilters}
					/>
				</div>
				<Button onClick={() => navigate("create/package")}>
					<PlusCircle />
					Create Package
				</Button>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />
		</div>
	);
};

export default PackageTable;
