import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { adminApiClient } from "@/core/lib/axios/api-client.ami";

import {
	BookingTrendAmiResponse,
	CancellationAnalyticsAmiResponse,
	CustomerInsightsAmiResponse,
	HeatmapDataAmiResponse,
	OverviewMetricsAmiResponse,
	PackagePerformanceAmiResponse,
	PeakHourAmiResponse,
	PhotographerPerformanceAmiResponse,
	RevenueForecastAmiResponse,
	StatusDistributionAmiResponse,
	TopServiceAmiResponse,
} from "@/ami/features/analytics/utils/types/analytics-response.ami.types";
import { AnalyticsDateFilter } from "@/ami/features/analytics/stores/useAnalyticsFilterStore";

const ENDPOINT = "/admin/analytics";

const buildQueryParams = (
	filter: AnalyticsDateFilter,
	additionalParams?: Record<string, any>
) => {
	const params: Record<string, any> = { ...additionalParams };

	if (filter.year) params.year = filter.year;
	if (filter.month) params.month = filter.month;
	if (filter.startDate) params.startDate = filter.startDate;
	if (filter.endDate) params.endDate = filter.endDate;

	return params;
};

const amiAnalyticsApi = {
	async getOverview(
		filter: AnalyticsDateFilter = {}
	): Promise<BaseResponseDto<OverviewMetricsAmiResponse>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<OverviewMetricsAmiResponse>
			>(`${ENDPOINT}/overview`, { params: buildQueryParams(filter) });
			return response;
		} catch (error) {
			const parsedError = handleError(error);
			throw parsedError;
		}
	},

	async getBookingTrends(
		filter: AnalyticsDateFilter = {},
		period: "day" | "month" = "month",
		months: number = 6
	): Promise<BaseResponseDto<BookingTrendAmiResponse[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<BookingTrendAmiResponse[]>
			>(`${ENDPOINT}/trends`, {
				params: buildQueryParams(filter, { period, months }),
			});
			return response;
		} catch (error) {
			const parsedError = handleError(error);
			throw parsedError;
		}
	},

	async getStatusDistribution(
		filter: AnalyticsDateFilter = {}
	): Promise<BaseResponseDto<StatusDistributionAmiResponse[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<StatusDistributionAmiResponse[]>
			>(`${ENDPOINT}/status-distribution`, {
				params: buildQueryParams(filter),
			});
			return response;
		} catch (error) {
			const parsedError = handleError(error);
			throw parsedError;
		}
	},

	async getTopServices(
		filter: AnalyticsDateFilter = {},
		limit: number = 5
	): Promise<BaseResponseDto<TopServiceAmiResponse[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<TopServiceAmiResponse[]>
			>(`${ENDPOINT}/top-services`, {
				params: buildQueryParams(filter, { limit }),
			});
			return response;
		} catch (error) {
			const parsedError = handleError(error);
			throw parsedError;
		}
	},

	async getPhotographerPerformances(
		filter: AnalyticsDateFilter = {}
	): Promise<BaseResponseDto<PhotographerPerformanceAmiResponse[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<PhotographerPerformanceAmiResponse[]>
			>(`${ENDPOINT}/photographer-performance`, {
				params: buildQueryParams(filter),
			});
			return response;
		} catch (error) {
			const parsedError = handleError(error);
			throw parsedError;
		}
	},

	async getCustomerInsights(
		filter: AnalyticsDateFilter = {}
	): Promise<BaseResponseDto<CustomerInsightsAmiResponse>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<CustomerInsightsAmiResponse>
			>(`${ENDPOINT}/customer-insights`, {
				params: buildQueryParams(filter),
			});
			return response;
		} catch (error) {
			const parsedError = handleError(error);
			throw parsedError;
		}
	},

	async getPackagePerformance(
		filter: AnalyticsDateFilter = {}
	): Promise<BaseResponseDto<PackagePerformanceAmiResponse>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<PackagePerformanceAmiResponse>
			>(`${ENDPOINT}/package-performance`, {
				params: buildQueryParams(filter),
			});
			return response;
		} catch (error) {
			const parsedError = handleError(error);
			throw parsedError;
		}
	},

	async getBookingHeatmap(
		filter: AnalyticsDateFilter = {},
		months: number = 3
	): Promise<BaseResponseDto<HeatmapDataAmiResponse[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<HeatmapDataAmiResponse[]>
			>(`${ENDPOINT}/booking-heatmap`, {
				params: buildQueryParams(filter, { months }),
			});
			return response;
		} catch (error) {
			const parsedError = handleError(error);
			throw parsedError;
		}
	},

	async getPeakHours(
		filter: AnalyticsDateFilter = {}
	): Promise<BaseResponseDto<PeakHourAmiResponse[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<PeakHourAmiResponse[]>
			>(`${ENDPOINT}/peak-hours`, {
				params: buildQueryParams(filter),
			});
			return response;
		} catch (error) {
			const parsedError = handleError(error);
			throw parsedError;
		}
	},

	async getCancellationAnalytics(
		filter: AnalyticsDateFilter = {}
	): Promise<BaseResponseDto<CancellationAnalyticsAmiResponse>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<CancellationAnalyticsAmiResponse>
			>(`${ENDPOINT}/cancellations`, {
				params: buildQueryParams(filter),
			});
			return response;
		} catch (error) {
			const parsedError = handleError(error);
			throw parsedError;
		}
	},

	async getRevenueForecast(
		historicalMonths: number = 6
	): Promise<BaseResponseDto<RevenueForecastAmiResponse>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<RevenueForecastAmiResponse>
			>(`${ENDPOINT}/revenue-forecast`, {
				params: { historicalMonths },
			});
			return response;
		} catch (error) {
			const parsedError = handleError(error);
			throw parsedError;
		}
	},
};

export default amiAnalyticsApi;
