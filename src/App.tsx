import { TooltipProvider } from "@radix-ui/react-tooltip";
import { RouterProvider } from "react-router-dom";
import { router } from "./ami/routes/router.ami";

function App() {
	return (
		<TooltipProvider>
			<RouterProvider router={router} />
		</TooltipProvider>
	);
}

export default App;
