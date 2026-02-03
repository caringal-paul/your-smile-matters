import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";
import { useAnalyticsFilterStore } from "../stores/useAnalyticsFilterStore";

export const useGetBookingHeatmapAnalyticsQuery = (months: number = 3) => {
	const dateFilter = useAnalyticsFilterStore((state) => state.dateFilter);

	return useQuery({
		queryKey: ["booking-heatmap-analytics-ami", dateFilter, months],
		queryFn: () => amiAnalyticsApi.getBookingHeatmap(dateFilter, months),
		select: (data) => data.data,
	});
};
