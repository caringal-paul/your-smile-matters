// import SectionHeader from "@/ami/shared/components/header/SectionHeader";
// import DataTable from "@/ami/shared/components/table/DataTable";
// import transactionsArray from "../mock/temp-transactions.json";
// import { Button } from "@/core/components/base/button";
// import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
// import TableSearch from "@/ami/shared/components/filter/TableSearch";
// import ExportIcon from "@/ami/shared/assets/icons/ExportIcon";
// import { TransactionHistoryTableType } from "../utils/types/transaction-history-table.types";
// import { useTransactionColumns } from "../utils/columns/transaction.columns";
// import TableFilter from "@/ami/shared/components/filter/TableFilter";
// import { TRANSACTION_STATUSES_FILTER_OPTIONS } from "@/ami/shared/constants/status.constants";
// import { ASSET_CLASSES_FILTER_OPTIONS } from "@/ami/shared/constants/asset-classes.constants";

// const TRANSACTIONS_TABLE_SEARCH_KEYS: (keyof TransactionHistoryTableType)[] = [
// 	"reference_no",
// 	"customer_name",
// 	"investment_offer",
// 	"asset_class",
// 	"alt_bank_used",
// 	"principal_amount",
// 	"status",
// 	"transaction_date",
// ];

// const TransactionTable = () => {
// 	const transactions = transactionsArray as unknown;
// 	const transactionsData = transactions as TransactionHistoryTableType[];

// 	const { columns } = useTransactionColumns();

// 	const {
// 		searchText,
// 		setSearchText,
// 		filtersDraft,
// 		setFiltersDraft,
// 		dateFilterDraft,
// 		setDateFilterDraft,
// 		applyFilters,
// 		filteredData,
// 	} = useFilteredTableData<TransactionHistoryTableType>({
// 		data: transactionsData,
// 		keys: TRANSACTIONS_TABLE_SEARCH_KEYS,
// 	});

// 	return (
// 		<div className="relative pb-4">
// 			<SectionHeader hasSeparator={true} className="mt-4">
// 				<div className="flex gap-2 items-center h-9 w-full sm:w-fit">
// 					<TableSearch value={searchText} onChange={setSearchText} />
// 					<TableFilter
// 						hasDateFilter
// 						filters={filtersDraft}
// 						setFilters={setFiltersDraft}
// 						filterOptions={{
// 							...TRANSACTION_STATUSES_FILTER_OPTIONS,
// 							...ASSET_CLASSES_FILTER_OPTIONS,
// 						}}
// 						dateFilter={dateFilterDraft}
// 						setDateFilter={setDateFilterDraft}
// 						onApply={applyFilters}
// 					/>
// 				</div>
// 				<div className="w-full flex flex-col sm:flex-row justify-end">
// 					<Button className="bg-primary w-full sm:w-fit border-none [&_svg]:size-5 [&_svg]:shrink-0">
// 						Export Log <ExportIcon className="h-5 w-5" />
// 					</Button>
// 				</div>
// 			</SectionHeader>
// 			<DataTable
// 				data={filteredData}
// 				columns={columns}
// 				descriptionPriorityKey="reference_no"
// 			/>
// 		</div>
// 	);
// };

// export default TransactionTable;
