import { useMutation, useQuery } from "@tanstack/react-query";
import sfPhotographerApi from "@/core/api/photographer/store-front/photographer.sf.api";
import { BaseResponseDto } from "@/core/types/base.types";
import { toast } from "sonner";
import { TimeSlot } from "@/core/types/time-slots.types";

export const useGetTimeAvailabilityMutation = () => {
	return useMutation({
		mutationFn: async (payload: {
			date: string;
			session_duration_minutes: number;
		}) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const res: BaseResponseDto<string[]> =
				await sfPhotographerApi.getTimeAvailability(payload);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to fetch time availability");
			}

			// ✅ Transform response into array of { start, end }
			const formattedData: TimeSlot[] = (res.data ?? []).map((range) => {
				const [start, end] = range.split(" - ").map((t) => t.trim());
				return { start, end };
			});

			return formattedData;
		},

		onSuccess: (data) => {
			if (data && data.length > 0) {
				toast.success("Available time slots found!");
			} else {
				toast.error(
					"No available time for the selected date and duration of services"
				);
			}
		},

		onError: (error) => {
			toast.error(error.message);
		},

		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
