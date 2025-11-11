import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import sfBookingRequestsApi from "@/core/api/booking-request/sf/booking-request.sf.api";
import { BaseResponseDto } from "@/core/types/base.types";
import {
	BookingRequestResponse,
	RatingResponse,
} from "@/core/types/base-response.types";
import { RequestCancelBookingSchema } from "../utils/schema/request-cancel.schema";
import sfRatingApi from "@/core/api/rating/sf/rating.sf.api";
import { RatingSchema } from "../utils/schema/rating.schema";

export const useCreateRatingMutation = () => {
	return useMutation({
		mutationFn: async (payload: RatingSchema) => {
			const res: BaseResponseDto<RatingResponse> =
				await sfRatingApi.createRating(payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to send your rating");
			}

			return res.data;
		},
		onSuccess: () => {
			toast.success("Thank you for your feedback!");

			// queryClient.invalidateQueries({
			// 	queryKey: ["sf-booking-requests"],
			// 	refetchType: "all",
			// });
		},
		onError: (error: Error) => {
			console.error("❌ Failed to send Cancel request:", error);
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
