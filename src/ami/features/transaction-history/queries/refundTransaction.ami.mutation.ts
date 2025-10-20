import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import { RefundTransactionSchema } from "../utils/schema/refund.schema";
import { TransactionResponse } from "@/core/types/base-response.types";
import amiTransactionApi from "@/core/api/transaction/ami/transaction.ami.api";
import { RefundTransactionResponseAmi } from "../utils/types/transaction-response.ami.types";

type RefundTransactionPayload = {
	id: string;
	payload: RefundTransactionSchema;
};

export const useRefundTransactionMutation = () => {
	return useMutation({
		mutationFn: async ({ id, payload }: RefundTransactionPayload) => {
			const res: BaseResponseDto<RefundTransactionResponseAmi> =
				await amiTransactionApi.refund(id, payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to process refund!");
			}

			return res.data;
		},
		onSuccess: async (data) => {
			toast.success("Transaction refunded successfully!");

			queryClient.invalidateQueries({
				queryKey: ["transactions"],
				refetchType: "all",
			});
			queryClient.invalidateQueries({
				queryKey: ["bookings"],
				refetchType: "all",
			});

			if (data?.original_transaction_id?._id) {
				await queryClient.invalidateQueries({
					queryKey: ["transaction", data.original_transaction_id._id],
				});
			}
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
