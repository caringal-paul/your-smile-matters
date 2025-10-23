import DataTable from "@/ami/shared/components/table/DataTable";

import TableFilter from "@/ami/shared/components/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/filter/TableSearch";

import {
	TRANSACTION_TABLE_AMI_FILTER_OPTIONS,
	TRANSACTION_TABLE_SEARCH_KEYS,
} from "../constants/transaction.constants";
import { useGetAllTransactionsQuery } from "../queries/getTransactions.ami.query";
import { useTransactionColumns } from "../utils/columns/transaction.columns";
import { TransactionAmiTableType } from "../utils/types/transaction-history-table.types";
import { TRANSACTION_STATUSES_FILTER_OPTIONS } from "@/ami/shared/constants/status.constants";

const TransactionTable = () => {
	const { data: transactions = [], isLoading } = useGetAllTransactionsQuery();

	const columns = useTransactionColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		applyFilters,
		setDateFilterDraft,
		filteredData,
	} = useFilteredTableData<TransactionAmiTableType>({
		data: transactions.map((transaction) => {
			return {
				...transaction,
				booking_reference: transaction.booking_id.booking_reference,
				customer_no: transaction.customer_id.customer_no,
				customer_name: `${transaction.customer_id.first_name} ${transaction.customer_id.last_name}`,
				customer_email: transaction.customer_id.email,
				customer_contact: transaction.customer_id.mobile_number,
				booking_total_price: String(transaction.booking_id.final_amount),
				booking_id_string: transaction.booking_id._id,
			};
		}),
		keys: TRANSACTION_TABLE_SEARCH_KEYS,
		// dateFields: ["Transaction_date"],
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
						filterOptions={TRANSACTION_TABLE_AMI_FILTER_OPTIONS}
						onApply={applyFilters}
					/>
				</div>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} isColumnsCompressed />
		</div>
	);
};

export default TransactionTable;
