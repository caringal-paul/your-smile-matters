import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/core/components/base/card";
import { Separator } from "@/core/components/base/separator";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/filter/TableSearch";
import TableFilter from "@/ami/shared/components/filter/TableFilter";
import { TRANSACTION_STATUSES_FILTER_OPTIONS } from "@/ami/shared/constants/status.constants";
import CustomerDataTable from "@/store-front/shared/components/CustomerDataTable";
import { TRANSACTION_TABLE_SEARCH_KEYS } from "../../transactions/constants/transaction.sf.constants";
import { MyTransactionsSfTableType } from "../utils/types/my-transactions-table.sf.types";
import { useMyTransactionsColumns } from "../utils/columns/my-transactions.columns";
import { useGetAllTransactionsPerCustomer } from "../../transactions/queries/getTransactionsByBooking.sf.query";
import CustomerLoadingFallback from "@/core/components/custom/CustomerLoadingFallback";

const MyTransactions = () => {
	const { data: transactions = [], isPending: isTransactionsFetching } =
		useGetAllTransactionsPerCustomer();

	const columns = useMyTransactionsColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		applyFilters,
		setDateFilterDraft,
		filteredData,
	} = useFilteredTableData<MyTransactionsSfTableType>({
		data: transactions.map((transaction) => {
			return {
				...transaction,
				booking_reference: transaction.booking_id?.booking_reference || "",
				booking_status: transaction.booking_id?.status || "",
			};
		}),

		keys: TRANSACTION_TABLE_SEARCH_KEYS,
		dateFields: ["transaction_date"],
	});

	if (isTransactionsFetching) {
		return (
			<div className="h-full justify-center items-center flex">
				<CustomerLoadingFallback />
			</div>
		);
	}

	return (
		<Card className="h-fit w-full flex flex-col">
			<CardContent className="overflow-auto px-8">
				<CardHeader className="flex flex-row justify-between px-2 py-2">
					<CardTitle className="text-3xl font-bold tracking-normal">
						My Transactions
					</CardTitle>
					<div className="flex flex-row w-fit gap-2">
						<TableFilter
							filters={filtersDraft}
							hasDateFilter
							dateFilter={dateFilterDraft}
							setDateFilter={setDateFilterDraft}
							setFilters={setFiltersDraft}
							filterOptions={TRANSACTION_STATUSES_FILTER_OPTIONS}
							onApply={applyFilters}
							className="rounded-lg border-border border-[1px] shadow-sm text-sm"
						/>
						<TableSearch
							value={searchText}
							onChange={setSearchText}
							className="rounded-lg border-border border-[1px] shadow-sm text-sm placeholder:text-sm"
						/>
					</div>
				</CardHeader>
				<Separator className="mt-4 mb-6" />
				<div className="flex flex-col gap-4 ">
					<CustomerDataTable
						data={filteredData}
						columns={columns}
						defaultRowsPerPage={5}
					/>
				</div>
			</CardContent>

			{/* <BookingFormModal /> */}
		</Card>
	);
};

export default MyTransactions;
