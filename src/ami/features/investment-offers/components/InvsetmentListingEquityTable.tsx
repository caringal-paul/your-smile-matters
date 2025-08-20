import DataTable from "@/ami/shared/components/custom/table/DataTable";

import investmentOffersEquityArray from "../mock/investment-listing-equity.json";

import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";

import { INVESTMENT_LISTING_EQUITY_TABLE_SEARCH_KEYS } from "../constants/investment-listing.constants";
import { InvestmentListingEquityTableType } from "../utils/types/investment-listing-equity.types";
import { useInvestmentListingEquityColumns } from "../utils/columns/investment-listing-equity.columns";

const InvestmentListingEquityTable = () => {
	const investmentOffers = investmentOffersEquityArray as unknown;

	const investmentOffersEquities =
		investmentOffers as InvestmentListingEquityTableType[];

	const columns = useInvestmentListingEquityColumns();

	const { searchText, setSearchText, filteredData } =
		useFilteredTableData<InvestmentListingEquityTableType>({
			data: investmentOffersEquities,
			keys: INVESTMENT_LISTING_EQUITY_TABLE_SEARCH_KEYS,
		});

	return (
		<div className="relative pb-4 space-y-4 sm:space-y-0">
			<SectionHeader hasSeparator={true}>
				<div className="flex flex-col sm:flex-row gap-2 items-center justify-between h-9 w-full">
					<TableSearch value={searchText} onChange={setSearchText} />

					{/* <Button
						className="w-full sm:w-fit [&_svg]:size-5 [&_svg]:shrink-0"
						onClick={() =>
							navigate(
								"/investment-offers/investment-listing/investment/add/commodity"
							)
						}
					>
						<AddButtonIcon className="h-6 w-6" />
						Add New
					</Button> */}
				</div>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />
		</div>
	);
};

export default InvestmentListingEquityTable;
