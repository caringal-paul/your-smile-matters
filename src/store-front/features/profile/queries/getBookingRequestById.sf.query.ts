import { useQuery } from "@tanstack/react-query";
import {
	BookingRequestByIdResponse,
	BookingRequestResponse,
} from "@/core/types/base-response.types";
import sfBookingRequestsApi from "@/core/api/booking-request/sf/booking-request.sf.api";
import { MyBookingRequestsSfTableType } from "../utils/types/my-booking-requests-table.sf.types";

export const useGetBookingRequestByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ["sf-booking-request", id],
		queryFn: () => sfBookingRequestsApi.getBookingRequestById(id),
		select: ({ data }): BookingRequestByIdResponse | undefined => {
			if (!data) return undefined;

			return data;
		},
	});
};
