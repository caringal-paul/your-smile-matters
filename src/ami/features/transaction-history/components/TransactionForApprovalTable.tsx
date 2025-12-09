import DataTable from "@/ami/shared/components/table/DataTable";

import TableFilter from "@/ami/shared/components/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/filter/TableSearch";

import {
	BOOKING_STATUSES_FILTER_OPTIONS,
	TRANSACTION_STATUSES_FILTER_OPTIONS,
} from "@/ami/shared/constants/status.constants";
import { useGetTransactionsForApprovalQuery } from "../queries/getTransactionsForApproval.ami.query";
import { useTransactionForApprovalColumns } from "../utils/columns/transaction-for-approval.columns";
import { TransactionForApprovalAmiTableType } from "../utils/types/transaction-for-approval-table.ami.types";
import { TRANSACTION_FOR_APPROVALTABLE_SEARCH_KEYS } from "../constants/transaction.constants";
import LoadingFallback from "@/core/components/custom/LoadingFallback";

const TransactionsForApprovalTable = () => {
	const { data: transactions = [], isLoading } =
		useGetTransactionsForApprovalQuery();

	const columns = useTransactionForApprovalColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		applyFilters,
		setDateFilterDraft,
		filteredData,
	} = useFilteredTableData<TransactionForApprovalAmiTableType>({
		data: transactions,
		keys: TRANSACTION_FOR_APPROVALTABLE_SEARCH_KEYS,
	});

	if (isLoading) {
		return <>Loading</>;
	}

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={true}>
				<div className="flex items-center w-full gap-2 h-9 sm:w-fit">
					<TableSearch value={searchText} onChange={setSearchText} />
					<TableFilter
						filters={filtersDraft}
						hasDateFilter
						dateFilter={dateFilterDraft}
						setDateFilter={setDateFilterDraft}
						setFilters={setFiltersDraft}
						filterOptions={TRANSACTION_STATUSES_FILTER_OPTIONS}
						onApply={applyFilters}
					/>
				</div>
			</SectionHeader>
			{isLoading ? (
				<LoadingFallback />
			) : (
				<DataTable data={filteredData} columns={columns} isColumnsCompressed />
			)}
		</div>
	);
};

export default TransactionsForApprovalTable;
