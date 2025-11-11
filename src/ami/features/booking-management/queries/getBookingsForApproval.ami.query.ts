import { useQuery } from "@tanstack/react-query";
import { BookingRequestResponse } from "@/core/types/base-response.types";
import { BookingForApprovalAmiTableType } from "../utils/types/booking-for-approval-table.ami.types";
import amiBookingRequestsApi from "@/core/api/booking-request/ami/booking-request.ami.api";

export const useGetBookingForApprovalQuery = () => {
	return useQuery({
		queryKey: ["ami-booking-requests"],

		queryFn: () => amiBookingRequestsApi.getBookingRequests(),
		select: ({ data }): BookingForApprovalAmiTableType[] => {
			const bookingRequestArray: BookingForApprovalAmiTableType[] =
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
