import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";
import { useAnalyticsFilterStore } from "../stores/useAnalyticsFilterStore";

export const useGetPeakHoursAnalyticsQuery = () => {
	const dateFilter = useAnalyticsFilterStore((state) => state.dateFilter);

	return useQuery({
		queryKey: ["peak-hours-analytics-ami", dateFilter],
		queryFn: () => amiAnalyticsApi.getPeakHours(dateFilter),
		select: (response) => response.data,
	});
};
