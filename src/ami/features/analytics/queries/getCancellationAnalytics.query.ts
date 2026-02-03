import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";
import { useAnalyticsFilterStore } from "../stores/useAnalyticsFilterStore";

export const useGetCancellationAnalyticsQuery = () => {
	const dateFilter = useAnalyticsFilterStore((state) => state.dateFilter);

	return useQuery({
		queryKey: ["cancellation-analytics-ami", dateFilter],
		queryFn: () => amiAnalyticsApi.getCancellationAnalytics(dateFilter),
		select: (response) => {
			return {
				...response.data,
				cancellationReasons: response?.data?.cancellationReasons.map(
					(reason) => ({
						...reason,
						"Shows how many bookings were cancelled for this reason":
							reason.count,
					})
				),
			};
		},
	});
};
