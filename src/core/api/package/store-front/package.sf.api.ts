import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";

import {
	GetAllPackageResponseSf,
	GetByIdPackageResponseSf,
} from "@/store-front/features/package/utils/types/package-response.sf.types";
import { customerApiClient } from "@/core/lib/axios/api-client.sf";

const ENDPOINT = "/client/packages";

const sfPackageApi = {
	async get(): Promise<BaseResponseDto<GetAllPackageResponseSf[]>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<GetAllPackageResponseSf[]>
			>(`${ENDPOINT}`);

			// ?sort_by=created_at&sort_order=desc
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getById(
		id: string
	): Promise<BaseResponseDto<GetByIdPackageResponseSf>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<GetByIdPackageResponseSf>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default sfPackageApi;
