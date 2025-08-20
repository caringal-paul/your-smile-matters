import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const InvestmentListingCommodityPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Outlet />
		</Suspense>
	);
};

export default InvestmentListingCommodityPage;
