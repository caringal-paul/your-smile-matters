import { ElementType, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import DashboardIcon from "@/ami/shared/assets/icons/DashboardIcon";
import UserIcon from "@/ami/shared/assets/icons/UserIcon";
import CustomerIcon from "@/ami/shared/assets/icons/CustomerIcon";
import InvestmentIcon from "@/ami/shared/assets/icons/InvestmentIcon";
import TransactionIcon from "@/ami/shared/assets/icons/TransactionIcon";
import SupportIcon from "@/ami/shared/assets/icons/SupportIcon";
import AccountIcon from "@/ami/shared/assets/icons/AccountIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../../core/components/base/button";

type Module = {
	id: number;
	name: string;
	path: string;
	icon?: ElementType;
};

type NavItems = Module & { subModules?: Module[] };

const ResponsiveSidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [expandedModules, setExpandedModules] = useState<number[]>([]);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const toggleModuleExpansion = (moduleId: number) => {
		setExpandedModules((prev) =>
			prev.includes(moduleId)
				? prev.filter((id) => id !== moduleId)
				: [...prev, moduleId]
		);
	};

	const handleModuleClick = (module: NavItems) => {
		if (module.subModules && module.subModules.length > 0) {
			// If module has submodules, toggle expansion instead of navigating
			toggleModuleExpansion(module.id);
		} else {
			// If no submodules, navigate normally
			navigate(`/admin/ami/${module.path}`);
		}
	};

	const handleSubModuleClick = (subModule: Module) => {
		navigate(`/admin/ami/${subModule.path}`);
		// Close mobile menu after navigation
		if (isMobileMenuOpen) {
			setIsMobileMenuOpen(false);
		}
	};

	const isModuleExpanded = (moduleId: number) =>
		expandedModules.includes(moduleId);

	// Check if any submodule of a parent module is active

	const modules: NavItems[] = [
		{
			id: 1,
			name: "Dashboard",
			path: "dashboard",
			icon: DashboardIcon,
		},
		{
			id: 2,
			name: "User Management",
			path: "user-management",
			icon: UserIcon,
			subModules: [
				{ id: 1, name: "Users", path: "user-management/users" },
				{
					id: 2,
					name: "Roles & Permission",
					path: "user-management/roles-and-permissions",
				},
				// TODO ADD ME AGAIN
				// { id: 3, name: "Activity Log", path: "user-management/activity-logs" },
			],
		},
		// {
		// 	id: 3,
		// 	name: "Portfolio Management",
		// 	path: "portfolio-management",
		// 	icon: PortfolioIcon,
		// 	subModules: [
		// 		{
		// 			id: 1,
		// 			name: "All Portfolios",
		// 			path: "portfolio-management/portfolios",
		// 		},
		// 		{
		// 			id: 2,
		// 			name: "All Investments",
		// 			path: "portfolio-management/investments",
		// 		},
		// 		{
		// 			id: 3,
		// 			name: "Pending Trades",
		// 			path: "portfolio-management/pending-trades",
		// 		},
		// 	],
		// },
		{
			id: 4,
			name: "Customer Management",
			path: "customer-management",
			icon: CustomerIcon,
			subModules: [
				{ id: 1, name: "Customers", path: "customer-management/customers" },
				{
					id: 2,
					name: "Activity Log",
					path: "customer-management/activity-logs",
				},
			],
		},

		{
			id: 6,
			name: "Package Management",
			path: "investment-offers",
			icon: InvestmentIcon,
			subModules: [
				{
					id: 1,
					name: "Investment Listing",
					path: "investment-offers/investment-listing/fixed-income",
				},
				{
					id: 2,
					name: "Top Offers",
					path: "investment-offers/top-offers",
				},
			],
		},
		{
			id: 7,
			name: "Transaction History",
			path: "transaction-history",
			icon: TransactionIcon,
		},
		{
			id: 8,
			name: "Support Management",
			path: "support-management/faq",
			icon: SupportIcon,
		},
		{
			id: 9,
			name: "Account Settings",
			path: "account-settings",
			icon: AccountIcon,
		},
	];

	return (
		<div className="xl:sticky xl:top-0 xl:left-0 xl:h-screen xl:w-[260px] flex flex-col">
			{/* Mobile Header (only shows on mobile) - Now sticky */}
			<div className="fixed top-0 z-50 flex flex-row w-full h-16 bg-admin-background-sidebar justify-between items-center pl-1 pr-3 sm:pl-3 sm:pr-5 xl:hidden">
				<img
					id="logo"
					src="/ysm-sidebar.png"
					alt="logo"
					className="w-[100px] h-8 ml-4"
				/>
				<Button
					size="icon"
					onClick={toggleMobileMenu}
					className="rounded-full bg-button text-white"
				>
					<Menu size={24} />
				</Button>
			</div>

			{/* Sidebar Content */}
			<div
				className={`
					fixed top-0 left-0 z-50
					w-[260px] h-screen
					bg-admin-background-sidebar
					transform transition-transform duration-300 ease-in-out
					${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
					xl:relative xl:translate-x-0 xl:z-auto
					flex flex-col
				`}
			>
				{/* Scrollable Content Area */}
				<div className="flex-1 flex flex-col overflow-y-auto">
					<div className="flex flex-col p-4 pb-8 xl:pb-12 text-white h-full">
						<img
							id="logo"
							src="/ysm-sidebar.png"
							alt="logo"
							className="w-[160px] sm:w-[180px] md:w-[160px] h-14 mx-auto my-4 xl:block"
						/>
						<nav>
							<ul className="space-y-4 xl:space-y-3 xl:mt-2">
								{/* Dynamic rendering: loops through all modules and handles submodules automatically */}
								{modules.map((module) => {
									const hasSubModules =
										module.subModules && module.subModules.length > 0;
									const expanded = isModuleExpanded(module.id);

									const mainModulesName = module.path.split("/");

									return (
										<li key={module.id}>
											{/* Main Module Button */}
											<Button
												variant="sidebar"
												className={`bg-transparent hover:bg-primary-20 w-full text-xs ${
													location.pathname.includes(mainModulesName[0]) &&
													!hasSubModules
														? "bg-primary-foreground"
														: "text-white/80 border-none hover:bg-primary-20 hover:text-white"
												}
												
												`}
												onClick={() => handleModuleClick(module)}
											>
												{module.icon && (
													<module.icon className="text-white" fill={"white"} />
												)}
												{module.name}

												{hasSubModules && (
													<ChevronDown
														className={`h-4 w-4 ml-auto transition-transform duration-400 ${
															expanded && "-rotate-180"
														}`}
													/>
												)}
											</Button>

											{/* Submodules */}
											{hasSubModules && expanded && (
												<ul className="mt-2 space-y-1">
													{module.subModules!.map((subModule) => {
														const isActive =
															location.pathname
																.split("/")
																.filter(Boolean)
																.slice(0, 2)
																.join("/") ===
															subModule.path
																.split("/")
																.filter(Boolean)
																.slice(0, 2)
																.join("/");

														return (
															<li key={subModule.id}>
																<Button
																	variant="sidebar"
																	className={`bg-transparent w-full text-xs ${
																		isActive
																			? "bg-primary-foreground"
																			: "text-white/80 border-none hover:bg-primary-20 hover:text-white"
																	}`}
																	onClick={() =>
																		handleSubModuleClick(subModule)
																	}
																>
																	<span className="ml-5">{subModule.name}</span>
																</Button>
															</li>
														);
													})}
												</ul>
											)}
										</li>
									);
								})}
							</ul>
						</nav>
						{/* <Button
							variant="sidebar"
							className={`flex w-full mt-auto text-xs`}
							onClick={() => navigate(`/auth`)}
						>
							<LogoutIcon fill="white" />
							Logout
						</Button> */}
					</div>
				</div>
			</div>

			{/* Overlay for Mobile Menu */}
			{isMobileMenuOpen && (
				<div
					className="xl:hidden fixed inset-0 bg-black/50 z-30"
					onClick={toggleMobileMenu}
				/>
			)}
		</div>
	);
};

export default ResponsiveSidebar;
