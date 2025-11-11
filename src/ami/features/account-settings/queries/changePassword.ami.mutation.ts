import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import { PasswordAmiUpdate } from "../utils/schemas/change-password.ami.schema";
import amiAuthApi from "@/core/api/auth/ami/auth.ami.api";
import { useNavigate } from "react-router-dom";

export const useChangePasswordAmiMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string;
			payload: PasswordAmiUpdate;
		}) => {
			const res: BaseResponseDto<null> = await amiAuthApi.changePassword(
				id,
				payload
			);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to update user");
			}

			return res.data;
		},
		onSuccess: async (data) => {
			toast.success(
				"Password changed successfully! Please wait redirecting you to log in."
			);

			queryClient.invalidateQueries({
				queryKey: ["users"],
				refetchType: "all",
			});

			queryClient.invalidateQueries({
				queryKey: ["me"],
				refetchType: "all",
			});

			navigate("/admin/ami/auth");
		},
		onError: (error) => {
			toast.error(error.message);

			console.error("❌ Failed to update user:", error);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
