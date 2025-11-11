import amiTransactionRequestsApi from "@/core/api/transaction-request/ami/transaction-request.ami.api";
import { TransactionRequestByIdResponse } from "@/core/types/base-response.types";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionForApprovalById = (id: string) => {
	return useQuery({
		queryKey: ["ami-transaction-request", id],
		queryFn: () => amiTransactionRequestsApi.getTransactionRequestById(id),
		select: ({ data }): TransactionRequestByIdResponse | undefined => {
			if (!data) return undefined;

			return data;
		},
		enabled: !!id,
	});
};
