import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const PackagePage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Outlet />
		</Suspense>
	);
};

export default PackagePage;
