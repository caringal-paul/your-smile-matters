import DataTable from "@/ami/shared/components/custom/table/DataTable";

import investmentTransactions from "../../mock/all-portfolios/temp-portfolio-investment-transactions.json";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import { PORTFOLIO_INVESTMENT_TRANSACTIONS_TABLE_SEARCH_KEYS } from "../../constants/portfolio.constants";
import { useInvestmentTransactionColumns } from "../../utils/columns/all-portfolios/investment-transactions.columns";
import { InvestmentTransactions } from "../../utils/types/all-portfolios/portfolio-investment-transactions.types";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";
import { Label } from "@/core/components/base/label";

const TransactionHistoryTable = () => {
	const investmentTransactionsData = investmentTransactions as unknown;

	const investmentTransactionsDataData =
		investmentTransactionsData as InvestmentTransactions[];
	const columns = useInvestmentTransactionColumns();

	const { searchText, setSearchText, filteredData } =
		useFilteredTableData<InvestmentTransactions>({
			data: investmentTransactionsDataData,
			keys: PORTFOLIO_INVESTMENT_TRANSACTIONS_TABLE_SEARCH_KEYS,
		});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={false} className="mb-4">
				<div className="flex flex-col gap-2 sm:flex-row items-start sm:items-center justify-between h-9 w-full sm:w-full">
					<Label>Transaction History</Label>
					<div className="w-full sm:w-fit">
						<TableSearch value={searchText} onChange={setSearchText} />
					</div>
				</div>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />
		</div>
	);
};

export default TransactionHistoryTable;
