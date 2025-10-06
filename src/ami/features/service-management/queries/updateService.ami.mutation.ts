import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import { ServiceAmiUpdate } from "../utils/schemas/service.schema";
import amiServiceApi from "@/core/api/service/ami/service.ami.api";
import { UpdateServiceResponseAmi } from "../utils/types/service-response.ami.types";

export const useUpdateServiceMutation = () => {
	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string;
			payload: ServiceAmiUpdate;
		}) => {
			const res: BaseResponseDto<UpdateServiceResponseAmi> =
				await amiServiceApi.update(id, payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to update Service");
			}

			return res.data;
		},
		onSuccess: async (data) => {
			toast.success("Service updated successfully!");

			queryClient.invalidateQueries({
				queryKey: ["services"],
				refetchType: "all",
			});
			if (data?._id) {
				await queryClient.invalidateQueries({
					queryKey: ["service", data._id],
					refetchType: "all",
				});
			}
		},
		onError: (error) => {
			toast.error(error.message);

			console.error("❌ Failed to update Service:", error);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
