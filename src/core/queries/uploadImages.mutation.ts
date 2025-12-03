import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { toast } from "sonner";
import { ImageUploadResponse } from "@/core/types/base-response.types";
import uploadImageApi from "../api/upload/upload-image.api";

export const useUploadImagesMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ formData }: { formData: FormData }) => {
			const res: BaseResponseDto<ImageUploadResponse[]> =
				await uploadImageApi.uploadImages(formData);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to upload images!");
			}

			return res.data;
		},
		onSuccess: (data) => {
			if (!data) {
				return;
			}

			return data;
		},
		onError: (error: Error) => {
			console.log("Error", error);

			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Multiple images upload mutation finished");
		},
	});
};
