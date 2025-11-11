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
import { BOOKING_STATUSES_FILTER_OPTIONS } from "@/ami/shared/constants/status.constants";
import CustomerDataTable from "@/store-front/shared/components/CustomerDataTable";
import BookingFormModal from "../../booking/components/BookingFormModal";
import { useGetMyTransactionRequestsQuery } from "../queries/getMyTransactionRequests.sf.query";
import { useMyTransactionRequestsColumns } from "../utils/columns/my-transaction-requests.columns";
import { MyTransactionRequestsSfTableType } from "../utils/types/my-transaction-requests-table.sf.types";
import { MY_TRANSACTION_REQUESTS_TABLE_SEARCH_KEYS } from "../constants/my-transaction-requests.constants";

const MyTransactionRequests = () => {
	const { data: transactions = [], isPending: isTransactionsFetching } =
		useGetMyTransactionRequestsQuery();

	const columns = useMyTransactionRequestsColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		applyFilters,
		setDateFilterDraft,
		filteredData,
	} = useFilteredTableData<MyTransactionRequestsSfTableType>({
		data: transactions,
		keys: MY_TRANSACTION_REQUESTS_TABLE_SEARCH_KEYS,
	});

	if (isTransactionsFetching) {
		return <div>Loading...</div>;
	}

	return (
		<Card className="h-fit w-full flex flex-col">
			<CardContent className="overflow-auto  px-8">
				<CardHeader className="flex flex-row justify-between px-2 py-2">
					<CardTitle className="text-3xl font-bold tracking-normal">
						My Refund Requests
					</CardTitle>
					<div className="flex flex-row w-fit gap-2">
						<TableFilter
							filters={filtersDraft}
							hasDateFilter
							dateFilter={dateFilterDraft}
							setDateFilter={setDateFilterDraft}
							setFilters={setFiltersDraft}
							filterOptions={BOOKING_STATUSES_FILTER_OPTIONS}
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
				<div className="flex flex-col gap-4">
					<CustomerDataTable
						data={filteredData}
						columns={columns}
						defaultRowsPerPage={5}
					/>
				</div>
			</CardContent>

			<BookingFormModal />
		</Card>
	);
};

export default MyTransactionRequests;
