import DataTable from "@/ami/shared/components/custom/table/DataTable";

import investmentOffersApproval from "../mock/investment-listing-for-approval.json";

import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";

import { FOR_APPROVAL_STATUSES_FILTER_OPTIONS } from "@/ami/shared/constants/status.constants";
import { useState } from "react";
import ConfirmModal from "@/ami/shared/components/custom/modal/ConfirmModal";
import { InvestmentListingForApprovalTableType } from "../utils/types/investment-listing-for-approval.types";
import { useInvestmentListingForApprovalColumns } from "../utils/columns/investment-listing-for-approval.columns";
import { INVESTMENT_LISTING_FOR_APPROVAL_TABLE_SEARCH_KEYS } from "../constants/investment-listing.constants";

const InvsetmentListingForApprovalTable = () => {
	const investmentOffers = investmentOffersApproval as unknown;

	const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
	const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

	const investmentOffersForApproval =
		investmentOffers as InvestmentListingForApprovalTableType[];
	const columns = useInvestmentListingForApprovalColumns({
		setIsApproveModalOpen,
		setIsRejectModalOpen,
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
	} = useFilteredTableData<InvestmentListingForApprovalTableType>({
		data: investmentOffersForApproval,
		keys: INVESTMENT_LISTING_FOR_APPROVAL_TABLE_SEARCH_KEYS,
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
				confirmButtonLabel="Approve request"
				dismissButtonLabel="Cancel"
				title="Are you sure you want to approve this change request?"
				description="By confirming, the changes will be applied to the current details."
			/>

			<ConfirmModal
				isConfirmModalOpen={isRejectModalOpen}
				toggleConfirmModal={setIsRejectModalOpen}
				confirmButtonLabel="Reject request"
				dismissButtonLabel="Cancel"
				title="Are you sure you want to reject this change request?"
				description="By confirming, the changes will not be applied to the current details."
			/>
		</div>
	);
};

export default InvsetmentListingForApprovalTable;
