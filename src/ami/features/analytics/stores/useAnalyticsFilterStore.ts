import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AnalyticsDateFilter {
	year?: number;
	month?: number;
	startDate?: string;
	endDate?: string;
}

interface AnalyticsFilterState {
	dateFilter: AnalyticsDateFilter;
	setYear: (year: number | undefined) => void;
	setMonth: (month: number | undefined) => void;
	setDateRange: (
		startDate: string | undefined,
		endDate: string | undefined
	) => void;
	clearDateFilter: () => void;
}

export const useAnalyticsFilterStore = create<AnalyticsFilterState>()(
	persist(
		(set) => ({
			dateFilter: {},

			setYear: (year) =>
				set((state) => ({
					dateFilter: {
						...state.dateFilter,
						year,
						month: undefined,
						startDate: undefined,
						endDate: undefined,
					},
				})),

			setMonth: (month) =>
				set((state) => ({
					dateFilter: {
						...state.dateFilter,
						month,
						startDate: undefined,
						endDate: undefined,
					},
				})),

			setDateRange: (startDate, endDate) =>
				set((state) => ({
					dateFilter: {
						...state.dateFilter,
						startDate,
						endDate,
						year: undefined,
						month: undefined,
					},
				})),

			clearDateFilter: () => set({ dateFilter: {} }),
		}),
		{
			name: "analytics-filter-storage",
		}
	)
);
