import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";

export const useGetBookingHeatmapAnalyticsQuery = () => {
	return useQuery({
		queryKey: ["booking-heatmap-analytics-ami"],
		queryFn: () => amiAnalyticsApi.getBookingHeatmap(),
		select: (data) => data.data,
	});
};
