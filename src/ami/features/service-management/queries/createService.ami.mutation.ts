import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import { ServiceAmiCreate } from "../utils/schemas/service.schema";
import { CreateServiceResponseAmi } from "../utils/types/service-response.ami.types";
import amiServiceApi from "@/core/api/service/ami/service.ami.api";

export const useCreateServiceMutation = () => {
	return useMutation({
		mutationFn: async (payload: ServiceAmiCreate) => {
			const res: BaseResponseDto<CreateServiceResponseAmi> =
				await amiServiceApi.create(payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to update Service");
			}

			return res.data;
		},
		onSuccess: (data) => {
			toast.success("Service created successfully!");

			queryClient.invalidateQueries({
				queryKey: ["services"],
				refetchType: "all",
			});
		},
		onError: (error) => {
			console.error("❌ Failed to create Service:");
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
