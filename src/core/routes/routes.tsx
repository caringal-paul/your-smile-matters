import { Outlet, Route } from "react-router-dom";
import authRoutes from "./AuthRoutes.ami";
import baseRoutes from "./BaseRoutes.ami";
import mainRoutes from "./MainRoutes.sf";
import sfAuthRoutes from "./AuthRoutes.sf";

import { PathTracker } from "@/store-front/shared/components/PathTracker";

export const routes = (
	<>
		<Route
			path="/admin"
			element={
				<div className="font-poppins">
					<Outlet />
				</div>
			}
		>
			{authRoutes}
			{baseRoutes}
		</Route>

		<Route
			path="/"
			element={
				<div className="font-inter">
					<PathTracker />
					<Outlet />
				</div>
			}
		>
			{sfAuthRoutes}
			{mainRoutes}
		</Route>
	</>
);
