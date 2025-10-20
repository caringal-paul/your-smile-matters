import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { adminApiClient } from "@/core/lib/axios/api-client.ami";

import {
	GetAllTransactionsResponseAmi,
	GetByIdTransactionResponseAmi,
} from "@/ami/features/transaction-history/utils/types/transaction-response.ami.types";
import { TransactionResponse } from "@/core/types/base-response.types";
import { customerApiClient } from "@/core/lib/axios/api-client.sf";
import { TransactionSfCreate } from "@/store-front/features/transactions/utils/schema/transaction.sf.schema";
import { TransactionGetByIdResponse } from "@/store-front/features/transactions/utils/types/transaction-response.sf.types";

const ENDPOINT = "/client/transactions";

const sfTransactionsApi = {
	async getTransactions(): Promise<BaseResponseDto<TransactionResponse[]>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<TransactionResponse[]>
			>(`${ENDPOINT}/my-transactions`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getTransactionsPerBooking(
		id: string
	): Promise<BaseResponseDto<TransactionResponse[]>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<TransactionResponse[]>
			>(`${ENDPOINT}/booking/${id}`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getById(
		id: string
	): Promise<BaseResponseDto<TransactionGetByIdResponse>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<TransactionGetByIdResponse>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async createTransaction(
		id: string,
		data: TransactionSfCreate
	): Promise<BaseResponseDto<TransactionResponse>> {
		try {
			const response = await customerApiClient.post<
				BaseResponseDto<TransactionResponse>
			>(`${ENDPOINT}/booking/${id}/pay`, data);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default sfTransactionsApi;
