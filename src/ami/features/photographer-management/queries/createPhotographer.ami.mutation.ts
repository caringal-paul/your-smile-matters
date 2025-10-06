import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import { CreatePhotographerResponseAmi } from "../utils/types/photographer-response.ami.types";
import { PhotographerAmiCreate } from "../utils/schemas/photographer.schema";
import amiPhotographerApi from "@/core/api/photographer/ami/photographer.ami.api";

export const useCreatePhotographerMutation = () => {
	return useMutation({
		mutationFn: async (payload: PhotographerAmiCreate) => {
			const res: BaseResponseDto<CreatePhotographerResponseAmi> =
				await amiPhotographerApi.create(payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to update photographer");
			}

			return res.data;
		},
		onSuccess: (data) => {
			toast.success("Photographer created successfully!");

			queryClient.invalidateQueries({
				queryKey: ["photographers"],
				refetchType: "all",
			});
		},
		onError: (error) => {
			console.error("❌ Failed to create photographer:");
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
