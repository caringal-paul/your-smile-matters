import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const TopOffersPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Outlet />
		</Suspense>
	);
};

export default TopOffersPage;
