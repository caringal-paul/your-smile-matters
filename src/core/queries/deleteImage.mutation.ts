import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { toast } from "sonner";
import uploadImageApi from "../api/upload/upload-image.api";

export const useDeleteImageMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ filename }: { filename: string }) => {
			const res: BaseResponseDto<null> = await uploadImageApi.deleteImage(
				filename
			);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to delete image!");
			}

			return filename;
		},
		onSuccess: (filename) => {
			toast.success("Image deleted successfully!");

			// Optional: Invalidate queries if needed
			// queryClient.invalidateQueries({
			// 	queryKey: ["images"],
			// 	refetchType: "all",
			// });

			console.log(`Deleted: ${filename}`);
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Image delete mutation finished");
		},
	});
};
