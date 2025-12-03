import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";

import { adminApiClient } from "@/core/lib/axios/api-client.ami";
import { ImageUploadResponse } from "@/core/types/base-response.types";

const ENDPOINT = "/admin/upload";

const uploadImageApi = {
	async uploadImage(
		formData: FormData
	): Promise<BaseResponseDto<ImageUploadResponse>> {
		try {
			const response = await adminApiClient.post<
				BaseResponseDto<ImageUploadResponse>
			>(`${ENDPOINT}/image`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async uploadImages(
		formData: FormData
	): Promise<BaseResponseDto<ImageUploadResponse[]>> {
		try {
			const response = await adminApiClient.post<
				BaseResponseDto<ImageUploadResponse[]>
			>(`${ENDPOINT}/images`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async deleteImage(filename: string): Promise<BaseResponseDto<null>> {
		try {
			const response = await adminApiClient.delete<BaseResponseDto<null>>(
				`${ENDPOINT}/delete/${filename}`
			);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default uploadImageApi;
