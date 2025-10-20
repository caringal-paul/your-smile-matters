import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { toast } from "sonner";
import {
	BookingSfCreate,
	CreateBookingResponseSf,
} from "../utils/types/booking-response.sf.types";
import sfBookingApi from "@/core/api/booking/sf/booking.sf.api";

export const useSendBookingForApprovalMutation = () => {
	return useMutation({
		mutationFn: async (payload: BookingSfCreate) => {
			const res: BaseResponseDto<CreateBookingResponseSf> =
				await sfBookingApi.sendBookingForApproval(payload);

			console.log("PAYLOAAAD!", payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to send for approval!");
			}

			return res.data;
		},
		onSuccess: (data) => {
			toast.success(
				"Booking sent for approval please wait and check your email!"
			);
		},
		onError: (error) => {
			console.error("❌ Failed to create user:");
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
