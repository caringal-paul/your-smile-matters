import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import { PackageAmiCreate } from "../utils/schemas/package.schema";
import { CreatePackageResponseAmi } from "../utils/types/package-response.ami.types";
import amiPackageApi from "@/core/api/package/ami/package.ami.api";

export const useCreatePackageMutation = () => {
	return useMutation({
		mutationFn: async (payload: PackageAmiCreate) => {
			const res: BaseResponseDto<CreatePackageResponseAmi> =
				await amiPackageApi.create(payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to update Package");
			}

			return res.data;
		},
		onSuccess: (data) => {
			toast.success("Package created successfully!");

			queryClient.invalidateQueries({
				queryKey: ["packages"],
				refetchType: "all",
			});
		},
		onError: (error) => {
			console.error("❌ Failed to create Package:");
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
