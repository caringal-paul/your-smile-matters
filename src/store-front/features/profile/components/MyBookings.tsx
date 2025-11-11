import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/core/components/base/card";
import { Separator } from "@/core/components/base/separator";
import { useGetMyBookingsQuery } from "../queries/getMyBookings.sf.query";
import { useMyBookingColumns } from "../utils/columns/my-bookings.columns";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import { MyBookingsSfTableType } from "../utils/types/my-bookings-table.sf.types";
import { BOOKING_TABLE_SEARCH_KEYS } from "@/ami/features/booking-management/constants/booking.constants";
import TableSearch from "@/ami/shared/components/filter/TableSearch";
import TableFilter from "@/ami/shared/components/filter/TableFilter";
import { BOOKING_STATUSES_FILTER_OPTIONS } from "@/ami/shared/constants/status.constants";
import CustomerDataTable from "@/store-front/shared/components/CustomerDataTable";
import { formatToNormalTime } from "@/ami/shared/helpers/formatDate";
import BookingFormModal from "../../booking/components/BookingFormModal";
import { useBookingFormStore } from "@/store-front/store/useBookingFormStore";
import { MY_BOOKING_TABLE_SEARCH_KEYS } from "../constants/my-bookings.constants";

const MyBookings = () => {
	const { data: bookings = [], isPending: isBookingsFetching } =
		useGetMyBookingsQuery();

	const columns = useMyBookingColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		applyFilters,
		setDateFilterDraft,
		filteredData,
	} = useFilteredTableData<MyBookingsSfTableType>({
		data: bookings.map((booking) => {
			return {
				...booking,
				booking_duration: `${formatToNormalTime(
					booking.start_time
				)} - ${formatToNormalTime(booking.end_time)}`,
				photographer_name: booking.photographer_id.name,
			};
		}),
		keys: MY_BOOKING_TABLE_SEARCH_KEYS,
		dateFields: ["booking_date"],
	});

	if (isBookingsFetching) {
		return <div>Loading...</div>;
	}

	return (
		<Card className="h-fit w-full flex flex-col">
			<CardContent className="overflow-auto  px-8">
				<CardHeader className="flex flex-row justify-between px-2 py-2">
					<CardTitle className="text-3xl font-bold tracking-normal">
						My Bookings
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

export default MyBookings;
