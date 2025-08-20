import DataTable from "@/ami/shared/components/custom/table/DataTable";

import allPortfolios from "../../mock/all-portfolios/temp-customer-portfolios.json";

import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";
import { PortfolioTableType } from "../../utils/types/all-portfolios/portfolio.types";
import { usePortfolioColumns } from "../../utils/columns/all-portfolios/portfolio.columns";
import { PORTFOLIO_TABLE_SEARCH_KEYS } from "../../constants/portfolio.constants";

const AllPortfolioTable = () => {
	const portfolios = allPortfolios as unknown;

	const portfoliosData = portfolios as PortfolioTableType[];
	const columns = usePortfolioColumns();

	const {
		searchText,
		setSearchText,

		filteredData,
	} = useFilteredTableData<PortfolioTableType>({
		data: portfoliosData,
		keys: PORTFOLIO_TABLE_SEARCH_KEYS,
		dateFields: ["last_investment_date"],
	});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={true}>
				<div className="flex gap-2 items-center h-9 w-full sm:w-fit">
					<TableSearch value={searchText} onChange={setSearchText} />
				</div>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />
		</div>
	);
};

export default AllPortfolioTable;
