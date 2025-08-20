import DataTable from "@/ami/shared/components/custom/table/DataTable";

import customerCommodities from "../../mock/all-portfolios/temp-customer-commodities.json";

import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import { CUSTOMER_EQUITIES_AND_COMMODITIES_TABLE_SEARCH_KEYS } from "../../constants/portfolio.constants";
import { useOutletContext } from "react-router-dom";
import { PortfolioEquitiesAndCommoditiesTableType } from "../../utils/types/all-portfolios/portfolio-equities-and-commodities.types";
import { usePortfolioCommoditiesColumns } from "../../utils/columns/all-portfolios/portfolio-commodities.columns";

const CommodityTable = () => {
	const { searchText } = useOutletContext<{
		searchText: string;
	}>();
	const commodities = customerCommodities as unknown;

	const commoditiesData =
		commodities as PortfolioEquitiesAndCommoditiesTableType[];
	const columns = usePortfolioCommoditiesColumns();

	const { filteredData } =
		useFilteredTableData<PortfolioEquitiesAndCommoditiesTableType>({
			data: commoditiesData,
			keys: CUSTOMER_EQUITIES_AND_COMMODITIES_TABLE_SEARCH_KEYS,
			externalSearchText: searchText,
		});

	return <DataTable data={filteredData} columns={columns} dataRowLimit={5} />;
};

export default CommodityTable;
