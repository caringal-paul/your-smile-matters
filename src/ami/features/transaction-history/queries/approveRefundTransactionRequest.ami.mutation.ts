import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { toast } from "sonner";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { TransactionRequestResponse } from "@/core/types/base-response.types";
import amiTransactionRequestsApi from "@/core/api/transaction-request/ami/transaction-request.ami.api";
import { ApproveTransactionRequestSchema } from "../utils/schema/approve-transaction-request.ami.schema";

export const useApproveRefundTransactionRequestMutation = () => {
	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string;
			payload: ApproveTransactionRequestSchema;
		}) => {
			const res: BaseResponseDto<TransactionRequestResponse> =
				await amiTransactionRequestsApi.approve(id, payload);

			if (res.error || !res.status) {
				throw new Error(
					res.message || "Failed to approve transaction request!"
				);
			}

			return id;
		},
		onSuccess: (data) => {
			const id = data;

			toast.success("Refund request approved!");

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
