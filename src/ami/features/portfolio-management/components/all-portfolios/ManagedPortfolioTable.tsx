import DataTable from "@/ami/shared/components/custom/table/DataTable";

import customerManagedPortfolios from "../../mock/all-portfolios/temp-customer-managed-portfolios.json";

import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import { MANAGED_PORTFOLIOS_TABLE_SEARCH_KEYS } from "../../constants/portfolio.constants";
import { useOutletContext } from "react-router-dom";
import { CustomerManagedPortfolioTableType } from "../../utils/types/all-portfolios/managed-portfolio.types";
import { useManagedPortfolioColumns } from "../../utils/columns/all-portfolios/managed-portfolio.columns";
import ConfirmModal from "@/ami/shared/components/custom/modal/ConfirmModal";
import { useState } from "react";

const ManagedPortfolioTable = () => {
	const { searchText } = useOutletContext<{
		searchText: string;
	}>();
	const managedPortfolios = customerManagedPortfolios as unknown;

	const [isRolloverModalOpen, setIsRolloverModalOpen] = useState(false);
	const [isTerminateInvestmentModalOpen, setIsTerminateInvestmentModalOpen] =
		useState(false);

	const managedPortfoliosData =
		managedPortfolios as CustomerManagedPortfolioTableType[];
	const columns = useManagedPortfolioColumns({
		setIsRolloverModalOpen,
		setIsTerminateInvestmentModalOpen,
	});

	const { filteredData } =
		useFilteredTableData<CustomerManagedPortfolioTableType>({
			data: managedPortfoliosData,
			keys: MANAGED_PORTFOLIOS_TABLE_SEARCH_KEYS,
			externalSearchText: searchText,
		});

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

export default ManagedPortfolioTable;
