import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { toast } from "sonner";
import amiBookingApi from "@/core/api/booking/ami/booking.ami.api";
import { queryClient } from "@/core/lib/react-query/react-query-client";

type RescheduleMutationProps = {
	id: string;
	payload: {
		new_booking_date: Date;
		new_start_time: string;
		new_end_time: string;
		new_photographer_id: string;
	};
};

export const useRescheduleBookingMutation = () => {
	return useMutation({
		mutationFn: async ({ id, payload }: RescheduleMutationProps) => {
			const res: BaseResponseDto<null> = await amiBookingApi.reschedule(
				id,
				payload
			);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to reschedule booking!");
			}

			return id;
		},
		onSuccess: (data) => {
			const id = data;

			toast.success("Booking rescheduled!");

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
