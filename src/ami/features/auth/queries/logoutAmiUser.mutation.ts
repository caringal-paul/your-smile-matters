import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import amiAuthApi from "@/core/api/auth/ami/auth.ami.api";

export const useLogoutUserMutation = () => {
	return useMutation({
		mutationFn: async () => {
			const refreshToken = localStorage.getItem("ami_refresh_token") || "";

			if (!refreshToken) {
				throw new Error("No user is currently logged in.");
			}

			const res: BaseResponseDto<null> = await amiAuthApi.logout(refreshToken);

			if (res.error || !res.status) {
				throw new Error(res.message || "Logout failed! Please try again.");
			}

			return res.message;
		},

		onSuccess: (data) => {
			toast.success(data);

			localStorage.clear();
			queryClient.removeQueries({
				queryKey: ["me"],
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
