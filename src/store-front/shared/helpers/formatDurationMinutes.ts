/**
 * Formats a duration in minutes into human-readable text.
 * @param minutes - duration in minutes
 * @returns formatted string like "30 mins", "1 hr", "2 hr 15 mins"
 */
export function formatDuration(minutes: number): string {
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
