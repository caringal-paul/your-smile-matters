import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import sfAuthApi, {
	LoginPayloadSf,
} from "@/core/api/auth/store-front/auth.sf.api";
import { CustomerLoginResponse } from "../utils/types/auth-response.sf.types";
import { useMyCredentials } from "@/store-front/store/useMyCredentials";
import { useGetMeMutation } from "../../profile/queries/getMe.sf.query";

// TODO INTEGRATE REGISTER THEN CHECK THE PROCESS AGAIN IF GOOD IMPROVE EVERYTHING THEN AFTER, DO THE TRANSACTION VIEW OF CUSTOMER SIDE
export const useLoginCustomerMutation = () => {
	const setMyCredentials = useMyCredentials((state) => state.setMyCredentials);
	const { data: currentUser, isLoading: isFetchingMyDetails } =
		useGetMeMutation();

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

			queryClient.invalidateQueries({
				queryKey: ["customer-logged-in"],
				refetchType: "all",
			});

			if (currentUser) {
				setMyCredentials(currentUser);
				return;
			} else if (data?.customer) {
				setMyCredentials(data.customer);
				return;
			}
		},

		onError: (error: any) => {
			toast.error(error.message || "Something went wrong!");
		},

		onSettled: () => {
			console.log("ℹ️ Customer login mutation finished (success or error)");
		},
	});
};
