import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import sfAuthApi, {
	LoginPayloadSf,
} from "@/core/api/auth/store-front/auth.sf.api";
import { CustomerLoginResponse } from "../utils/types/auth-response.sf.types";
import { useMyCredentials } from "@/store-front/store/useMyCredentials";
import { CustomerAmiCreateWithConfirm } from "@/ami/features/customer-management/utils/schemas/customer.schema";
import { CustomerModel } from "@/core/models/customer.model";
import { useNavigate } from "react-router-dom";

export const useRegisterCustomerMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (payload: CustomerAmiCreateWithConfirm) => {
			const res: BaseResponseDto<CustomerModel> = await sfAuthApi.register(
				payload
			);

			if (res.error || !res.status) {
				throw new Error(
					res.message || "Registration failed! Please try again."
				);
			}

			toast.success(res.message);
			return res.data;
		},

		onSuccess: (data) => {
			navigate("/auth/login");
		},
		onError: (error: any) => {
			toast.error(error.message || "Something went wrong!");
		},

		onSettled: () => {
			console.log("ℹ️ Customer login mutation finished (success or error)");
		},
	});
};
