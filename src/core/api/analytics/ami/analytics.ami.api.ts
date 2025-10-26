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

const ENDPOINT = "/admin/analytics";

const amiAnalyticsApi = {
	async getOverview(): Promise<BaseResponseDto<OverviewMetricsAmiResponse>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<OverviewMetricsAmiResponse>
			>(`${ENDPOINT}/overview`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getBookingTrends(): Promise<
		BaseResponseDto<BookingTrendAmiResponse[]>
	> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<BookingTrendAmiResponse[]>
			>(`${ENDPOINT}/trends`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getStatusDistribution(): Promise<
		BaseResponseDto<StatusDistributionAmiResponse[]>
	> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<StatusDistributionAmiResponse[]>
			>(`${ENDPOINT}/status-distribution`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getTopServices(): Promise<BaseResponseDto<TopServiceAmiResponse[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<TopServiceAmiResponse[]>
			>(`${ENDPOINT}/top-services?limit=5`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getPhotographerPerformances(): Promise<
		BaseResponseDto<PhotographerPerformanceAmiResponse[]>
	> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<PhotographerPerformanceAmiResponse[]>
			>(`${ENDPOINT}/photographer-performance`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getCustomerInsights(): Promise<
		BaseResponseDto<CustomerInsightsAmiResponse>
	> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<CustomerInsightsAmiResponse>
			>(`${ENDPOINT}/customer-insights`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getPackagePerformance(): Promise<
		BaseResponseDto<PackagePerformanceAmiResponse>
	> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<PackagePerformanceAmiResponse>
			>(`${ENDPOINT}/package-performance`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getBookingHeatmap(): Promise<
		BaseResponseDto<HeatmapDataAmiResponse[]>
	> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<HeatmapDataAmiResponse[]>
			>(`${ENDPOINT}/booking-heatmap`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getPeakHours(): Promise<BaseResponseDto<PeakHourAmiResponse[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<PeakHourAmiResponse[]>
			>(`${ENDPOINT}/peak-hours`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getCancellationAnalytics(): Promise<
		BaseResponseDto<CancellationAnalyticsAmiResponse>
	> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<CancellationAnalyticsAmiResponse>
			>(`${ENDPOINT}/cancellations`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getRevenueForecast(): Promise<
		BaseResponseDto<RevenueForecastAmiResponse>
	> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<RevenueForecastAmiResponse>
			>(`${ENDPOINT}/revenue-forecast`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default amiAnalyticsApi;
