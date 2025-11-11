import { useQuery } from "@tanstack/react-query";
import { TransactionRequestByIdResponse } from "@/core/types/base-response.types";
import sfTransactionRequestsApi from "@/core/api/transaction-request/sf/transaction-request.sf.api";

export const useGetTransactionRequestByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ["sf-transaction-request", id],
		queryFn: () => sfTransactionRequestsApi.getRefundRequestById(id),
		select: ({ data }): TransactionRequestByIdResponse | undefined => {
			if (!data) return undefined;

			return data;
		},
	});
};
