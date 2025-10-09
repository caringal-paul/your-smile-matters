import { useQuery } from "@tanstack/react-query";
import { GetAllTransactionsResponseAmi } from "../utils/types/transaction-response.ami.types";
import amiTransactionApi from "@/core/api/transaction/ami/transaction.ami.api";

export const useGetAllTransactionsQuery = () => {
	return useQuery({
		queryKey: ["transactions"],
		queryFn: () => amiTransactionApi.get(),
		select: (data): GetAllTransactionsResponseAmi[] => {
			const transactionsArray = data.data ?? [];

			return transactionsArray;
		},
	});
};
