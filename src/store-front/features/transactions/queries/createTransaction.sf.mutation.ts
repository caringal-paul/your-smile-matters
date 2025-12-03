import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import { TransactionSfCreate } from "../utils/schema/transaction.sf.schema";
import sfTransactionsApi from "@/core/api/transaction/sf/transaction.sf.api";
import { TransactionResponse } from "@/core/types/base-response.types";

type CreateTransactionPaylod = {
	id: string;
	payload: TransactionSfCreate;
};

export const useCreateTransactionMutation = () => {
	return useMutation({
		mutationFn: async ({ id, payload }: CreateTransactionPaylod) => {
			const res: BaseResponseDto<TransactionResponse> =
				await sfTransactionsApi.createTransaction(id, payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to create transaction");
			}

			return res.data;
		},
		onSuccess: (data) => {
			if (!data) return;

			toast.success(
				"Transaction sent for approval please wait for admin confirmation!"
			);

			queryClient.invalidateQueries({
				queryKey: ["sf-booking", data.booking_id],
				refetchType: "all",
			});
			queryClient.invalidateQueries({
				queryKey: ["transactions-sf"],
				refetchType: "all",
			});
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
