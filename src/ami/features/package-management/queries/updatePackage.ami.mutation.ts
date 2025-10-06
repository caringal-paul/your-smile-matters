import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { toast } from "sonner";
import { PackageAmiUpdate } from "../utils/schemas/package.schema";
import { UpdatePackageResponseAmi } from "../utils/types/package-response.ami.types";
import amiPackageApi from "@/core/api/package/ami/package.ami.api";

export const useUpdatePackageMutation = () => {
	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string;
			payload: PackageAmiUpdate;
		}) => {
			const res: BaseResponseDto<UpdatePackageResponseAmi> =
				await amiPackageApi.update(id, payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to update Package");
			}

			return res.data;
		},
		onSuccess: async (data) => {
			toast.success("Package updated successfully!");

			queryClient.invalidateQueries({
				queryKey: ["packages"],
				refetchType: "all",
			});
			if (data?._id) {
				await queryClient.invalidateQueries({
					queryKey: ["package", data._id],
					refetchType: "all",
				});
			}
		},
		onError: (error) => {
			toast.error(error.message);

			console.error("❌ Failed to update Package:", error);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
