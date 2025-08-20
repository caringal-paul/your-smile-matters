import DataTable from "@/ami/shared/components/custom/table/DataTable";
import allInvestments from "../../mock/all-investments/temp-investments.json";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";
import { PORTFOLIO_INVESTMENTS_TABLE_SEARCH_KEYS } from "../../constants/portfolio.constants";
import { PortfolioInvestmentsTableType } from "../../utils/types/all-investments/portfolio-investments.types";
import { usePortfolioAllInvestmentsColumns } from "../../utils/columns/all-investments/portfolio-investments.columns";
import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";
import { ASSET_CLASSES_FILTER_OPTIONS } from "@/ami/shared/constants/asset-classes.constants";

const AllInvestmentTable = () => {
	const investments = allInvestments as unknown;

	const investmentsData = investments as PortfolioInvestmentsTableType[];
	const columns = usePortfolioAllInvestmentsColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<PortfolioInvestmentsTableType>({
		data: investmentsData,
		keys: PORTFOLIO_INVESTMENTS_TABLE_SEARCH_KEYS,
	});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={true}>
				<div className="flex gap-2 items-center h-9 w-full sm:w-fit">
					<TableSearch value={searchText} onChange={setSearchText} />
					<TableFilter
						filters={filtersDraft}
						setFilters={setFiltersDraft}
						filterOptions={ASSET_CLASSES_FILTER_OPTIONS}
						onApply={applyFilters}
					/>
				</div>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />
		</div>
	);
};

export default AllInvestmentTable;
