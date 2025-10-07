import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { toast } from "sonner";
import amiBookingApi from "@/core/api/booking/ami/booking.ami.api";

type CancelMutationProps = {
	id: string;
	cancelled_reason: string;
};

export const useCancelBookingMutation = () => {
	return useMutation({
		mutationFn: async ({ id, cancelled_reason }: CancelMutationProps) => {
			const res: BaseResponseDto<null> = await amiBookingApi.cancel(
				id,
				cancelled_reason
			);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to cancel booking!");
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
