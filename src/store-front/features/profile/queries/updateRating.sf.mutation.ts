import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { BaseResponseDto } from "@/core/types/base.types";
import { RatingResponse } from "@/core/types/base-response.types";
import sfRatingApi from "@/core/api/rating/sf/rating.sf.api";
import { UpdateRatingSchema } from "../utils/schema/rating.schema";

type UpdateRatingProps = {
	ratingId: string;
	payload: UpdateRatingSchema;
};

export const useUpdateRatingMutation = () => {
	return useMutation({
		mutationFn: async ({ ratingId, payload }: UpdateRatingProps) => {
			const res: BaseResponseDto<RatingResponse> =
				await sfRatingApi.updateRating(ratingId, payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to send your rating");
			}

			return res.data;
		},
		onSuccess: () => {
			toast.success("Thank you for your feedback!");
		},
		onError: (error: Error) => {
			console.error("❌ Failed to send Cancel request:", error);
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
