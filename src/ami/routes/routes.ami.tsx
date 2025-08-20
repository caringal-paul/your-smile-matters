import { Outlet, Route } from "react-router-dom";
import authRoutes from "./AuthRoutes.ami";
import baseRoutes from "./BaseRoutes.ami";

export const routes = (
	<>
		<Route
			path="/admin"
			element={
				<div>
					<Outlet />
				</div>
			}
		>
			{authRoutes}
			{baseRoutes}
		</Route>
	</>
);
