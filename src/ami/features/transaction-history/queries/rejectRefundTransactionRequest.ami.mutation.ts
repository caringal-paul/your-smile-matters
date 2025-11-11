import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { toast } from "sonner";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { TransactionRequestResponse } from "@/core/types/base-response.types";
import { RejectTransactionRequestSchema } from "../utils/schema/reject-reject-request.ami.schema";
import amiTransactionRequestsApi from "@/core/api/transaction-request/ami/transaction-request.ami.api";

export const useRejectRefundTransactionRequestMutation = () => {
	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string;
			payload: RejectTransactionRequestSchema;
		}) => {
			const res: BaseResponseDto<TransactionRequestResponse> =
				await amiTransactionRequestsApi.reject(id, payload);

			if (res.error || !res.status) {
				throw new Error(
					res.message || "Failed to approve transaction request!"
				);
			}

			return id;
		},
		onSuccess: (data) => {
			const id = data;

			toast.success("Refund transaction rejected!");

			queryClient.invalidateQueries({
				queryKey: ["ami-transaction-requests"],
				refetchType: "all",
			});
			queryClient.invalidateQueries({
				queryKey: ["transactions"],
				refetchType: "all",
			});
			queryClient.invalidateQueries({
				queryKey: ["ami-transaction-request", id],
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
