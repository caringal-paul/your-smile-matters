import amiTransactionRequestsApi from "@/core/api/transaction-request/ami/transaction-request.ami.api";
import { TransactionRequestResponse } from "@/core/types/base-response.types";
import { useQuery } from "@tanstack/react-query";
import { TransactionForApprovalAmiTableType } from "../utils/types/transaction-for-approval-table.ami.types";

export const useGetTransactionsForApprovalQuery = () => {
	return useQuery({
		queryKey: ["ami-transactions-requests"],
		queryFn: () => amiTransactionRequestsApi.getTransactionRequests(),
		select: ({ data }): TransactionForApprovalAmiTableType[] => {
			const transactionsRequestArray: TransactionForApprovalAmiTableType[] =
				data?.map((transactionsRequest: TransactionRequestResponse) => {
					return {
						...transactionsRequest,
						transaction: transactionsRequest.transaction_id._id,
						transaction_reference:
							transactionsRequest.transaction_id.transaction_reference,
					};
				}) ?? [];

			return transactionsRequestArray;
		},
	});
};
