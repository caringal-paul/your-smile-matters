import { format } from "date-fns";

export function formatToTableDate(isoString: string): string {
	const now = new Date(isoString);

	// Get date components
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
	const day = String(now.getDate() - 1).padStart(2, "0");

	// Get time components
	let hours = now.getHours();
	const ampm = hours >= 12 ? "pm" : "am";
	hours = hours % 12;
	hours = hours ? hours : 12; // convert 0 to 12
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");

	// Format the date and time
	const formattedDate = `${year}-${month}-${day}, ${hours}:${minutes}:${seconds} ${ampm}`;

	// * Sample return 2025-04-22, 2:20:20 pm
	return formattedDate;
}

export const formatDateToTextMonth = (utcDate: string): string => {
	const date = new Date(utcDate);

	return new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	}).format(date);
};

export const getFormattedToday = (): string => {
	const today = new Date();

	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");
	const year = today.getFullYear();

	// * This will return mm - dd - yyyy
	return `${year} - ${month} -  ${day}`;
};
export const formatDisplayDate = (dateString: string): string => {
	if (!dateString) return "";
	const [year, month, day] = dateString.split("-");
	return `${month} - ${day} - ${year}`;
};

// HIGHLY USED

/**
 *  @returns format: Month Day, Year (e.g., January 01, 2024)
 */
export function formatToNormalDate(utcDate: string | Date): string {
	const date = new Date(utcDate);
	const month = date.toLocaleString("default", { month: "long" });
	const day = String(date.getDate()).padStart(2, "0");
	const year = date.getFullYear();

	return `${month}, ${day}, ${year}`;
}

/**
 *  @returns format: 2025-10-06T00:00:00Z
 */
export const formatToUtc = (date: Date): Date => {
	const utcDate = new Date(
		Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
	);
	return utcDate;
};

/**
 *  @returns format: 00:00 || 16:30
 */
export function formatTo24HourTime(time12h: string): string {
	const match = time12h
		.trim()
		.toLowerCase()
		.match(/^(\d{1,2}):(\d{2})\s?(am|pm)$/);

	if (!match) {
		throw new Error(`Invalid time format: ${time12h}`);
	}

	let [_, hoursStr, minutes, meridian] = match;
	let hours = parseInt(hoursStr, 10);

	if (meridian === "pm" && hours < 12) {
		hours += 12;
	}
	if (meridian === "am" && hours === 12) {
		hours = 0;
	}

	// Always return HH:MM with leading zero
	return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

/**
 *  @returns format: 05:00 AM || 06:30 PM
 */
export function formatToNormalTime(time24: string): string {
	if (!time24) return "";

	const [hourStr, minute] = time24.split(":");
	let hour = parseInt(hourStr, 10);

	const period = hour >= 12 ? "PM" : "AM";
	hour = hour % 12 || 12; // convert 0 → 12 for AM, 13 → 1 for PM

	return `${hour.toString().padStart(2, "0")}:${minute} ${period}`;
}
