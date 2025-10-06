import { useMutation } from "@tanstack/react-query";
import amiUserApi from "@/core/api/photographer/ami/photographer.ami.api";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import { PhotographerAmiUpdate } from "../utils/schemas/photographer.schema";
import { UpdatePhotographerResponseAmi } from "../utils/types/photographer-response.ami.types";
import amiPhotographerApi from "@/core/api/photographer/ami/photographer.ami.api";

export const useUpdatePhotographerMutation = () => {
	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string;
			payload: PhotographerAmiUpdate;
		}) => {
			const res: BaseResponseDto<UpdatePhotographerResponseAmi> =
				await amiPhotographerApi.update(id, payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to update photographer");
			}

			return res.data;
		},
		onSuccess: async (data) => {
			toast.success("Photographer updated successfully!");

			queryClient.invalidateQueries({
				queryKey: ["photographers"],
				refetchType: "all",
			});
			if (data?._id) {
				await queryClient.invalidateQueries({
					queryKey: ["photographer", data._id],
					refetchType: "all",
				});
			}
		},
		onError: (error) => {
			toast.error(error.message);

			console.error("❌ Failed to update photographer:", error);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
