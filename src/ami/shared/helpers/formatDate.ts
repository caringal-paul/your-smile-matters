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

export const formatDisplayDate = (dateString: string): string => {
	if (!dateString) return "";
	const [year, month, day] = dateString.split("-");
	return `${month} - ${day} - ${year}`;
};

export const getFormattedToday = (): string => {
	const today = new Date();

	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");
	const year = today.getFullYear();

	// * This will return mm - dd - yyyy
	return `${year} - ${month} -  ${day}`;
};
