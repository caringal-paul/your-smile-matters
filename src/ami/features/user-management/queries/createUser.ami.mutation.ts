import { useMutation } from "@tanstack/react-query";
import amiUserApi from "@/core/api/user/ami/user.ami.api";
import { BaseResponseDto } from "@/core/types/base.types";
import { UserAmiCreate } from "../utils/schemas/user.schema";
import { CreateUserResponseAmi } from "../utils/types/user-response.ami.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";

export const useCreateUserMutation = () => {
	return useMutation({
		mutationFn: async (payload: UserAmiCreate) => {
			const res: BaseResponseDto<CreateUserResponseAmi> =
				await amiUserApi.create(payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to update user");
			}

			return res.data;
		},
		onSuccess: (data) => {
			toast.success("User created successfully!");

			queryClient.invalidateQueries({
				queryKey: ["users"],
				refetchType: "all",
			});
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
