import { SortOrder } from "./sort.types";

export type Column<T> = {
	key: keyof T;
	label?: any;
	sortable?: boolean;
	render?: (value: T[keyof T], row: T) => React.ReactNode;
	priority?: 1 | 2; // Higher number = higher priority to show in accordion header
	sortFn?: (a: T, b: T, order: SortOrder) => number;
};
