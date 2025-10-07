import DataTable from "@/ami/shared/components/table/DataTable";

import TableFilter from "@/ami/shared/components/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/filter/TableSearch";

import { useGetAllBookingQuery } from "../queries/getBookings.ami.query";
import { BookingAmiTableType } from "../utils/types/booking-table.types";
import { BOOKING_TABLE_SEARCH_KEYS } from "../constants/booking.constants";
import { useBookingColumns } from "../utils/columns/booking.columns";
import { BOOKING_STATUSES_FILTER_OPTIONS } from "@/ami/shared/constants/status.constants";

const BookingTable = () => {
	const { data: bookings = [], isLoading } = useGetAllBookingQuery();

	const columns = useBookingColumns();

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
		data: bookings.map((booking) => {
			return {
				...booking,
				booking_duration: `${booking.start_time} - ${booking.end_time}`,
			};
		}),
		keys: BOOKING_TABLE_SEARCH_KEYS,
		dateFields: ["booking_date"],
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
						filterOptions={BOOKING_STATUSES_FILTER_OPTIONS}
						onApply={applyFilters}
					/>
				</div>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} isColumnsCompressed />
		</div>
	);
};

export default BookingTable;
