import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { Tabs, TabsList, TabsTrigger } from "@/core/components/base/tabs";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/core/components/base/popover";
import { Button } from "@/core/components/base/button";
import { cn } from "@/core/lib/utils";
import ButtonArrowRightIcon from "@/ami/shared/assets/icons/ButtonArrowRightIcon";

import { TabRoute } from "@/ami/shared/types/tab-routes.types";
import { TRANSACTION_ROUTES } from "../constants/transaction.constants";

/**
 * TransactionRouteTabs
 *
 * - Renders responsive route-based tabs for transaction management pages.
 * - Works like BookingRouteTabs but uses TRANSACTION_ROUTES.
 * - Keeps URL in sync with active tab.
 */
const TransactionRouteTabs = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [isSelectPopoverOpen, setIsSelectPopoverOpen] = useState(false);

	/** Get current active tab based on current path */
	const getCurrentTab = () => {
		const currentRoute = TRANSACTION_ROUTES.find(
			(route) => route.path === location.pathname
		);
		return currentRoute?.value || "transactions";
	};

	const getCurrentTabName = () => {
		const currentRoute = TRANSACTION_ROUTES.find(
			(route) => route.path === location.pathname
		);
		return currentRoute?.name || "Transactions";
	};

	const [tab, setTab] = useState(getCurrentTab());
	const [tabName, setTabName] = useState(getCurrentTabName());

	/** Update selected tab when URL path changes */
	useEffect(() => {
		setTab(getCurrentTab());
		setTabName(getCurrentTabName());
	}, [location.pathname]);

	return (
		<div>
			{/* Desktop Tabs */}
			<div className="flex">
				<Tabs className="hidden w-full sm:flex xl:mt-0" value={tab}>
					<TabsList className="my-5 xl:my-4">
						{TRANSACTION_ROUTES.map((route: TabRoute) => (
							<TabsTrigger
								key={route.id}
								value={route.value}
								onClick={() => navigate(route.path)}
							>
								{route.name}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			</div>

			{/* Mobile Popover */}
			<div>
				<Popover
					open={isSelectPopoverOpen}
					onOpenChange={setIsSelectPopoverOpen}
				>
					<PopoverTrigger asChild>
						<Button
							className={cn(
								"mb-4 w-full justify-between shadow-none transition-none sm:hidden bg-transparent hover:bg-transparent text-primary hover:text-text-primary border-b-2 rounded-none border-primary"
							)}
						>
							{tabName} <ButtonArrowRightIcon className="text-white h-7 w-7" />
						</Button>
					</PopoverTrigger>

					<PopoverContent className="w-[var(--radix-popover-trigger-width)] bg-white p-0 sm:hidden">
						<div className="flex flex-col">
							{TRANSACTION_ROUTES.map((route: TabRoute) => (
								<button
									key={route.id}
									className={cn(
										"px-3 py-2 text-left hover:bg-muted transition-all text-xs",
										location.pathname === route.path &&
											"bg-accent font-semibold"
									)}
									onClick={() => {
										navigate(route.path);
										setIsSelectPopoverOpen(false);
									}}
								>
									{route.name}
								</button>
							))}
						</div>
					</PopoverContent>
				</Popover>
			</div>

			<Outlet />
		</div>
	);
};

export default TransactionRouteTabs;
