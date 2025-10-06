import { MetaData } from "@/core/types/base.types";
import { ServiceCategory } from "./service.model";

export type DayOfWeek =
	| "Sunday"
	| "Monday"
	| "Tuesday"
	| "Wednesday"
	| "Thursday"
	| "Friday"
	| "Saturday";

// Sub-types
export type BreakTime = {
	start_time: string;
	end_time: string;
	description?: string;
};

export type WeeklyScheduleItem = {
	day_of_week: DayOfWeek;
	start_time: string; // Format: "HH:mm" (24-hour format, e.g., "09:00")
	end_time: string; // Format: "HH:mm" (24-hour format, e.g., "17:00")
	is_available: boolean;
	notes?: string;
};

export type CustomHours = {
	start_time: string; // Format: "HH:mm"
	end_time: string; // Format: "HH:mm"
};

export type DateOverride = {
	date: Date; // ISO date string
	is_available: boolean;
	custom_hours?: CustomHours;
	reason?: string; // "Holiday", "Vacation", "Sick Leave", "Special Event"
	notes?: string;
};

// Main Photographer Model
export type PhotographerModel = MetaData & {
	name: string;
	email: string;
	mobile_number?: string;
	bio?: string;
	profile_image?: string;

	// Service categories - at least 1 required, max all 5
	specialties: ServiceCategory[];

	// Portfolio gallery - array of image URLs (max 9)
	photo_gallery?: string[];

	// Scheduling
	weekly_schedule?: WeeklyScheduleItem[];
	date_overrides?: DateOverride[];

	// Analytics
	total_bookings: number;
	completed_bookings: number;

	// Booking settings
	booking_lead_time_hours?: number; // Minimum notice required (default: 24)
};
