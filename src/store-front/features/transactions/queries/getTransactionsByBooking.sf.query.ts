import { useQuery } from "@tanstack/react-query";
import sfPackageApi from "@/core/api/package/store-front/package.sf.api";
import sfTransactionsApi from "@/core/api/transaction/sf/transaction.sf.api";
import { TransactionResponse } from "@/core/types/base-response.types";

export const useGetAllTransactionsPerCustomer = () => {
	return useQuery({
		queryKey: ["transactions-sf"],
		queryFn: () => sfTransactionsApi.getTransactions(),
		select: (data): TransactionResponse[] => {
			const transactionsArray = data.data ?? [];

			return transactionsArray;
		},
	});
};
