import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { GetByIdBookingResponseAmi } from "../utils/types/booking-response.ami.types";
import amiBookingApi from "@/core/api/booking/ami/booking.ami.api";

export const useGetBookingByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ["booking", id],
		queryFn: async () => {
			const res: BaseResponseDto<GetByIdBookingResponseAmi> =
				await amiBookingApi.getById(id);

			return res.data;
		},
		enabled: !!id,
	});
};
