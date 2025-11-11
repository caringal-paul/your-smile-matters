import { useMutation } from "@tanstack/react-query";
import amiUserApi from "@/core/api/user/ami/user.ami.api";
import { BaseResponseDto } from "@/core/types/base.types";
import { UserAmiUpdate } from "../utils/schemas/user.schema";
import { UpdateUserResponseAmi } from "../utils/types/user-response.ami.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";

export const useUpdateUserMutation = () => {
	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string;
			payload: UserAmiUpdate;
		}) => {
			const res: BaseResponseDto<UpdateUserResponseAmi> =
				await amiUserApi.update(id, payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to update user");
			}

			return res.data;
		},
		onSuccess: async (data) => {
			toast.success("Updated successfully!");

			queryClient.invalidateQueries({
				queryKey: ["users"],
				refetchType: "all",
			});

			queryClient.invalidateQueries({
				queryKey: ["me"],
				refetchType: "all",
			});

			if (data?._id) {
				await queryClient.invalidateQueries({
					queryKey: ["user", data._id],
					refetchType: "all",
				});
			}
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
