import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { apiClient } from "@/core/lib/axios/api-client";

import {
	GetAllCustomerResponseAmi,
	GetByIdCustomerResponseAmi,
} from "@/ami/features/customer-management/utils/types/customer-response.ami.types";

const ENDPOINT = "/admin/customers";

const amiCustomerApi = {
	async get(): Promise<BaseResponseDto<GetAllCustomerResponseAmi[]>> {
		try {
			const response = await apiClient.get<
				BaseResponseDto<GetAllCustomerResponseAmi[]>
			>(ENDPOINT);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getById(
		id: string
	): Promise<BaseResponseDto<GetByIdCustomerResponseAmi>> {
		try {
			const response = await apiClient.get<
				BaseResponseDto<GetByIdCustomerResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default amiCustomerApi;
