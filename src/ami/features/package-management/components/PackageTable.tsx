import DataTable from "@/ami/shared/components/table/DataTable";

import packagesArray from "../mock/temp-packages.json";
import servicesArray from "../../service-management/mock/temp-services.json";

import TableFilter from "@/ami/shared/components/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/filter/TableSearch";
import { PackageAmiTableType } from "../utils/types/package-table.types";
import { useServiceColumns } from "../utils/columns/package.columns";
import {
	PACKAGE_MODULE_FILTER_OPTIONS,
	PACKAGE_TABLE_SEARCH_KEYS,
} from "../constants/package-constants";
import { Button } from "@/core/components/base/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ServiceModel } from "@/core/models/service.model";
import { useGetAllServicesQuery } from "../../service-management/queries/getServices.ami.query";
import { useGetAllPackagesQuery } from "../queries/getPackages.ami.query";
import { PluginKey } from "@tiptap/pm/state";
import LoadingFallback from "@/core/components/custom/LoadingFallback";
import { useCurrentAmiUser } from "@/ami/store/useCurrentAmiUser";

const PackageTable = () => {
	const navigate = useNavigate();

	const { data: services = [], isLoading: isServicesFetching } =
		useGetAllServicesQuery();
	const { data: packages = [], isLoading: isPackagesFetching } =
		useGetAllPackagesQuery();

	const packagesData = packages as PackageAmiTableType[];
	const columns = useServiceColumns();
	const currentUser = useCurrentAmiUser((state) => state.currentUser);

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<PackageAmiTableType>({
		data: packagesData.map((pkg) => {
			const servicesData = pkg.services.map((service) => {
				return { ...service.service_details };
			});

			return {
				...pkg,
				servicesData,
				status: pkg.is_available ? "Available" : "Unavailable",
			};
		}),
		keys: PACKAGE_TABLE_SEARCH_KEYS,
	});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={true}>
				<div className="flex items-center w-full gap-2 h-9 sm:w-fit">
					<TableSearch
						value={searchText}
						onChange={setSearchText}
						disabled={isServicesFetching && isPackagesFetching}
					/>
					<TableFilter
						filters={filtersDraft}
						setFilters={setFiltersDraft}
						filterOptions={PACKAGE_MODULE_FILTER_OPTIONS}
						onApply={applyFilters}
						disabled={isServicesFetching && isPackagesFetching}
					/>
				</div>

				{currentUser?.is_photographer ? null : (
					<Button
						onClick={() => navigate("create/package")}
						className="w-full sm:w-fit"
					>
						<PlusCircle />
						Create Package
					</Button>
				)}
			</SectionHeader>

			{isServicesFetching && isPackagesFetching ? (
				<LoadingFallback />
			) : (
				<DataTable data={filteredData} columns={columns} />
			)}
		</div>
	);
};

export default PackageTable;
