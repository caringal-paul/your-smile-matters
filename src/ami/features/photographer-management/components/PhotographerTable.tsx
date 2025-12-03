import DataTable from "@/ami/shared/components/table/DataTable";
import SectionHeader from "@/ami/shared/components/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/filter/TableSearch";
import { Button } from "@/core/components/base/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useGetAllPhotographersQuery } from "../queries/getPhotographers.ami.query";
import { usePhotographerColumns } from "../utils/columns/photographer.columns";
import { PhotographerAmiTableType } from "../utils/types/photographer-table.types";
import {
	PHOTOGRAPHER_MODULE_FILTER_OPTIONS,
	PHOTOGRAPHER_TABLE_SEARCH_KEYS,
} from "../constants/photographer.constants";
import TableFilter from "@/ami/shared/components/filter/TableFilter";
import LoadingFallback from "@/core/components/custom/LoadingFallback";

const PhotographerTable = () => {
	const navigate = useNavigate();

	const { data: photographers = [], isLoading } = useGetAllPhotographersQuery();

	const columns = usePhotographerColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<PhotographerAmiTableType>({
		data: photographers.map((user) => {
			return {
				...user,
				status: user.is_active ? "Active" : "Inactive",
			};
		}),
		keys: PHOTOGRAPHER_TABLE_SEARCH_KEYS,
		dateFields: ["updated_at"],
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
						filterOptions={PHOTOGRAPHER_MODULE_FILTER_OPTIONS}
						onApply={applyFilters}
						disabled={isLoading}
					/>
				</div>

				<Button
					onClick={() => navigate("create/photographer")}
					className="w-full sm:w-fit"
				>
					<PlusCircle />
					Create Photographer
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

export default PhotographerTable;
