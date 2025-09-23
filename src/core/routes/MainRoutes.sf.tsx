import { Route } from "react-router-dom";
import MainLayout from "@/store-front/layouts/MainLayout.sf";
import HomePage from "@/store-front/features/home/pages/HomePage.sf";
import ServicePage from "@/store-front/features/service/pages/ServicePage.sf";
import PageContainer from "@/store-front/shared/components/PageContainer";
import ServiceDetailsPage from "@/store-front/features/service/pages/ServiceDetailsPage.sf";
import PackagePage from "@/store-front/features/package/pages/PackagePage";

const mainRoutes = (
	<Route path="/" element={<MainLayout />}>
		<Route index element={<HomePage />} />

		<Route element={<PageContainer />}>
			<Route path="services" element={<ServicePage />} />

			<Route
				path="services/service/:id/service-details"
				element={<ServiceDetailsPage />}
			/>

			<Route path="packages" element={<PackagePage />} />
		</Route>
	</Route>
);

export default mainRoutes;
