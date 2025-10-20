import { useQuery } from "@tanstack/react-query";
import { BookingResponseSf } from "../../booking/utils/types/booking-response.sf.types";
import sfBookingApi from "@/core/api/booking/sf/booking.sf.api";

export const useGetMyBookingsQuery = () => {
	return useQuery({
		queryKey: ["my-bookings"],
		queryFn: () => sfBookingApi.getMyBookings(),
		select: (data): BookingResponseSf[] => {
			const bookingsArray = data.data ?? [];

			return bookingsArray;
		},
	});
};
