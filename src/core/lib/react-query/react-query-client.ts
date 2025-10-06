// Optimized React Query config for better performance
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Data stays fresh for 2 minutes (reduces unnecessary refetches)
			staleTime: 2 * 60 * 1000, // 2 minutes

			// Cache cleaned up after 5 minutes (reduces cache size)
			gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)

			// Reduce aggressive refetching behaviors
			refetchOnMount: false, // Don't auto-refetch on component mount
			refetchOnWindowFocus: false, // Don't refetch when window gets focus
			refetchOnReconnect: true, // Keep this for network reconnection

			// Network/retry settings
			retry: (failureCount, error) => {
				// Don't retry on 4xx errors
				if (error instanceof Error && "status" in error) {
					const status = (error as any).status;
					if (status >= 400 && status < 500) {
						return false;
					}
				}
				return failureCount < 2; // Reduce retry attempts
			},
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000), // Shorter max delay
		},
		mutations: {
			onError: (error) => {
				// Global error handling
				console.error("Mutation error:", error);
			},
		},
	},
});

// Optional: Add cache size monitoring and cleanup
export const monitorCacheSize = () => {
	const cacheSize = queryClient.getQueryCache().getAll().length;
	console.log("React Query cache size:", cacheSize);

	// Auto-cleanup if cache gets too large
	if (cacheSize > 100) {
		console.warn("Cache size exceeded 100 entries, cleaning up old queries");
		queryClient.removeQueries({
			predicate: (query) => {
				// Remove queries older than 10 minutes
				return query.state.dataUpdatedAt < Date.now() - 10 * 60 * 1000;
			},
		});
	}
};

// Optional: Periodic cache cleanup
setInterval(monitorCacheSize, 2 * 60 * 1000); // Check every 2 minutes
