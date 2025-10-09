import { useQuery } from "@tanstack/react-query";
import { GetAllBookingsResponseAmi } from "../utils/types/booking-response.ami.types";
import amiBookingApi from "@/core/api/booking/ami/booking.ami.api";

export const useGetAllBookingQuery = () => {
	return useQuery({
		queryKey: ["bookings"],
		queryFn: () => amiBookingApi.get(),
		select: (data): GetAllBookingsResponseAmi[] => {
			const bookingsArray = data.data ?? [];

			return bookingsArray;
		},
	});
};
