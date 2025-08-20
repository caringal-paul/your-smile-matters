import DataTable from "@/ami/shared/components/custom/table/DataTable";

import investmentOffersFixedIncomeArray from "../mock/investment-listing-fixed-income.json";

import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";

import { INVESTMENT_LISTING_FIXED_INCOME_TABLE_SEARCH_KEYS } from "../constants/investment-listing.constants";
import { InvestmentListingFixedIncomeTableType } from "../utils/types/investment-listing-fixed-income.types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/core/components/base/button";
import AddButtonIcon from "@/ami/shared/assets/icons/AddButtonIcon";
import { useInvestmentListingFixedIncomeColumns } from "../utils/columns/investment-listing-fixed-income.columns";
import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";

const InvestmentListingFixedIncomeTable = () => {
	const navigate = useNavigate();
	const investmentOffers = investmentOffersFixedIncomeArray as unknown;

	const investmentOffersFixedIncomes =
		investmentOffers as InvestmentListingFixedIncomeTableType[];

	const columns = useInvestmentListingFixedIncomeColumns();

	const { searchText, setSearchText, filteredData } =
		useFilteredTableData<InvestmentListingFixedIncomeTableType>({
			data: investmentOffersFixedIncomes,
			keys: INVESTMENT_LISTING_FIXED_INCOME_TABLE_SEARCH_KEYS,
			dateFields: ["created_on"],
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
								"/investment-offers/investment-listing/investment/add/fixed-income"
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

export default InvestmentListingFixedIncomeTable;
