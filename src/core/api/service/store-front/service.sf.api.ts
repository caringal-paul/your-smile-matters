import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";

import {
	GetAllServiceResponseSf,
	GetByIdServiceResponseSf,
} from "@/store-front/features/service/utils/types/service-response.sf.types";
import { customerApiClient } from "@/core/lib/axios/api-client.sf";

const ENDPOINT = "/client/services";

const sfServiceApi = {
	async get(): Promise<BaseResponseDto<GetAllServiceResponseSf[]>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<GetAllServiceResponseSf[]>
			>(`${ENDPOINT}/browse`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getById(
		id: string
	): Promise<BaseResponseDto<GetByIdServiceResponseSf>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<GetByIdServiceResponseSf>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default sfServiceApi;
