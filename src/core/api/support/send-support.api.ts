import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { adminApiClient } from "@/core/lib/axios/api-client.ami";
import { SendSupportPayload } from "@/store-front/features/support/utils/schema/send-support.sf.schema";

const ENDPOINT = "/admin/send-support";

const sendSupportApi = {
	async sendSupport(
		payload: SendSupportPayload
	): Promise<BaseResponseDto<string>> {
		try {
			const response = await adminApiClient.post<BaseResponseDto<string>>(
				ENDPOINT,
				payload
			);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default sendSupportApi;
