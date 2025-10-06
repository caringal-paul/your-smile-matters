import { TooltipProvider } from "@radix-ui/react-tooltip";
import { RouterProvider } from "react-router-dom";
import { router } from "./core/routes/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./core/lib/react-query/react-query-client";
import { Toaster } from "./core/components/base/sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<RouterProvider router={router} />
				<Toaster richColors />
			</TooltipProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
