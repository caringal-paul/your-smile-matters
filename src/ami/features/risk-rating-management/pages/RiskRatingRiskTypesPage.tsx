import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const RiskRatingRiskTypesPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Outlet />
		</Suspense>
	);
};

export default RiskRatingRiskTypesPage;
