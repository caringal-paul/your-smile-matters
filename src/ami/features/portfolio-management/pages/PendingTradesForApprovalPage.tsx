import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const PendingTradesForApprovalPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Outlet />
		</Suspense>
	);
};

export default PendingTradesForApprovalPage;
