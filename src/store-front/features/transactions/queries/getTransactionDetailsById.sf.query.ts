import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import sfTransactionsApi from "@/core/api/transaction/sf/transaction.sf.api";
import { TransactionResponse } from "@/core/types/base-response.types";
import { TransactionGetByIdResponse } from "../utils/types/transaction-response.sf.types";

export const useGetTransactionDetailsByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ["user", id],
		queryFn: async () => {
			const res: BaseResponseDto<TransactionGetByIdResponse> =
				await sfTransactionsApi.getById(id);

			return res.data;
		},
		enabled: !!id,
	});
};
