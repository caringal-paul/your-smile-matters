import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { adminApiClient } from "@/core/lib/axios/api-client.ami";

import {
	GetAllCustomerResponseAmi,
	GetByIdCustomerResponseAmi,
} from "@/ami/features/customer-management/utils/types/customer-response.ami.types";
import { LoginResponseAmi } from "@/ami/features/auth/utils/types/auth-response.ami.types";
import { AuthAmiLogin } from "@/ami/features/auth/utils/schemas/auth.schema";

const ENDPOINT = "/admin/auth";

const amiAuthApi = {
	async me(): Promise<BaseResponseDto<GetAllCustomerResponseAmi[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<GetAllCustomerResponseAmi[]>
			>(ENDPOINT);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async login(
		payload: AuthAmiLogin
	): Promise<BaseResponseDto<LoginResponseAmi>> {
		try {
			const response = await adminApiClient.post<
				BaseResponseDto<LoginResponseAmi>
			>(`${ENDPOINT}/login`, payload);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async refresh(
		id: string
	): Promise<BaseResponseDto<GetByIdCustomerResponseAmi>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<GetByIdCustomerResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async logout(
		id: string
	): Promise<BaseResponseDto<GetByIdCustomerResponseAmi>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<GetByIdCustomerResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default amiAuthApi;
