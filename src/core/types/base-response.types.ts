import { BookingModel } from "@/core/models/booking.model";
import { CustomerModel } from "@/core/models/customer.model";
import { TransactionModel } from "@/core/models/transaction.model";
import { BookingRequestModel } from "../models/booking-request.model";
import { UserModel } from "../models/user.model";
import { PhotographerModel } from "../models/photographer.model";
import { TransactionRequestModel } from "../models/transaction-request.model";
import { PackageModel } from "../models/package.model";
import { RatableType } from "./base.types";

export type TransactionResponse = Omit<
	TransactionModel,
	"booking_id" | "customer_id"
> & {
	booking_id: BookingModel;
	customer_id: CustomerModel;
};

export type BookingRequestResponse = Omit<
	BookingRequestModel,
	"booking_id" | "customer_id" | "reviewed_by" | "new_photographer_id"
> & {
	booking_id: BookingModel;
	customer_id: CustomerModel;
	new_photographer_id: PhotographerModel;
	reviewed_by?: UserModel | null;
};

export type BookingRequestByIdResponse = Omit<
	BookingRequestModel,
	"booking_id" | "customer_id" | "reviewed_by" | "new_photographer_id"
> & {
	booking_id: Omit<
		BookingModel,
		"photographer_id" | "customer_id" | "package_id"
	> & {
		customer_id: CustomerModel;
		photographer_id: PhotographerModel;
		package_id: PackageModel;
	};
	customer_id: CustomerModel;
	new_photographer_id: PhotographerModel;
	reviewed_by?: UserModel | null;
};

export type TransactionRequestResponse = Omit<
	TransactionRequestModel,
	"transaction_id" | "booking_id" | "customer_id" | "reviewed_by"
> & {
	transaction_id: TransactionModel;
	booking_id: BookingModel;
	customer_id: CustomerModel;
	reviewed_by: UserModel;
};

export type TransactionRequestByIdResponse = Omit<
	TransactionRequestModel,
	"transaction_id" | "booking_id" | "customer_id" | "reviewed_by"
> & {
	booking_id: Omit<
		BookingModel,
		"photographer_id" | "customer_id" | "package_id"
	> & {
		customer_id: CustomerModel;
		photographer_id: PhotographerModel;
		package_id: PackageModel;
	};
	customer_id: CustomerModel;
	reviewed_by: UserModel;
	transaction_id: TransactionModel;
};

export interface RatingResponse {
	_id: string;
	booking_id: BookingModel;
	customer_id: CustomerModel;
	ratable_type: RatableType;
	ratable_id: {
		_id: string;
		name: string;
		description?: string;
		price?: number;
		old_price?: number;
		duration_minutes?: number;
		is_available?: boolean;
		category?: string;
		is_active?: boolean;
		service_gallery?: string[];
	};
	rating: number;
	comment?: string | null;
	response?: string | null;
	responded_at?: string | null;
	responded_by?: UserModel | null;
	created_at: string;
	updated_at: string;
	is_active: boolean;
}

export interface RatingAnalytics {
	total_ratings: number;
	average_rating: number;
	rating_percentage: number;
	rating_distribution: {
		one_star: number;
		two_star: number;
		three_star: number;
		four_star: number;
		five_star: number;
	};
	rating_distribution_percentage: {
		one_star: number;
		two_star: number;
		three_star: number;
		four_star: number;
		five_star: number;
	};
	total_with_comments: number;
	total_with_responses: number;
}

export type RatingWithAnalyticsResponse = {
	ratings: RatingResponse[];
	analytics: RatingAnalytics;
};

export type ImageUploadResponse = {
	filename: string;
	path: string;
	mimetype: string;
	size: number;
};
