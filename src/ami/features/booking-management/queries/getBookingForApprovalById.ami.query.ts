import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { BookingRequestByIdResponse } from "@/core/types/base-response.types";
import amiBookingRequestsApi from "@/core/api/booking-request/ami/booking-request.ami.api";

export const useGetBookingForApprovalById = (id: string) => {
	return useQuery({
		queryKey: ["ami-booking-request", id],
		queryFn: () => amiBookingRequestsApi.getBookingRequestById(id),
		select: ({ data }): BookingRequestByIdResponse | undefined => {
			if (!data) return undefined;

			return data;
		},
		enabled: !!id,
	});
};
