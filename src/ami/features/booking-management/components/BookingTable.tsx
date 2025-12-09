import DataTable from "@/ami/shared/components/table/DataTable";

import TableFilter from "@/ami/shared/components/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/filter/TableSearch";

import { useGetAllBookingQuery } from "../queries/getBookings.ami.query";
import { BookingAmiTableType } from "../utils/types/booking-table.ami.types";
import { BOOKING_TABLE_SEARCH_KEYS } from "../constants/booking.constants";
import { useBookingColumns } from "../utils/columns/booking.columns";
import { BOOKING_STATUSES_FILTER_OPTIONS } from "@/ami/shared/constants/status.constants";
import LoadingFallback from "@/core/components/custom/LoadingFallback";
import { useCurrentAmiUser } from "@/ami/store/useCurrentAmiUser";

const BookingTable = () => {
	const { data: bookings = [], isLoading } = useGetAllBookingQuery();
	const currentUser = useCurrentAmiUser((state) => state.currentUser);

	const columns = useBookingColumns();

	// Filter bookings by current user if photographer
	const filteredBookings = bookings
		.filter((booking) => {
			if (currentUser?.is_photographer) {
				return booking.photographer_id === currentUser._id;
			}
			return true; // non-photographers see all bookings
		})
		.sort(
			(a, b) =>
				new Date(String(b.updated_at)).getTime() -
				new Date(String(a.updated_at)).getTime()
		)
		.map((booking) => ({
			...booking,
			booking_duration: `${booking.start_time} - ${booking.end_time}`,
		}));

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		applyFilters,
		setDateFilterDraft,
		filteredData,
	} = useFilteredTableData<BookingAmiTableType>({
		data: filteredBookings,
		keys: BOOKING_TABLE_SEARCH_KEYS,
		dateFields: ["booking_date"],
	});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={true}>
				<div className="flex items-center w-full gap-2 h-9 sm:w-fit">
					<TableSearch
						value={searchText}
						onChange={setSearchText}
						disabled={isLoading}
					/>
					<TableFilter
						filters={filtersDraft}
						hasDateFilter
						dateFilter={dateFilterDraft}
						setDateFilter={setDateFilterDraft}
						setFilters={setFiltersDraft}
						filterOptions={BOOKING_STATUSES_FILTER_OPTIONS}
						onApply={applyFilters}
						disabled={isLoading}
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

export default BookingTable;
