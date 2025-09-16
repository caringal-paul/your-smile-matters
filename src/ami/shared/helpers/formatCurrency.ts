export const formatToPeso = (amount: string | undefined) => {
	if (!amount) return;

	const num = typeof amount === "string" ? parseFloat(amount) : amount;

	return `₱ ${num.toLocaleString("en-NG", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
};

export const getFormattedPesoInput = (value: string | number) => {
	const raw = value.toString().replace(/[^0-9]/g, "");

	const formatted = raw
		? `₱ ${Number(raw).toLocaleString("en-NG", {
				maximumFractionDigits: 0,
		  })}`
		: "";

	return {
		formatted,
		raw,
	};
};
