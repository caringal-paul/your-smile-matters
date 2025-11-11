import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { toast } from "sonner";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import amiBookingRequestsApi from "@/core/api/booking-request/ami/booking-request.ami.api";
import { BookingRequestResponse } from "@/core/types/base-response.types";
import { ApproveBookingRequestSchema } from "../utils/schemas/approve-booking-request.ami.schema";

export const useApproveCancelBookingMutation = () => {
	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string;
			payload: ApproveBookingRequestSchema;
		}) => {
			const res: BaseResponseDto<BookingRequestResponse> =
				await amiBookingRequestsApi.approveCancellation(id, payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to approve booking request!");
			}

			return id;
		},
		onSuccess: (data) => {
			const id = data;

			toast.success("Cancel booking approved!");

			queryClient.invalidateQueries({
				queryKey: ["ami-booking-requests"],
				refetchType: "all",
			});
			queryClient.invalidateQueries({
				queryKey: ["bookings"],
				refetchType: "all",
			});
			queryClient.invalidateQueries({ queryKey: ["ami-booking-request", id] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
