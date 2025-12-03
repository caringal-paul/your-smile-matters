import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import sfAuthApi from "@/core/api/auth/store-front/auth.sf.api";
import { CustomerModel } from "@/core/models/customer.model";

export const useGetMeMutation = () => {
	return useQuery({
		queryKey: ["me-customer"],
		queryFn: async () => {
			const res: BaseResponseDto<CustomerModel> = await sfAuthApi.me();

			return res.data;
		},
	});
};
