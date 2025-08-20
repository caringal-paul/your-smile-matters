import { useState, useMemo } from "react";
import { isWithinInterval, parseISO, startOfToday, subDays } from "date-fns";

export type DateFilter = {
	type: "Today" | "Last 7 days" | "Last 30 days" | "Custom" | null;
	startDate?: string;
	endDate?: string;
};

type UseFilteredTableDataProps<T> = {
	data: T[];
	keys: (keyof T)[];
	initialFilters?: Partial<Record<keyof T, string[]>>;
	dateFields?: (keyof T)[];
	externalSearchText?: string;
};

export function useFilteredTableData<T>({
	data,
	keys,
	initialFilters = {},
	dateFields = [],
	externalSearchText,
}: UseFilteredTableDataProps<T>) {
	// const [searchText, setSearchText] = useState("");

	const [internalSearchText, setInternalSearchText] = useState("");

	const searchText = externalSearchText ?? internalSearchText;
	const setSearchText = externalSearchText ? () => {} : setInternalSearchText;

	// Draft filters controlled by UI
	const [filtersDraft, setFiltersDraft] =
		useState<Partial<Record<keyof T, string[]>>>(initialFilters);
	const [dateFilterDraft, setDateFilterDraft] = useState<DateFilter>({
		type: null,
	});

	// ✅ FINAL filters used for filtering data
	const [appliedFilters, setAppliedFilters] =
		useState<Partial<Record<keyof T, string[]>>>(initialFilters);
	const [appliedDateFilter, setAppliedDateFilter] = useState<DateFilter>({
		type: null,
	});

	const applyFilters = () => {
		setAppliedFilters(filtersDraft);
		setAppliedDateFilter(dateFilterDraft);
	};

	const filteredData = useMemo(() => {
		return data
			.filter((item) => {
				// Object/field filters
				const passesFilters = Object.entries(appliedFilters).every(
					([key, values]) => {
						if (!Array.isArray(values) || values.length === 0) return true;
						return values.includes(String(item[key as keyof T]));
					}
				);
				if (!passesFilters) return false;

				// Date filter logic
				if (appliedDateFilter.type !== null && dateFields.length > 0) {
					const rangeStartEnd = getDateRange(appliedDateFilter);
					if (!rangeStartEnd) return false;

					const { start, end } = rangeStartEnd;

					const passesDate = dateFields.some((field) => {
						const dateValue = item[field];
						if (!dateValue) return false;
						const itemDate = parseISO(String(dateValue));
						return isWithinInterval(itemDate, { start, end });
					});

					if (!passesDate) return false;
				}

				return true;
			})
			.filter((item) =>
				keys.some((key) =>
					String(item[key])?.toLowerCase().includes(searchText.toLowerCase())
				)
			);
	}, [data, appliedFilters, appliedDateFilter, searchText, keys, dateFields]);

	return {
		searchText,
		setSearchText,
		// Working states controlled by the UI
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		setDateFilterDraft,
		// Call to apply drafts
		applyFilters,
		// Final result
		filteredData,
	};
}

const getDateRange = (
	dateFilter: DateFilter
): { start: Date; end: Date } | null => {
	switch (dateFilter.type) {
		case "Today":
			return { start: startOfToday(), end: new Date() };
		case "Last 7 days":
			return { start: subDays(new Date(), 7), end: new Date() };
		case "Last 30 days":
			return { start: subDays(new Date(), 30), end: new Date() };
		case "Custom":
			if (!dateFilter.startDate || !dateFilter.endDate) return null;
			return {
				start: new Date(dateFilter.startDate),
				end: new Date(dateFilter.endDate),
			};
		default:
			return null;
	}
};
