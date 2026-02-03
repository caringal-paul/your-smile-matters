import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";
import { useAnalyticsFilterStore } from "../stores/useAnalyticsFilterStore";

export const useGetTopServicesAnalyticsQuery = (limit: number = 5) => {
	const dateFilter = useAnalyticsFilterStore((state) => state.dateFilter);

	return useQuery({
		queryKey: ["top-services-analytics-ami", dateFilter, limit],
		queryFn: () => amiAnalyticsApi.getTopServices(dateFilter, limit),
		select: (response) => response.data,
	});
};
