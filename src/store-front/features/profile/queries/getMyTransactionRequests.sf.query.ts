import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import sfTransactionRequestsApi from "@/core/api/transaction-request/sf/transaction-request.sf.api";
import { TransactionRequestResponse } from "@/core/types/base-response.types";
import { MyTransactionRequestsSfTableType } from "../utils/types/my-transaction-requests-table.sf.types";

export const useGetMyTransactionRequestsQuery = () => {
	return useQuery({
		queryKey: ["sf-transaction-requests"],
		queryFn: () => sfTransactionRequestsApi.getMyTransactionRequests(),
		select: ({ data }): MyTransactionRequestsSfTableType[] => {
			const transactionRequestArray: MyTransactionRequestsSfTableType[] =
				data?.map((transactionRequest: TransactionRequestResponse) => ({
					...transactionRequest,
					transaction: transactionRequest.transaction_id._id,
					transaction_reference:
						transactionRequest.transaction_id.transaction_reference,
				})) ?? [];

			return transactionRequestArray;
		},
	});
};
