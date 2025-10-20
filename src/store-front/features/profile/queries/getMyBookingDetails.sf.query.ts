import { useQuery } from "@tanstack/react-query";
import { BookingResponseSf } from "../../booking/utils/types/booking-response.sf.types";
import sfBookingApi from "@/core/api/booking/sf/booking.sf.api";
import { BaseResponseDto } from "@/core/types/base.types";

export const useGetMyBookingDetailsQuery = (id: string) => {
	return useQuery({
		queryKey: ["sf-booking", id],
		queryFn: async () => {
			const res: BaseResponseDto<BookingResponseSf> =
				await sfBookingApi.getMyBookingDetails(id);

			return res.data;
		},
		enabled: !!id,
	});
};
