import { useQuery } from "@tanstack/react-query";
import { BookingRequestResponse } from "@/core/types/base-response.types";
import sfBookingRequestsApi from "@/core/api/booking-request/sf/booking-request.sf.api";
import { MyBookingRequestsSfTableType } from "../utils/types/my-booking-requests-table.sf.types";

export const useGetMyBookingRequestsQuery = () => {
	return useQuery({
		queryKey: ["sf-booking-requests"],

		queryFn: () => sfBookingRequestsApi.getMyBookingRequests(),
		select: ({ data }): MyBookingRequestsSfTableType[] => {
			const bookingRequestArray: MyBookingRequestsSfTableType[] =
				data?.map((bookingRequest: BookingRequestResponse) => {
					return {
						...bookingRequest,
						booking: bookingRequest.booking_id._id,
						booking_reference: bookingRequest.booking_id.booking_reference,
						reason:
							bookingRequest.cancellation_reason ??
							bookingRequest.reschedule_reason ??
							null,
					};
				}) ?? [];

			return bookingRequestArray;
		},
	});
};
