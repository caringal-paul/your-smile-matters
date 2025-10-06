/**
 * Formats a duration in minutes into human-readable text.
 * @param minutes - duration in minutes
 * @returns formatted string like "30 mins", "1 hr", "2 hr 15 mins"
 */
export function formatDurationByMinutes(minutes: number): string {
	if (!minutes || minutes < 1) return "0 mins";

	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;

	let result = "";

	if (hours > 0) {
		result += `${hours} hr${hours > 1 ? "s" : ""}`;
	}

	if (mins > 0) {
		if (hours > 0) result += " ";
		result += `${mins} min${mins > 1 ? "s" : ""}`;
	}

	return result;
}

/**
 * Formats a duration in hours into a human-readable string.
 * Converts to days, hours, and minutes when appropriate.
 *
 * @param hours - duration in hours (can include fractions, e.g. 42.5)
 * @returns formatted string like "1 day 18 hrs", "2 days 3 hrs 30 mins", or "45 mins"
 */
export function formatDurationByHours(hours: number): string {
	if (!hours || hours < 1 / 60) return "0 mins";

	const totalMinutes = Math.round(hours * 60);
	const days = Math.floor(totalMinutes / (60 * 24));
	const remainingMinutesAfterDays = totalMinutes % (60 * 24);
	const fullHours = Math.floor(remainingMinutesAfterDays / 60);
	const mins = remainingMinutesAfterDays % 60;

	let result = "";

	if (days > 0) {
		result += `${days} day${days > 1 ? "s" : ""}`;
	}

	if (fullHours > 0) {
		if (days > 0) result += " ";
		result += `${fullHours} hr${fullHours > 1 ? "s" : ""}`;
	}

	if (mins > 0) {
		if (days > 0 || fullHours > 0) result += " ";
		result += `${mins} min${mins > 1 ? "s" : ""}`;
	}

	return result;
}
