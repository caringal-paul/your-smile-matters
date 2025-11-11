import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import sfBookingRequestsApi from "@/core/api/booking-request/sf/booking-request.sf.api";
import { BaseResponseDto } from "@/core/types/base.types";
import {
	BookingRequestResponse,
	TransactionRequestResponse,
} from "@/core/types/base-response.types";
import { RequestCancelBookingSchema } from "../utils/schema/request-cancel.schema";
import sfTransactionRequestsApi from "@/core/api/transaction-request/sf/transaction-request.sf.api";
import { RequestRefundTransactionSchema } from "../utils/schema/request-refund.schema";

export const useSendRefundTransactionForApproval = () => {
	return useMutation({
		mutationFn: async (payload: RequestRefundTransactionSchema) => {
			const res: BaseResponseDto<TransactionRequestResponse> =
				await sfTransactionRequestsApi.sendRefundRequestForApproval(payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to send refund request");
			}

			return res.data;
		},
		onSuccess: () => {
			toast.success("Your request has been sent! Please wait for approval.");

			queryClient.invalidateQueries({
				queryKey: ["sf-transaction-requests"],
				refetchType: "all",
			});
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
