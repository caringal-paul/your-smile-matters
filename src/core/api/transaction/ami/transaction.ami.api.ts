import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { apiClient } from "@/core/lib/axios/api-client";

import {
	GetAllTransactionsResponseAmi,
	GetByIdTransactionResponseAmi,
} from "@/ami/features/transaction-history/utils/types/transaction-response.ami.types";

const ENDPOINT = "/admin/transactions";

const amiTransactionApi = {
	async get(): Promise<BaseResponseDto<GetAllTransactionsResponseAmi[]>> {
		try {
			const response = await apiClient.get<
				BaseResponseDto<GetAllTransactionsResponseAmi[]>
			>(ENDPOINT);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getById(
		id: string
	): Promise<BaseResponseDto<GetByIdTransactionResponseAmi>> {
		try {
			const response = await apiClient.get<
				BaseResponseDto<GetByIdTransactionResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default amiTransactionApi;
