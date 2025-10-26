import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";

export const useGetCancellationAnalyticsQuery = () => {
	return useQuery({
		queryKey: ["cancellation-analytics-ami"],
		queryFn: () => amiAnalyticsApi.getCancellationAnalytics(),
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
