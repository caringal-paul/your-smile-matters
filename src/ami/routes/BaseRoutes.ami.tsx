import AccountSettingsLayout from "@/ami/features/account-settings/layout/AccountSettingsLayout.ami";
import AccountSettingsPage from "@/ami/features/account-settings/pages/AccountSettingsPage.ami";
import { RoleProvider } from "@/ami/features/auth/providers/RoleContext.ami";
import CustomerBreadcrumbs from "@/ami/features/customer-management/components/CustomerBreadcrumbs";
import CustomerForm from "@/ami/features/customer-management/components/CustomerForm";
import CustomerRouteTabs from "@/ami/features/customer-management/components/CustomerRouteTabs";
import CustomerTable from "@/ami/features/customer-management/components/CustomerTable";
import CustomerLayout from "@/ami/features/customer-management/layout/CustomerLayout";
import CustomerActivityLogsPage from "@/ami/features/customer-management/pages/CustomerActivityLogsPage";
import CustomerApprovalPage from "@/ami/features/customer-management/pages/CustomerApprovalPage";
import CustomerPage from "@/ami/features/customer-management/pages/CustomerPage";
import DashboardLayout from "@/ami/features/dashboard/layout/DashboardLayout";
import DashboardPage from "@/ami/features/dashboard/pages/DashboardPage";
import InvestmentListingFixedIncomeTable from "@/ami/features/investment-offers/components/InvestmentListingFixedIncomeTable";
import InvestmentListingRouteTabs from "@/ami/features/investment-offers/components/InvestmentListingRouteTabs";
import InvestmentOfferDetailsBreadcrumbs from "@/ami/features/investment-offers/components/InvestmentOfferDetailsBreadcrumbs";
import InvestmentOfferDetailsCommodityForm from "@/ami/features/investment-offers/components/InvestmentOfferDetailsCommodityForm";
import InvestmentOfferDetailsEquityForm from "@/ami/features/investment-offers/components/InvestmentOfferDetailsEquityForm";
import InvestmentOfferDetailsFixedIncomeForm from "@/ami/features/investment-offers/components/InvestmentOfferDetailsFixedIncomeForm";
import InvestmentListingCommodityTable from "@/ami/features/investment-offers/components/InvsetmentListingCommodityTable";
import InvestmentListingEquityTable from "@/ami/features/investment-offers/components/InvsetmentListingEquityTable";
import InvsetmentListingForApprovalTable from "@/ami/features/investment-offers/components/InvsetmentListingForApprovalTable";
import TopOffersTable from "@/ami/features/investment-offers/components/TopOffersTable";
import InvestmentOffersLayout from "@/ami/features/investment-offers/layout/InvestmentOffersLayout";
import InvestmentListingCommodityPage from "@/ami/features/investment-offers/pages/InvestmentListingCommodityPage";
import InvestmentListingEquityPage from "@/ami/features/investment-offers/pages/InvestmentListingEquityPage";
import InvestmentListingFixedIncomePage from "@/ami/features/investment-offers/pages/InvestmentListingFixedIncomePage";
import InvestmentListingForApprovalPage from "@/ami/features/investment-offers/pages/InvestmentListingForApprovalPage";
import TopOffersPage from "@/ami/features/investment-offers/pages/TopOffersPage";
import AllInvestmentFormBreadcrumb from "@/ami/features/portfolio-management/components/all-investments/AllInvestmentFormBreadcrumb";
import AllInvestmentTable from "@/ami/features/portfolio-management/components/all-investments/AllInvestmentTable";
import { ViewInvestmentDetails } from "@/ami/features/portfolio-management/components/all-investments/ViewInvestmentDetails";
import AllPortfolioFormBreadcrumbs from "@/ami/features/portfolio-management/components/all-portfolios/AllPortfolioFormBreadcrumbs";
import AllPortfolioRouteTabs from "@/ami/features/portfolio-management/components/all-portfolios/AllPortfolioRouteTabs";
import AllPortfolioTable from "@/ami/features/portfolio-management/components/all-portfolios/AllPortfolioTable";
import CommodityTable from "@/ami/features/portfolio-management/components/all-portfolios/CommodityTable";
import EquityTable from "@/ami/features/portfolio-management/components/all-portfolios/EquityTable";
import PortfolioFixedIncomeTable from "@/ami/features/portfolio-management/components/all-portfolios/FixedIncomeTable";
import ManagedPortfolioTable from "@/ami/features/portfolio-management/components/all-portfolios/ManagedPortfolioTable";
import PortfolioForApprovalTable from "@/ami/features/portfolio-management/components/all-portfolios/PortfolioForApprovalTable";
import RiskProfileAnswerSummaryPage from "@/ami/features/portfolio-management/components/all-portfolios/RiskProfileAnswerSummary";
import TransactionHistoryTable from "@/ami/features/portfolio-management/components/all-portfolios/TransactionHistoryTable";
import ViewCustomerPortfolio from "@/ami/features/portfolio-management/components/all-portfolios/ViewCustomerPortfolio";
import PendingTradesForApprovalTable from "@/ami/features/portfolio-management/components/pending-trades/PendingTradesForApprovalTable";
import PendingTradeRouteTabs from "@/ami/features/portfolio-management/components/pending-trades/PendingTradesRouteTabs";
import PendingTradesTable from "@/ami/features/portfolio-management/components/pending-trades/PendingTradesTable";
import PortfolioLayout from "@/ami/features/portfolio-management/layout/PortfolioLayout";
import AllInvestmentPage from "@/ami/features/portfolio-management/pages/AllInvestmentPage";
import AllPortfolioForApprovalPage from "@/ami/features/portfolio-management/pages/AllPortfolioForApprovalPage";
import AllPortfolioPage from "@/ami/features/portfolio-management/pages/AllPortfolioPage";
import PendingTradesForApprovalPage from "@/ami/features/portfolio-management/pages/PendingTradesForApprovalPage";
import PendingTradesPage from "@/ami/features/portfolio-management/pages/PendingTradesPage";
import RiskRatingQuestionnaireForApprovalTable from "@/ami/features/risk-rating-management/components/RiskRatingQuestionnaireForApprovalTable";
import RiskRatingQuestionnaireForm from "@/ami/features/risk-rating-management/components/RiskRatingQuestionnaireForm";
import RiskRatingQuestionnaireRouteTabs from "@/ami/features/risk-rating-management/components/RiskRatingQuestionnaireRouteTabs";
import RiskRatingQuestionnaireTable from "@/ami/features/risk-rating-management/components/RiskRatingQuestionnaireTable";
import RiskRatingRiskTypesForApprovalTable from "@/ami/features/risk-rating-management/components/RiskRatingRiskTypesForApprovalTable";
import RiskRatingRiskTypesForm from "@/ami/features/risk-rating-management/components/RiskRatingRiskTypesForm";
import RiskRatingRiskTypesRouteTabs from "@/ami/features/risk-rating-management/components/RiskRatingRiskTypesRouteTabs";
import RiskRatingRiskTypesTable from "@/ami/features/risk-rating-management/components/RiskRatingRiskTypesTable";
import RiskRatingLayout from "@/ami/features/risk-rating-management/layout/RiskRatingLayout";
import RiskRatingQuestionnairePage from "@/ami/features/risk-rating-management/pages/RiskRatingQuestionnairePage";
import RiskRatingRiskTypesPage from "@/ami/features/risk-rating-management/pages/RiskRatingRiskTypesPage";
import FrequentlyAskedQuestionsBreadcrumbs from "@/ami/features/support-management/components/FrequentlyAskedQuestionsBreadcrumbs";
import FrequentlyAskedQuestionsForm from "@/ami/features/support-management/components/FrequentlyAskedQuestionsForm";
import FrequentlyAskedQuestionsTable from "@/ami/features/support-management/components/FrequentlyAskedQuestionsTable";
import SupportRouteTabs from "@/ami/features/support-management/components/SupportRouteTabs";
import SupportLayout from "@/ami/features/support-management/layout/SupportLayout";
import FAQPage from "@/ami/features/support-management/pages/FAQPage";
import SupportApprovalPage from "@/ami/features/support-management/pages/SupportApprovalPage";
import TransactionTable from "@/ami/features/transaction-history/components/TransactionTable";
import TransactionLayout from "@/ami/features/transaction-history/layout/TransactionLayout";
import TransactionPage from "@/ami/features/transaction-history/pages/TransactionPage";
import UserForm from "@/ami/features/user-management/components/UserForm";
import UserLayout from "@/ami/features/user-management/layout/UserLayout";
import RolesAndPermissionsPage from "@/ami/features/user-management/pages/RolesAndPermissionsPage";
import UserActivityLogsPage from "@/ami/features/user-management/pages/UserActivityLogsPage";
import UserPage from "@/ami/features/user-management/pages/UserPage";
import RootLayout from "@/ami/layouts/RootLayout.ami";
import { Route } from "react-router-dom";
import TestComponent from "../shared/components/TestComponent";

const baseRoutes = (
	<Route path="ami" element={<RootLayout />}>
		{/* DASHBOARD */}

		<Route path="test" element={<TestComponent />} />

		<Route path="dashboard" element={<div />}>
			<Route index element={<DashboardPage />} />
		</Route>

		{/* USER MODULE */}
		<Route path="user-management" element={<UserLayout />}>
			<Route path="users" element={<UserPage />} />
			<Route path="users/edit/user/:id" element={<UserForm />} />
			<Route path="users/view/user/:id" element={<UserForm />} />

			<Route
				path="roles-and-permissions"
				element={
					<RoleProvider>
						{/* <RolesAndPermissionsPage /> */}
						<div />
					</RoleProvider>
				}
			/>
			<Route path="activity-logs" element={<div />} />
		</Route>

		{/* PORTFOLIO MODULE */}
		<Route path="portfolio-management" element={<div />}>
			<Route element={<AllPortfolioRouteTabs />}>
				<Route path="portfolios" element={<AllPortfolioPage />}>
					<Route index element={<AllPortfolioTable />} />
				</Route>
				<Route
					path="portfolios/for-approval"
					element={<AllPortfolioForApprovalPage />}
				>
					<Route index element={<PortfolioForApprovalTable />} />
				</Route>
			</Route>

			<Route element={<AllPortfolioFormBreadcrumbs />}>
				<Route
					path="portfolios/view/portfolio/:portfolio_id/customer/:customer_id/"
					element={<ViewCustomerPortfolio />}
				>
					<Route path="fixed-income" element={<PortfolioFixedIncomeTable />} />
					<Route path="equities" element={<EquityTable />} />
					<Route path="commodities" element={<CommodityTable />} />
					<Route path="managed-portfolio" element={<ManagedPortfolioTable />} />
				</Route>
				<Route
					path="portfolios/view/portfolio/:portfolio_id/customer/:customer_id/equities/investment/:investment_id/transactions"
					element={<TransactionHistoryTable />}
				/>
				<Route
					path="portfolios/view/portfolio/:portfolio_id/customer/:customer_id/commodities/investment/:investment_id/transactions"
					element={<TransactionHistoryTable />}
				/>
				<Route
					path="portfolios/view/portfolio/:portfolio_id/customer/:customer_id/managed-portfolio/risk-profile-answers-summary"
					element={<RiskProfileAnswerSummaryPage />}
				/>
			</Route>

			<Route path="investments" element={<AllInvestmentPage />}>
				<Route index element={<AllInvestmentTable />} />

				<Route element={<AllInvestmentFormBreadcrumb />}>
					<Route
						path="view/investment/:id"
						element={<ViewInvestmentDetails />}
					/>
				</Route>
			</Route>

			<Route element={<PendingTradeRouteTabs />}>
				<Route path="pending-trades" element={<PendingTradesPage />}>
					<Route index element={<PendingTradesTable />} />
				</Route>
				<Route
					path="pending-trades/for-approval"
					element={<PendingTradesForApprovalPage />}
				>
					<Route index element={<PendingTradesForApprovalTable />} />
				</Route>
			</Route>
		</Route>

		{/* CUSTOMER MODULE */}
		<Route path="customer-management" element={<div />}>
			<Route element={<CustomerRouteTabs />}>
				<Route path="customers" element={<CustomerPage />}>
					<Route index element={<CustomerTable />} />
				</Route>

				<Route
					path="customers/for-approval"
					element={<CustomerApprovalPage />}
				/>
			</Route>

			<Route path="activity-logs" element={<div />} />

			<Route element={<CustomerBreadcrumbs />}>
				<Route path="customers/view/customer/:id" element={<CustomerForm />} />
				<Route path="customers/edit/customer/:id" element={<CustomerForm />} />
			</Route>
		</Route>

		{/* RISK RATING MODULE */}
		<Route path="risk-rating-management" element={<div />}>
			<Route path="questionnaires" element={<RiskRatingQuestionnairePage />}>
				<Route element={<RiskRatingQuestionnaireRouteTabs />}>
					<Route index element={<RiskRatingQuestionnaireTable />} />
					<Route
						path={"for-approval"}
						element={<RiskRatingQuestionnaireForApprovalTable />}
					/>
				</Route>

				<Route
					path="add/risk-rating-question"
					element={<RiskRatingQuestionnaireForm />}
				/>
				<Route
					path="view/risk-rating-question/:id"
					element={<RiskRatingQuestionnaireForm />}
				/>
				<Route
					path="edit/risk-rating-question/:id"
					element={<RiskRatingQuestionnaireForm />}
				/>
			</Route>

			<Route path="risk-types" element={<RiskRatingRiskTypesPage />}>
				<Route element={<RiskRatingRiskTypesRouteTabs />}>
					<Route index element={<RiskRatingRiskTypesTable />} />

					<Route
						path={"for-approval"}
						element={<RiskRatingRiskTypesForApprovalTable />}
					/>
				</Route>

				<Route
					path="view/risk-type/:portfolio_class"
					element={<RiskRatingRiskTypesForm />}
				/>
				<Route
					path="edit/risk-type/:portfolio_class"
					element={<RiskRatingRiskTypesForm />}
				/>
			</Route>
		</Route>

		{/* INVESTMENT MODULE */}
		<Route path="investment-offers" element={<InvestmentOffersLayout />}>
			<Route path="investment-listing" element={<InvestmentListingRouteTabs />}>
				<Route
					path="fixed-income"
					element={<InvestmentListingFixedIncomePage />}
				>
					<Route index element={<InvestmentListingFixedIncomeTable />} />
				</Route>

				<Route path="equities" element={<InvestmentListingEquityPage />}>
					<Route index element={<InvestmentListingEquityTable />} />
				</Route>

				<Route path="commodities" element={<InvestmentListingCommodityPage />}>
					<Route index element={<InvestmentListingCommodityTable />} />
				</Route>

				<Route
					path="for-approval"
					element={<InvestmentListingForApprovalPage />}
				>
					<Route index element={<InvsetmentListingForApprovalTable />} />
				</Route>
			</Route>

			<Route element={<InvestmentOfferDetailsBreadcrumbs />}>
				<Route
					path="investment-listing/investment/view/fixed-income/:id"
					element={<InvestmentOfferDetailsFixedIncomeForm />}
				/>
				<Route
					path="investment-listing/investment/edit/fixed-income/:id"
					element={<InvestmentOfferDetailsFixedIncomeForm />}
				/>
				<Route
					path="investment-listing/investment/add/fixed-income"
					element={<InvestmentOfferDetailsFixedIncomeForm />}
				/>

				<Route
					path="investment-listing/investment/view/commodity/:id"
					element={<InvestmentOfferDetailsCommodityForm />}
				/>
				<Route
					path="investment-listing/investment/edit/commodity/:id"
					element={<InvestmentOfferDetailsCommodityForm />}
				/>
				<Route
					path="investment-listing/investment/add/commodity"
					element={<InvestmentOfferDetailsCommodityForm />}
				/>

				<Route
					path="investment-listing/investment/view/equity/:id"
					element={<InvestmentOfferDetailsEquityForm />}
				/>
				<Route
					path="investment-listing/investment/edit/equity/:id"
					element={<InvestmentOfferDetailsEquityForm />}
				/>
			</Route>

			<Route path="top-offers" element={<TopOffersPage />}>
				<Route index element={<TopOffersTable />} />
			</Route>
		</Route>

		{/* TRANSACTION MODULE */}
		<Route path="transaction-history" element={<div />}>
			<Route element={<TransactionPage />}>
				<Route index element={<TransactionTable />} />
			</Route>
		</Route>

		{/* SUPPORT MODULE */}
		<Route path="support-management" element={<SupportLayout />}>
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
		<Route path="account-settings" element={<AccountSettingsLayout />}>
			<Route index element={<AccountSettingsPage />} />
		</Route>
	</Route>
);

export default baseRoutes;
