import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import sfAuthApi, {
	LoginPayloadSf,
} from "@/core/api/auth/store-front/auth.sf.api";
import { CustomerLoginResponse } from "../utils/types/auth-response.sf.types";
import { useMyCredentials } from "@/store-front/store/useMyCredentials";

// TODO INTEGRATE REGISTER THEN CHECK THE PROCESS AGAIN IF GOOD IMPROVE EVERYTHING THEN AFTER, DO THE TRANSACTION VIEW OF CUSTOMER SIDE
export const useLoginCustomerMutation = () => {
	const setMyCredentials = useMyCredentials((state) => state.setMyCredentials);

	return useMutation({
		mutationFn: async (payload: LoginPayloadSf) => {
			const res: BaseResponseDto<CustomerLoginResponse> = await sfAuthApi.login(
				payload
			);

			if (res.error || !res.status) {
				throw new Error(res.message || "Login failed! Please try again.");
			}

			toast.success(res.message);
			return res.data;
		},

		onSuccess: (data) => {
			// ✅ Save tokens
			if (data?.access_token) {
				localStorage.setItem("sf_access_token", data.access_token);
				localStorage.setItem("sf_refresh_token", data.refresh_token);
			} else {
				throw new Error(
					"Internal Server Error! Please contact your administrator!"
				);
			}

			if (data?.customer) {
				setMyCredentials({
					_id: data.customer._id,
					customer_no: data.customer.customer_no,
					email: data.customer.email,
					first_name: data.customer.first_name,
					last_name: data.customer.last_name,
					mobile_number: data.customer.mobile_number,
					gender: data.customer.gender,
					is_active: data.customer.is_active,
					created_at: data.customer.created_at,
					updated_at: data.customer.updated_at,
				});
			}

			queryClient.invalidateQueries({
				queryKey: ["customer-logged-in"],
				refetchType: "all",
			});
		},

		onError: (error: any) => {
			toast.error(error.message || "Something went wrong!");
		},

		onSettled: () => {
			console.log("ℹ️ Customer login mutation finished (success or error)");
		},
	});
};
