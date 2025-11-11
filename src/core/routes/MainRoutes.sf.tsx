import { Route } from "react-router-dom";
import MainLayout from "@/store-front/layouts/MainLayout.sf";
import HomePage from "@/store-front/features/home/pages/HomePage.sf";
import ServicePage from "@/store-front/features/service/pages/ServicePage.sf";
import PageContainer from "@/store-front/shared/components/PageContainer";
import ServiceDetailsPage from "@/store-front/features/service/pages/ServiceDetailsPage.sf";
import PackagePage from "@/store-front/features/package/pages/PackagePage";
import BookingLayout from "@/store-front/features/booking/layout/BookingLayout";
import CustomerProfileLayout from "@/store-front/features/profile/layouts/CustomerProfileLayout";
import MyBookings from "@/store-front/features/profile/components/MyBookings";
import BookingDetails from "@/store-front/features/profile/components/BookingDetails";
import MyTransactions from "@/store-front/features/profile/components/MyTransactions";
import TransactionDetails from "@/store-front/features/profile/components/TransactionDetails";
import MyBookingRequests from "@/store-front/features/profile/components/MyBookingRequests";
import BookingRequestDetails from "@/store-front/features/profile/components/BookingRequestDetails";
import MyTransactionRequests from "@/store-front/features/profile/components/MyTransactionRequests";
import TransactionRequestDetails from "@/store-front/features/profile/components/TransactionRequestDetails";
import PackageDetailsPage from "@/store-front/features/package/pages/PackageDetailsPage.sf";

const mainRoutes = (
	<Route path="/" element={<MainLayout />}>
		<Route index element={<HomePage />} />

		<Route element={<PageContainer />}>
			<Route element={<BookingLayout />}>
				<Route path="services" element={<ServicePage />} />

				<Route
					path="services/service/:id/service-details"
					element={<ServiceDetailsPage />}
				/>

				<Route path="packages" element={<PackagePage />} />

				<Route
					path="packages/package/:id/package-details"
					element={<PackageDetailsPage />}
				/>
			</Route>

			<Route path="profile" element={<CustomerProfileLayout />}>
				<Route path="edit" element={<div />} />
				<Route path="my-bookings" element={<MyBookings />} />
				<Route path="my-booking-requests" element={<MyBookingRequests />} />
				<Route
					path="my-booking-requests/request/:id/details"
					element={<BookingRequestDetails />}
				/>

				<Route
					path="my-bookings/booking/:id/details"
					element={<BookingDetails />}
				/>
				<Route path="my-transactions" element={<MyTransactions />} />
				<Route path="my-refund-requests" element={<MyTransactionRequests />} />
				<Route
					path="my-refund-requests/request/:id/details"
					element={<TransactionRequestDetails />}
				/>
				<Route
					path="my-transactions/transaction/:id/details"
					element={<TransactionDetails />}
				/>

				<Route path="reset-password" element={<div />} />
			</Route>
		</Route>
	</Route>
);

export default mainRoutes;
