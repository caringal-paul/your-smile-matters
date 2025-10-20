import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import sfAuthApi, {
	LoginPayloadSf,
} from "@/core/api/auth/store-front/auth.sf.api";
import { CustomerLoginResponse } from "../utils/types/auth-response.sf.types";
import { useMyCredentials } from "@/store-front/store/useMyCredentials";

export const useLogoutCustomerMutation = () => {
	const clearMyCredentials = useMyCredentials(
		(state) => state.clearMyCredentials
	);
	const myCredentials = useMyCredentials((state) => state.myCredentials);

	return useMutation({
		mutationFn: async () => {
			const refreshToken = localStorage.getItem("sf_refresh_token") || "";

			if (!myCredentials?._id || !myCredentials || !refreshToken) {
				throw new Error("No customer is currently logged in.");
			}

			const res: BaseResponseDto<null> = await sfAuthApi.logout({
				refreshToken,
			});

			if (res.error || !res.status) {
				throw new Error(res.message || "Logout failed! Please try again.");
			}

			return res.message;
		},

		onSuccess: (data) => {
			toast.success(data);

			clearMyCredentials();
			localStorage.clear();
			queryClient.removeQueries({
				queryKey: ["customer-logged-in"],
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
