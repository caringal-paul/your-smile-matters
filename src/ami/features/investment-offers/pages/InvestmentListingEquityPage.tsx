import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const InvestmentListingEquityPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Outlet />
		</Suspense>
	);
};

export default InvestmentListingEquityPage;
