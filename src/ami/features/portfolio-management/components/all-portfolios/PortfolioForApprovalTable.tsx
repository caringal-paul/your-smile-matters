import DataTable from "@/ami/shared/components/custom/table/DataTable";

import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";

import ConfirmModal from "@/ami/shared/components/custom/modal/ConfirmModal";
import { useState } from "react";
import { PORTFOLIO_FOR_APPROVAL_TABLE_SEARCH_KEYS } from "../../constants/portfolio.constants";
import { PortfolioForApprovalTableType } from "../../utils/types/all-portfolios/portfolio-for-approval.types";

import portfolioForApprovalArray from "../../mock/all-portfolios/temp-portfolio-approval.json";
import { usePortfolioForApprovalColumns } from "../../utils/columns/all-portfolios/portfolio-for-approval.columns";
import { FOR_APPROVAL_STATUSES_FILTER_OPTIONS } from "@/ami/shared/constants/status.constants";

const PortfolioForApprovalTable = () => {
	const portfolioForApproval = portfolioForApprovalArray as unknown;

	const portfolioForApprovalData =
		portfolioForApproval as PortfolioForApprovalTableType[];

	const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
	const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

	const columns = usePortfolioForApprovalColumns({
		setIsRejectModalOpen,
		setIsApproveModalOpen,
	});

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		setDateFilterDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<PortfolioForApprovalTableType>({
		data: portfolioForApprovalData,
		keys: PORTFOLIO_FOR_APPROVAL_TABLE_SEARCH_KEYS,
		dateFields: ["date_requested"],
	});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={true}>
				<div className="flex gap-2 items-center h-9 w-full sm:w-fit">
					<TableSearch value={searchText} onChange={setSearchText} />
					<TableFilter
						hasDateFilter
						filters={filtersDraft}
						setFilters={setFiltersDraft}
						filterOptions={FOR_APPROVAL_STATUSES_FILTER_OPTIONS}
						dateFilter={dateFilterDraft}
						setDateFilter={setDateFilterDraft}
						onApply={applyFilters}
					/>
				</div>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />

			<ConfirmModal
				isConfirmModalOpen={isApproveModalOpen}
				toggleConfirmModal={setIsApproveModalOpen}
				confirmButtonLabel="Approve change request"
				dismissButtonLabel="Cancel"
				title="Are you sure you want to approve this change request?"
				description="By confirming, the changes will be applied to the current details."
			/>

			<ConfirmModal
				isConfirmModalOpen={isRejectModalOpen}
				toggleConfirmModal={setIsRejectModalOpen}
				confirmButtonLabel="Reject change request"
				dismissButtonLabel="Cancel"
				title="Are you sure you want to reject this change request?"
				description="By confirming, the changes will not be applied to the current details."
			/>
		</div>
	);
};

export default PortfolioForApprovalTable;
