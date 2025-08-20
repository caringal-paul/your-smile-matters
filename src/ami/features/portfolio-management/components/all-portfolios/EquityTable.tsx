import DataTable from "@/ami/shared/components/custom/table/DataTable";

import customerEquities from "../../mock/all-portfolios/temp-customer-equities.json";

import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import { CUSTOMER_EQUITIES_AND_COMMODITIES_TABLE_SEARCH_KEYS } from "../../constants/portfolio.constants";
import { useOutletContext } from "react-router-dom";
import { PortfolioEquitiesAndCommoditiesTableType } from "../../utils/types/all-portfolios/portfolio-equities-and-commodities.types";
import { usePortfolioEquityColumns } from "../../utils/columns/all-portfolios/portfolio-equities.columns";

const EquityTable = () => {
	const { searchText } = useOutletContext<{
		searchText: string;
	}>();
	const equities = customerEquities as unknown;

	const equitiesData = equities as PortfolioEquitiesAndCommoditiesTableType[];
	const columns = usePortfolioEquityColumns();

	const { filteredData } =
		useFilteredTableData<PortfolioEquitiesAndCommoditiesTableType>({
			data: equitiesData,
			keys: CUSTOMER_EQUITIES_AND_COMMODITIES_TABLE_SEARCH_KEYS,
			externalSearchText: searchText,
		});

	return <DataTable data={filteredData} columns={columns} dataRowLimit={5} />;
};

export default EquityTable;
