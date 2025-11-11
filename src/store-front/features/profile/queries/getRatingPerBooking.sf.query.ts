import { useQuery } from "@tanstack/react-query";
import {
	BookingRequestByIdResponse,
	BookingRequestResponse,
	RatingResponse,
} from "@/core/types/base-response.types";
import sfBookingRequestsApi from "@/core/api/booking-request/sf/booking-request.sf.api";
import { MyBookingRequestsSfTableType } from "../utils/types/my-booking-requests-table.sf.types";
import sfRatingApi from "@/core/api/rating/sf/rating.sf.api";

export const useGetRatingPerBooking = (bookingId: string) => {
	return useQuery({
		queryKey: ["sf-rating-per-booking", bookingId],
		queryFn: () => sfRatingApi.getRatingsPerBooking(bookingId),
		select: ({ data }): RatingResponse[] | undefined => {
			if (!data?.ratings) return undefined;

			return data.ratings;
		},
	});
};
