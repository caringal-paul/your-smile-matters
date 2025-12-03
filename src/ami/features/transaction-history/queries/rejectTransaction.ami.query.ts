import { useMutation } from "@tanstack/react-query";
import amiUserApi from "@/core/api/user/ami/user.ami.api";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import { TransactionResponse } from "@/core/types/base-response.types";
import amiTransactionApi from "@/core/api/transaction/ami/transaction.ami.api";

export const useRejectTransactionMutation = () => {
	return useMutation({
		mutationFn: async (id: string) => {
			const res: BaseResponseDto<TransactionResponse> =
				await amiTransactionApi.reject(id);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to reject transaction!");
			}

			return res.data;
		},
		onSuccess: async (data) => {
			toast.success(`${data?.transaction_reference} rejected successfully!`);

			queryClient.invalidateQueries({
				queryKey: ["transactions"],
				refetchType: "all",
			});

			if (data?._id) {
				await queryClient.invalidateQueries({
					queryKey: ["transaction", data!._id],
				});
			}
		},
		onError: (error) => {
			toast.error(error.message);

			console.error("❌ Failed to approve transaction:", error);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
