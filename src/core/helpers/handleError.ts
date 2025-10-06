import axios from "axios";
import { BaseAppError } from "../types/error.types";

// FIXED: More specific type guard that checks for unique BaseAppError properties
export const isBaseAppError = (err: unknown): err is BaseAppError => {
	return (
		typeof err === "object" &&
		err !== null &&
		"message" in err &&
		"userMessage" in err && // This makes it unique to BaseAppError
		"code" in err && // This makes it unique to BaseAppError
		typeof (err as any).message === "string" &&
		typeof (err as any).userMessage === "string" &&
		typeof (err as any).code === "string"
	);
};

// GENERIC user-friendly messages - no entity-specific logic
const USER_ERROR_MESSAGES = {
	// Authentication & Authorization
	UNAUTHORIZED: "Please sign in to continue",
	FORBIDDEN: "You don't have permission to perform this action",

	// Validation & Input
	VALIDATION_FAILED: "Please check your information and try again",
	BAD_REQUEST: "The request contains invalid data",

	// File Upload
	FILE_TOO_LARGE: "File is too large. Please choose a smaller file",

	// Network & Server
	NETWORK_ERROR: "Connection problem. Please check your internet and try again",
	SERVER_ERROR: "Something went wrong on our end. Please try again in a moment",
	NOT_FOUND: "The requested resource could not be found",
	RATE_LIMITED:
		"You're making requests too quickly. Please wait a moment and try again",
	CONFLICT: "This action conflicts with the current state",

	// Generic fallback
	UNKNOWN_ERROR:
		"Something unexpected happened. Please try again or contact support",
} as const;

/**
 * GLOBAL GENERIC ERROR HANDLER
 * Works for ANY entity, ANY API endpoint, ANY use case
 * No entity-specific logic whatsoever
 */
export const handleError = (error: unknown): BaseAppError => {
	// CRITICAL: If already processed, return as-is to prevent double transformation
	if (isBaseAppError(error)) {
		return error;
	}

	// Handle Axios/HTTP errors generically
	if (axios.isAxiosError(error)) {
		const status = error.response?.status;
		const responseData = error.response?.data;

		// Try to extract server message from common response structures
		const serverMessage =
			responseData?.message ||
			responseData?.error ||
			responseData?.detail ||
			responseData?.title ||
			error.message;

		// Generic HTTP status code mapping
		switch (status) {
			case 400:
				return {
					message: serverMessage || "Bad request",
					userMessage: USER_ERROR_MESSAGES.BAD_REQUEST,
					code: "BAD_REQUEST",
					status,
					data: responseData,
				};

			case 401:
				return {
					message: serverMessage || "Unauthorized",
					userMessage: USER_ERROR_MESSAGES.UNAUTHORIZED,
					code: "UNAUTHORIZED",
					status,
					data: responseData,
				};

			case 403:
				return {
					message: serverMessage || "Forbidden",
					userMessage: USER_ERROR_MESSAGES.FORBIDDEN,
					code: "FORBIDDEN",
					status,
					data: responseData,
				};

			case 404:
				return {
					message: serverMessage || "Not found",
					userMessage: USER_ERROR_MESSAGES.NOT_FOUND,
					code: "NOT_FOUND",
					status,
					data: responseData,
				};

			case 409:
				return {
					message: serverMessage || "Conflict",
					userMessage: serverMessage || USER_ERROR_MESSAGES.CONFLICT,
					code: "CONFLICT",
					status,
					data: responseData,
				};

			case 413:
				return {
					message: serverMessage || "Payload too large",
					userMessage: USER_ERROR_MESSAGES.FILE_TOO_LARGE,
					code: "PAYLOAD_TOO_LARGE",
					status,
					data: responseData,
				};

			case 422:
				return {
					message: serverMessage || "Validation failed",
					userMessage: USER_ERROR_MESSAGES.VALIDATION_FAILED,
					code: "VALIDATION_FAILED",
					status,
					data: responseData,
				};

			case 429:
				return {
					message: serverMessage || "Too many requests",
					userMessage: USER_ERROR_MESSAGES.RATE_LIMITED,
					code: "RATE_LIMITED",
					status,
					data: responseData,
				};

			case 500:
			case 502:
			case 503:
			case 504:
				return {
					message: serverMessage || "Server error",
					userMessage: USER_ERROR_MESSAGES.SERVER_ERROR,
					code: "SERVER_ERROR",
					status,
					data: responseData,
				};

			default:
				// Handle any other HTTP status codes generically
				return {
					message: serverMessage || `HTTP ${status} error`,
					userMessage:
						status && status >= 500
							? USER_ERROR_MESSAGES.SERVER_ERROR
							: USER_ERROR_MESSAGES.UNKNOWN_ERROR,
					code: "HTTP_ERROR",
					status,
					data: responseData,
				};
		}
	}

	// Handle network/connection errors (no response)
	if (axios.isAxiosError(error) && !error.response) {
		return {
			message: error.message || "Network error",
			userMessage: USER_ERROR_MESSAGES.NETWORK_ERROR,
			code: "NETWORK_ERROR",
		};
	}

	// Handle standard JavaScript errors
	if (error instanceof Error) {
		return {
			message: error.message,
			userMessage: USER_ERROR_MESSAGES.UNKNOWN_ERROR,
			code: "JAVASCRIPT_ERROR",
		};
	}

	// Handle plain objects with message property
	if (
		error &&
		typeof error === "object" &&
		"message" in error &&
		typeof (error as any).message === "string"
	) {
		return {
			message: (error as any).message,
			userMessage: USER_ERROR_MESSAGES.UNKNOWN_ERROR,
			code: "CUSTOM_ERROR",
		};
	}

	// Absolute fallback for anything else
	return {
		message: "Unknown error occurred",
		userMessage: USER_ERROR_MESSAGES.UNKNOWN_ERROR,
		code: "UNKNOWN_ERROR",
	};
};

// DEBUGGING UTILITY
export const debugError = (error: unknown, context: string) => {
	console.log(`\n=== Generic Error Debug: ${context} ===`);
	console.log("Error:", error);
	console.log("Is BaseAppError:", isBaseAppError(error));
	console.log("Is AxiosError:", axios.isAxiosError(error));
	console.log("Is JS Error:", error instanceof Error);
	console.log("=====================================\n");
};
