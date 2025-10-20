import { BaseResponseDto } from "@/core/types/base.types";
import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosError,
	InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

interface RefreshTokenData {
	access_token: string;
	expires_in: string;
}

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

const clearAuth = () => {
	localStorage.removeItem("sf_access_token");
	localStorage.removeItem("sf_refresh_token");
	localStorage.removeItem("customer-logged-in");
	isRefreshing = false;
	refreshPromise = null;
};

const redirectToLogin = () => {
	const isOnAuthPage = window.location.pathname.includes("/auth");
	if (!isOnAuthPage) {
		toast.error("Session expired. Please log in again.");

		localStorage.removeItem("customer-logged-in");
		setTimeout(() => {
			window.location.href = "/";
		}, 2000);
	}
};

const refreshAccessToken = async (
	baseURL: string,
	refreshToken: string
): Promise<string> => {
	const response = await axios.post<BaseResponseDto<RefreshTokenData>>(
		`${baseURL}/client/auth/refresh`,
		{ refresh_token: refreshToken }
	);

	const newAccessToken = response.data?.data?.access_token;
	if (!newAccessToken) {
		throw new Error("No access token in refresh response");
	}

	localStorage.setItem("sf_access_token", newAccessToken);
	return newAccessToken;
};

const createApiClient = (baseURL: string) => {
	const client: AxiosInstance = axios.create({
		baseURL,
		headers: { "Content-Type": "application/json" },
	});

	// Add token to requests
	client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem("sf_access_token");
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});

	// Handle 401 errors and refresh token
	client.interceptors.response.use(
		(response) => response,
		async (error: AxiosError<BaseResponseDto<any>>) => {
			const originalRequest = error.config as InternalAxiosRequestConfig & {
				_retry?: boolean;
			};

			// Not a 401? Just reject
			if (error.response?.status !== 401) {
				return Promise.reject(error);
			}

			// Is this the refresh endpoint failing? Clear and redirect
			const isRefreshEndpoint = originalRequest.url?.includes("/auth/refresh");
			if (isRefreshEndpoint) {
				clearAuth();
				redirectToLogin();
				return Promise.reject(error);
			}

			// Already retried? Give up
			if (originalRequest._retry) {
				clearAuth();
				redirectToLogin();
				return Promise.reject(error);
			}

			// Get refresh token
			const refreshToken = localStorage.getItem("sf_refresh_token");
			if (!refreshToken) {
				clearAuth();
				redirectToLogin();
				return Promise.reject(error);
			}

			// Mark as retried
			originalRequest._retry = true;

			try {
				// If already refreshing, wait for it
				if (isRefreshing && refreshPromise) {
					const newToken = await refreshPromise;
					if (originalRequest.headers) {
						originalRequest.headers.Authorization = `Bearer ${newToken}`;
					}
					return client(originalRequest);
				}

				// Start refresh
				isRefreshing = true;
				refreshPromise = refreshAccessToken(baseURL, refreshToken);
				const newToken = await refreshPromise;

				// Retry with new token
				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${newToken}`;
				}
				return client(originalRequest);
			} catch (refreshError) {
				clearAuth();
				redirectToLogin();
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
				refreshPromise = null;
			}
		}
	);

	return client;
};

// Create the customer client
const client = createApiClient(import.meta.env.VITE_API_URL);

// Export simple methods
export const customerApiClient = {
	get: <T>(url: string, config?: AxiosRequestConfig) =>
		client.get<T>(url, config).then((res) => res.data),

	post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
		client.post<T>(url, data, config).then((res) => res.data),

	patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
		client.patch<T>(url, data, config).then((res) => res.data),

	put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
		client.put<T>(url, data, config).then((res) => res.data),

	delete: <T>(url: string, config?: AxiosRequestConfig) =>
		client.delete<T>(url, config).then((res) => res.data),
};
