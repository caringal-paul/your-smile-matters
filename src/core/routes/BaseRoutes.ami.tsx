import AccountSettingsPage from "@/ami/features/account-settings/pages/AccountSettingsPage.ami";
import CustomerBreadcrumbs from "@/ami/features/customer-management/components/CustomerBreadcrumbs";
import CustomerTable from "@/ami/features/customer-management/components/CustomerTable";
import CustomerPage from "@/ami/features/customer-management/pages/CustomerPage";
import DashboardPage from "@/ami/features/dashboard/pages/DashboardPage";
import FrequentlyAskedQuestionsBreadcrumbs from "@/ami/features/support-management/components/FrequentlyAskedQuestionsBreadcrumbs";
import FrequentlyAskedQuestionsForm from "@/ami/features/support-management/components/FrequentlyAskedQuestionsForm";
import FrequentlyAskedQuestionsTable from "@/ami/features/support-management/components/FrequentlyAskedQuestionsTable";
import SupportRouteTabs from "@/ami/features/support-management/components/SupportRouteTabs";
import FAQPage from "@/ami/features/support-management/pages/FAQPage";
import SupportApprovalPage from "@/ami/features/support-management/pages/SupportApprovalPage";
// import TransactionTable from "@/ami/features/transaction-history/components/TransactionTable";
// import TransactionPage from "@/ami/features/transaction-history/pages/TransactionPage";

import UserLayout from "@/ami/features/user-management/layout/UserLayout";
import UserPage from "@/ami/features/user-management/pages/UserPage";
import RootLayout from "@/ami/layouts/RootLayout.ami";
import { Route } from "react-router-dom";
import { RoleProvider } from "@/ami/features/auth/providers/RoleContext.ami";
import CustomerLayout from "@/ami/features/customer-management/layout/CustomerLayout";
import ServicePage from "@/ami/features/service-management/pages/ServicePage";
import ServiceLayout from "@/ami/features/service-management/layout/ServiceLayout";
import ServiceTable from "@/ami/features/service-management/components/ServiceTable";
import CreateServiceForm from "@/ami/features/service-management/components/CreateServiceForm";
import ServiceBreadcrumbs from "@/ami/features/service-management/components/ServiceBreadcrumbs";
import PackageLayout from "@/ami/features/package-management/layout/PackageLayout";
import PackagePage from "@/ami/features/package-management/pages/PackagePage";
import PackageTable from "@/ami/features/package-management/components/PackageTable";
import PackageBreadcrumbs from "@/ami/features/package-management/components/PackageBreadcrumbs";
import ViewPackageForm from "@/ami/features/package-management/components/ViewPackageForm";
import CreatePackageForm from "@/ami/features/package-management/components/CreatePackageForm";
import UpdatePackageForm from "@/ami/features/package-management/components/UpdatePackageForm";
import ViewUserForm from "@/ami/features/user-management/components/ViewUserForm";
import UserBreadcrumbs from "@/ami/features/user-management/components/UserBreadcrumbs";
import UpdateUserForm from "@/ami/features/user-management/components/UpdateUserForm";
import CreateUserForm from "@/ami/features/user-management/components/CreateUserForm";
import ViewCustomerForm from "@/ami/features/customer-management/components/ViewCustomerForm";
import CustomerRouteTabs from "@/ami/features/customer-management/components/CustomerRouteTabs";
import UpdateServiceForm from "@/ami/features/service-management/components/UpdateServiceForm";
import ViewServiceForm from "@/ami/features/service-management/components/ViewServiceForm";
import PhotographerLayout from "@/ami/features/photographer-management/layout/PhotographerLayout";
import PhotographerRouteTabs from "@/ami/features/photographer-management/components/PhotographerRouteTabs";
import RolesAndPermissionsLayout from "@/ami/features/role-and-permission/layout/RolesAndPermissionsLayout";
import RolesAndPermissionsPage from "@/ami/features/role-and-permission/pages/RolesAndPermissionsPage";
import RolesAndPermissionsBreadcrumbs from "@/ami/features/role-and-permission/components/RolesAndPermissionsBreadcrumbs";
import RolesAndPermissionsForm from "@/ami/features/role-and-permission/components/RolesAndPermissionsForm";
import PhotographerPage from "@/ami/features/photographer-management/pages/PhotographerPage";
import PhotographerTable from "@/ami/features/photographer-management/components/PhotographerTable";
import PhotographerBreadcrumbs from "@/ami/features/photographer-management/components/PhotographerBreadcrumbs";
import ViewPhotographerForm from "@/ami/features/photographer-management/components/VIewPhotographerForm";
import CreatePhotographerForm from "@/ami/features/photographer-management/components/CreatePhotographerForm";
import UpdatePhotographerForm from "@/ami/features/photographer-management/components/UpdatePhotographerForm";
import AmiBookingLayout from "@/ami/features/booking-management/layout/BookingLayout.ami";
import BookingPage from "@/ami/features/booking-management/pages/BookingPage";
import BookingTable from "@/ami/features/booking-management/components/BookingTable";
import BookingBreadcrumbs from "@/ami/features/booking-management/components/BookingBreadcrumbs";
import ViewBookingForm from "@/ami/features/booking-management/components/ViewBookingForm";
import TransactionLayout from "@/ami/features/transaction-history/layout/TransactionLayout";
import TransactionPage from "@/ami/features/transaction-history/pages/TransactionPage";
import TransactionTable from "@/ami/features/transaction-history/components/TransactionTable";
import TransactionBreadcrumbs from "@/ami/features/transaction-history/components/TransactionBreadcrumbs";
import ViewTransactionForm from "@/ami/features/transaction-history/components/ViewTransactionForm";

const selectedRole = {
	_id: "68a004a613451d2e9d4cb517",
	name: "Manager",
	description: "Management level access with approval rights",
	permissions: [
		"user:read",
		"user:update",
		"customer:create",
		"customer:read",
		"customer:update",
		"customer:approve",
		"product:create",
		"product:read",
		"product:update",
		"product:approve",
		"order:read",
		"order:update",
		"order:approve",
		"report:read",
	],
};

const baseRoutes = (
	<Route path="ami" element={<RootLayout />}>
		{/* DASHBOARD */}
		<Route path="dashboard" element={<div />}>
			<Route index element={<DashboardPage />} />
		</Route>

		{/* USER MODULE */}
		<Route path="user-management" element={<UserLayout />}>
			<Route path="users" element={<UserPage />} />

			<Route element={<UserBreadcrumbs />}>
				<Route path="users/create/user" element={<CreateUserForm />} />
				<Route path="users/edit/user/:id" element={<UpdateUserForm />} />
				<Route path="users/view/user/:id" element={<ViewUserForm />} />
			</Route>

			<Route path="activity-logs" element={<div />} />
		</Route>

		{/* ROLE MODULE */}
		<Route
			path="role-and-permission-management/roles-and-permissions"
			element={<RolesAndPermissionsLayout />}
		>
			<Route index element={<RolesAndPermissionsPage />} />

			<Route element={<RolesAndPermissionsBreadcrumbs />}>
				<Route
					path="edit/:id"
					element={
						<RoleProvider>
							<RolesAndPermissionsForm />
						</RoleProvider>
					}
				/>
			</Route>
		</Route>

		{/* CUSTOMER MODULE */}
		<Route path="customer-management" element={<CustomerLayout />}>
			<Route element={<CustomerRouteTabs />}>
				<Route path="customers" element={<CustomerPage />}>
					<Route index element={<CustomerTable />} />
					<Route path="activity-log" element={<div />} />
				</Route>
			</Route>

			<Route element={<CustomerBreadcrumbs />}>
				<Route
					path="customers/view/customer/:id"
					element={<ViewCustomerForm />}
				/>
			</Route>
		</Route>

		{/* PHOTOGRAPHER MODULE */}
		<Route path="photographer-management" element={<PhotographerLayout />}>
			<Route element={<PhotographerRouteTabs />}>
				<Route path="photographers" element={<PhotographerPage />}>
					<Route index element={<PhotographerTable />} />
				</Route>

				<Route path="photographers/for-approval" element={<div />}>
					<Route index element={<div />} />
				</Route>
			</Route>

			<Route element={<PhotographerBreadcrumbs />}>
				<Route
					path="photographers/create/photographer"
					element={<CreatePhotographerForm />}
				/>
				<Route
					path="photographers/edit/photographer/:id"
					element={<UpdatePhotographerForm />}
				/>
				<Route
					path="photographers/view/photographer/:id"
					element={<ViewPhotographerForm />}
				/>
			</Route>
		</Route>

		{/* SERVICE MODULE */}
		<Route path="service-management" element={<ServiceLayout />}>
			<Route path="services" element={<ServicePage />}>
				<Route index element={<ServiceTable />} />
			</Route>

			<Route element={<ServiceBreadcrumbs />}>
				<Route
					path="services/create/service/"
					element={<CreateServiceForm />}
				/>
				<Route path="services/view/service/:id" element={<ViewServiceForm />} />
				<Route
					path="services/edit/service/:id"
					element={<UpdateServiceForm />}
				/>
			</Route>
		</Route>

		{/* PACKAGE MODULE */}
		<Route path="package-management" element={<PackageLayout />}>
			<Route path="packages" element={<PackagePage />}>
				<Route index element={<PackageTable />} />
			</Route>

			<Route element={<PackageBreadcrumbs />}>
				<Route path="packages/create/package" element={<CreatePackageForm />} />
				<Route path="packages/view/package/:id" element={<ViewPackageForm />} />
				<Route
					path="packages/edit/package/:id"
					element={<UpdatePackageForm />}
				/>
			</Route>
		</Route>

		{/* TRANSACTION MODULE */}
		<Route path="transaction-history" element={<TransactionLayout />}>
			<Route path="transactions" element={<TransactionPage />}>
				<Route index element={<TransactionTable />} />
			</Route>

			<Route element={<TransactionBreadcrumbs />}>
				<Route path="transactions/create/transaction" element={<div />} />
				<Route
					path="transactions/view/transaction/:id"
					element={<ViewTransactionForm />}
				/>
				<Route path="transactions/edit/transaction/:id" element={<div />} />
			</Route>
		</Route>

		{/* BOOKING MODULE */}
		<Route path="booking-management" element={<AmiBookingLayout />}>
			<Route path="bookings" element={<BookingPage />}>
				<Route index element={<BookingTable />} />
			</Route>

			<Route element={<BookingBreadcrumbs />}>
				<Route path="bookings/create/booking" element={<div />} />
				<Route path="bookings/view/booking/:id" element={<ViewBookingForm />} />
				<Route path="bookings/edit/booking/:id" element={<div />} />
			</Route>
		</Route>

		{/* SUPPORT MODULE */}
		<Route path="support-management" element={<div />}>
			<Route element={<SupportRouteTabs />}>
				<Route path="faq" element={<FAQPage />}>
					<Route index element={<FrequentlyAskedQuestionsTable />} />
				</Route>

				<Route path="for-approval" element={<SupportApprovalPage />} />
			</Route>

			<Route element={<FrequentlyAskedQuestionsBreadcrumbs />}>
				<Route
					path="faq/view/question/:id"
					element={
						<FrequentlyAskedQuestionsForm
							cancelButtonLabel="Cancel"
							submitButtonLabel="Save Changes"
						/>
					}
				/>
				<Route
					path="faq/edit/question/:id"
					element={
						<FrequentlyAskedQuestionsForm
							cancelButtonLabel="Cancel"
							submitButtonLabel="Save Changes"
						/>
					}
				/>
			</Route>
		</Route>

		{/* ACCOUNT SETTINGS */}
		<Route path="account-settings" element={<div />}>
			<Route index element={<AccountSettingsPage />} />
		</Route>
	</Route>
);

export default baseRoutes;
