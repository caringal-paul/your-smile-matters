/**
 * Returns the uppercase initials of a given name or phrase.
 *
 * Examples:
 *  getInitials("Paul Caringal") ➜ "PC"
 *  getInitials("John Doe Smith") ➜ "JDS"
 *  getInitials(" single ") ➜ "S"
 *  getInitials("React Query Dev Tools") ➜ "RQDT"
 */
export const getInitials = (input: string): string => {
	if (!input || typeof input !== "string") return "";

	return input
		.trim()
		.split(/\s+/) // split by one or more spaces
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase())
		.join("");
};
