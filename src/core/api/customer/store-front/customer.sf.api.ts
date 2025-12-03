import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { CustomerSfUpdate } from "@/store-front/features/profile/utils/schema/customer-update.schema";
import { CustomerModel } from "@/core/models/customer.model";
import { customerApiClient } from "@/core/lib/axios/api-client.sf";

const ENDPOINT = "/client/customers";

const sfCustomerApi = {
	async update(
		id: string,
		data: CustomerSfUpdate
	): Promise<BaseResponseDto<CustomerModel>> {
		try {
			const response = await customerApiClient.put<
				BaseResponseDto<CustomerModel>
			>(`${ENDPOINT}/${id}`, data);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default sfCustomerApi;
