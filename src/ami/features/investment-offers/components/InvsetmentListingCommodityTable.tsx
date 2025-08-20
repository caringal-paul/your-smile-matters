import DataTable from "@/ami/shared/components/custom/table/DataTable";

import investmentOffersCommodityArray from "../mock/investment-listing-commodity.json";

import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";

import { INVESTMENT_LISTING_COMMODITY_TABLE_SEARCH_KEYS } from "../constants/investment-listing.constants";
import { useInvestmentListingCommodityColumns } from "../utils/columns/investment-listing-commodity.columns";
import { InvestmentListingCommodityTableType } from "../utils/types/investment-listing-commodity.types";
import { Button } from "@/core/components/base/button";
import AddButtonIcon from "@/ami/shared/assets/icons/AddButtonIcon";
import { useNavigate } from "react-router-dom";
import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";

const InvestmentListingCommodityTable = () => {
	const navigate = useNavigate();

	const investmentOffers = investmentOffersCommodityArray as unknown;

	const investmentOffersCommodities =
		investmentOffers as InvestmentListingCommodityTableType[];

	const columns = useInvestmentListingCommodityColumns();

	const { searchText, setSearchText, filteredData } =
		useFilteredTableData<InvestmentListingCommodityTableType>({
			data: investmentOffersCommodities,
			keys: INVESTMENT_LISTING_COMMODITY_TABLE_SEARCH_KEYS,
			dateFields: ["creation_date"],
		});

	return (
		<div className="relative pb-4 space-y-4 sm:space-y-0">
			<SectionHeader hasSeparator={true}>
				<div className="flex flex-col sm:flex-row gap-2 items-center justify-between h-9 w-full">
					<div className="flex gap-2 items-center h-9 w-full sm:w-fit">
						<TableSearch value={searchText} onChange={setSearchText} />
					</div>

					<Button
						className="w-full sm:w-fit [&_svg]:size-5 [&_svg]:shrink-0"
						onClick={() =>
							navigate(
								"/investment-offers/investment-listing/investment/add/commodity"
							)
						}
					>
						<AddButtonIcon className="h-6 w-6" />
						Add New
					</Button>
				</div>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />
		</div>
	);
};

export default InvestmentListingCommodityTable;
