import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import amiTransactionApi from "@/core/api/transaction/ami/transaction.ami.api";
import { GetByIdTransactionResponseAmi } from "../utils/types/transaction-response.ami.types";

export const useGetTransactionByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ["transaction", id],
		queryFn: async () => {
			const res: BaseResponseDto<GetByIdTransactionResponseAmi> =
				await amiTransactionApi.getById(id);

			return res.data;
		},
		enabled: !!id,
	});
};
