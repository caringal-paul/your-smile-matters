import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { toast } from "sonner";
import { AuthAmiLogin } from "../utils/schemas/auth.schema";
import { LoginResponseAmi } from "../utils/types/auth-response.ami.types";
import amiAuthApi from "@/core/api/auth/ami/auth.ami.api";

export const useLoginAmiUserMutation = () => {
	return useMutation({
		mutationFn: async (payload: AuthAmiLogin) => {
			const res: BaseResponseDto<LoginResponseAmi> = await amiAuthApi.login(
				payload
			);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to login");
			}

			return res.data;
		},
		onSuccess: (data) => {
			if (data?.access_token) {
				localStorage.setItem("ami_access_token", data?.access_token);
				localStorage.setItem("ami_refresh_token", data?.refresh_token);
			} else {
				throw new Error(
					"Internal Server Error! Please contact your administrator!"
				);
			}

			toast.success("Welcome to Your Smile Matters Admin!");
		},
		onError: (error) => {
			console.error("❌ Failed to create user:");
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
