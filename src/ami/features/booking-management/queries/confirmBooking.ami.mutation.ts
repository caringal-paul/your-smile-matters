import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { toast } from "sonner";
import amiBookingApi from "@/core/api/booking/ami/booking.ami.api";

export const useConfirmBookingMutation = () => {
	return useMutation({
		mutationFn: async (id: string) => {
			const res: BaseResponseDto<null> = await amiBookingApi.confirm(id);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to confirm booking!");
			}

			return res.data;
		},
		onError: (error) => {
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
