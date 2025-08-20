import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useState } from "react";
import DataTable from "@/ami/shared/components/custom/table/DataTable";
import supportForApprovalArray from "../mock/temp-support-approval.json";
import { useSupportsForApprovalColumn } from "../utils/columns/support-approval.columns";
import ConfirmModal from "@/ami/shared/components/custom/modal/ConfirmModal";
import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import { SupportsApprovalTableType } from "../utils/types/support-table.types";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";
import { SUPPORT_TABLE_SEARCH_KEYS } from "../constants/support-constants";
import { FOR_APPROVAL_STATUSES_FILTER_OPTIONS } from "@/ami/shared/constants/status.constants";

const SupportsForApprovalTable = () => {
	const supportsForApproval = supportForApprovalArray as unknown;
	const supportsForApprovalData =
		supportsForApproval as SupportsApprovalTableType[];

	const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
	const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

	const columns = useSupportsForApprovalColumn(
		setIsApproveModalOpen,
		setIsRejectModalOpen
	);

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		setDateFilterDraft,
		filteredData,
		applyFilters,
	} = useFilteredTableData<SupportsApprovalTableType>({
		data: supportsForApprovalData,
		keys: SUPPORT_TABLE_SEARCH_KEYS,
		dateFields: ["date_requested"],
	});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={false} className="mb-4">
				<div className="flex gap-2 items-center h-9 w-full sm:w-fit mt-4 sm:mt-0">
					<TableSearch value={searchText} onChange={setSearchText} />
					<TableFilter
						hasDateFilter
						filterOptions={FOR_APPROVAL_STATUSES_FILTER_OPTIONS}
						filters={filtersDraft}
						setFilters={setFiltersDraft}
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

export default SupportsForApprovalTable;
