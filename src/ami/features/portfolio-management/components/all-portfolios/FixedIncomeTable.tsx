import DataTable from "@/ami/shared/components/custom/table/DataTable";

import customerFixedIncome from "../../mock/all-portfolios/temp-customer-fixed-income.json";

import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import { CUSTOMER_FIXED_INCOME_TABLE_SEARCH_KEYS } from "../../constants/portfolio.constants";
import { FixedIncomeInvestmentTableType } from "../../utils/types/all-portfolios/portfolio-fixed-income.types";
import { usePortfolioFixedIncomeColumns } from "../../utils/columns/all-portfolios/portfolio-fixed-income.columns";
import { useOutletContext } from "react-router-dom";
import ConfirmModal from "@/ami/shared/components/custom/modal/ConfirmModal";
import { useState } from "react";

const PortfolioFixedIncomeTable = () => {
	const { searchText } = useOutletContext<{
		searchText: string;
	}>();

	const [isRolloverModalOpen, setIsRolloverModalOpen] = useState(false);
	const [isTerminateInvestmentModalOpen, setIsTerminateInvestmentModalOpen] =
		useState(false);

	const fixedIncomes = customerFixedIncome as unknown;

	const fixedIncomesData = fixedIncomes as FixedIncomeInvestmentTableType[];
	const columns = usePortfolioFixedIncomeColumns({
		setIsRolloverModalOpen,
		setIsTerminateInvestmentModalOpen,
	});

	const { filteredData } = useFilteredTableData<FixedIncomeInvestmentTableType>(
		{
			data: fixedIncomesData,
			keys: CUSTOMER_FIXED_INCOME_TABLE_SEARCH_KEYS,
			externalSearchText: searchText,
		}
	);

	return (
		<>
			<DataTable data={filteredData} columns={columns} dataRowLimit={5} />

			<ConfirmModal
				isConfirmModalOpen={isRolloverModalOpen}
				toggleConfirmModal={setIsRolloverModalOpen}
				confirmButtonLabel="Request roll over"
				dismissButtonLabel="Cancel"
				title="Are you sure you want to roll over this investment?"
				description="By confirming, this investment will be marked for rollover on behalf of the user. The request will be submitted and sent for approval before the action is finalized."
			/>

			<ConfirmModal
				isConfirmModalOpen={isTerminateInvestmentModalOpen}
				toggleConfirmModal={setIsTerminateInvestmentModalOpen}
				confirmButtonLabel="Request termination"
				dismissButtonLabel="Cancel"
				title="Are you sure you want to terminate this investment?"
				description="By confirming, this investment will be marked for termination on behalf of the user. The request will be submitted and sent for approval before the action is finalized."
			/>
		</>
	);
};

export default PortfolioFixedIncomeTable;
