export type FilterOptions<T> = {
	[K in keyof T]: string[];
};
