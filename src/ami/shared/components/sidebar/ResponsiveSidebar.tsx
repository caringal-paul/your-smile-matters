import { ElementType, useState } from "react";
import {
	BookCopy,
	Box,
	Boxes,
	Calendar,
	Camera,
	ChevronDown,
	Hand,
	LayoutDashboard,
	Menu,
	MessagesSquare,
	Settings,
	UserRound,
	UsersRound,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../core/components/base/button";

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
			icon: LayoutDashboard,
		},
		{
			id: 2,
			name: "User Management",
			path: "user-management/users",
			icon: UserRound,
		},
		// {
		// 	id: 10,
		// 	name: "Roles & Permission",
		// 	path: "role-and-permission-management/roles-and-permissions",
		// 	icon: Hand,
		// },
		{
			id: 3,
			name: "Customer Management",
			path: "customer-management/customers",
			icon: UsersRound,
		},
		{
			id: 11,
			name: "Photographer Management",
			path: "photographer-management/photographers",
			icon: Camera,
		},
		{
			id: 4,
			name: "Service Management",
			path: "service-management/services",
			icon: Box,
		},
		{
			id: 5,
			name: "Package Management",
			path: "package-management/packages",
			icon: Boxes,
		},
		{
			id: 6,
			name: "Transaction History",
			path: "transaction-history",
			icon: BookCopy,
		},
		{
			id: 7,
			name: "Customer Bookings",
			path: "booking-management",
			icon: Calendar,
		},
		// {
		// 	id: 8,
		// 	name: "Support Management",
		// 	path: "support-management/faq",
		// 	icon: MessagesSquare,
		// },
		{
			id: 9,
			name: "Account Settings",
			path: "account-settings",
			icon: Settings,
		},
	];

	return (
		<div className="xl:sticky xl:top-0 xl:left-0 xl:h-screen xl:w-[260px] flex flex-col">
			{/* Mobile Header (only shows on mobile) - Now sticky */}
			<div className="fixed top-0 z-50 flex flex-row items-center justify-between w-full h-16 pl-1 pr-3 bg-admin-background-sidebar sm:pl-3 sm:pr-5 xl:hidden">
				<img
					id="logo"
					src="/ysm-sidebar.png"
					alt="logo"
					className="w-[100px] h-8 ml-4"
				/>
				<Button
					size="icon"
					onClick={toggleMobileMenu}
					className="text-white rounded-full bg-button"
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
				<div className="flex flex-col flex-1 overflow-y-auto">
					<div className="flex flex-col h-full p-4 pb-8 text-white xl:pb-12">
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
												variant="admin_sidebar"
												className={`bg-transparent hover:bg-admin-primary-hover w-full text-xs ${
													location.pathname.includes(mainModulesName[0]) &&
													!hasSubModules
														? "bg-admin-primary hover:bg-admin-primary-hover"
														: "text-white/80 border-none hover:bg-admin-primary-hover hover:text-white"
												}
												
												`}
												onClick={() => handleModuleClick(module)}
											>
												{module.icon && <module.icon className="text-white" />}
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
																.slice(0, 4)
																.join("/") ===
															`admin/ami/${subModule.path
																.split("/")
																.filter(Boolean)
																.slice(0, 4)
																.join("/")}`;

														return (
															<li key={subModule.id}>
																<Button
																	variant="admin_sidebar"
																	className={` w-full text-xs ${
																		isActive
																			? "bg-admin-primary hover:bg-admin-primary-hover"
																			: "text-white/80 border-none bg-transparent hover:bg-admin-primary-hover hover:text-white"
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
					className="fixed inset-0 z-30 xl:hidden bg-black/50"
					onClick={toggleMobileMenu}
				/>
			)}
		</div>
	);
};

export default ResponsiveSidebar;
