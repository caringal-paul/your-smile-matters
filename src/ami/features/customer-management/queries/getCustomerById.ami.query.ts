import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { GetByIdCustomerResponseAmi } from "../utils/types/customer-response.ami.types";
import amiCustomerApi from "@/core/api/customer/ami/customer.ami.api";

// NOTE: DONT USE SELECT IF WILL USE ENABLED
export const useGetCustomerByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ["customer", id],
		queryFn: async () => {
			const res: BaseResponseDto<GetByIdCustomerResponseAmi> =
				await amiCustomerApi.getById(id);

			return res.data;
		},
		enabled: !!id,
	});
};
