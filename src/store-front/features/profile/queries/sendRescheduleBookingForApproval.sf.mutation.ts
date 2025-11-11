import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import sfBookingRequestsApi from "@/core/api/booking-request/sf/booking-request.sf.api";
import { BaseResponseDto } from "@/core/types/base.types";
import { BookingRequestResponse } from "@/core/types/base-response.types";
import { RequestRescheduleBookingSchema } from "../utils/schema/request-reschedule.schema";

type RescheduleBookingVariables = {
	bookingId: string;
	payload: RequestRescheduleBookingSchema;
};

export const useSendRescheduleBookingForApprovalMutation = () => {
	return useMutation({
		mutationFn: async ({ bookingId, payload }: RescheduleBookingVariables) => {
			const res: BaseResponseDto<BookingRequestResponse> =
				await sfBookingRequestsApi.sendRescheduleRequestForApproval(
					bookingId,
					payload
				);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to send reschedule request");
			}

			return res.data;
		},
		onSuccess: () => {
			toast.success("Your request has been sent! Please wait for approval.");

			queryClient.invalidateQueries({
				queryKey: ["sf-booking-requests"],
				refetchType: "all",
			});
		},
		onError: (error: Error) => {
			console.error("❌ Failed to send reschedule request:", error);
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
