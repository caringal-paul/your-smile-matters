import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { toast } from "sonner";
import amiBookingApi from "@/core/api/booking/ami/booking.ami.api";
import { queryClient } from "@/core/lib/react-query/react-query-client";

export const useCompleteBookingMutation = () => {
	return useMutation({
		mutationFn: async (id: string) => {
			const res: BaseResponseDto<null> = await amiBookingApi.complete(id);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to complete booking!");
			}

			return id;
		},
		onSuccess: (data) => {
			const id = data;

			toast.success("Booking completed!");

			queryClient.invalidateQueries({
				queryKey: ["bookings"],
				refetchType: "all",
			});
			queryClient.invalidateQueries({ queryKey: ["booking", id] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
