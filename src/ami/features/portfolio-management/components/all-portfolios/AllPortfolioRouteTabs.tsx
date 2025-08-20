import { Tabs, TabsList, TabsTrigger } from "@/core/components/base/tabs";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/core/components/base/popover";
import { Button } from "@/core/components/base/button";
import { cn } from "@/core/lib/utils";
import ButtonArrowRightIcon from "@/ami/shared/assets/icons/ButtonArrowRightIcon";
import { TabRoute } from "@/ami/shared/types/tab-routes.types";
import { ALL_PORTFOLIO_ROUTES } from "../../constants/portfolio.constants";

const AllPortfolioRouteTabs = () => {
	const navigate = useNavigate();

	const [isSelectPopoverOpen, setIsSelectPopoverOpen] = useState(false);
	const [tab, setTab] = useState("Portfolio List");

	return (
		<div>
			<div className="flex">
				<Tabs
					className="w-full hidden sm:flex xl:mt-0"
					defaultValue="portfolios"
				>
					<TabsList className="my-5 xl:my-4">
						{ALL_PORTFOLIO_ROUTES.map((route: TabRoute) => {
							return (
								<TabsTrigger
									key={route.id}
									value={route.value}
									onClick={() => navigate(route.path)}
								>
									{route.name}
								</TabsTrigger>
							);
						})}
					</TabsList>
				</Tabs>
			</div>

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
							{tab} <ButtonArrowRightIcon className="h-7 w-7 text-white" />
						</Button>
					</PopoverTrigger>

					<PopoverContent className="w-[var(--radix-popover-trigger-width)] bg-white p-0 sm:hidden">
						<div className="flex flex-col">
							{ALL_PORTFOLIO_ROUTES.map((route: TabRoute) => {
								return (
									<button
										key={route.id}
										className={cn(
											"px-3 py-2 text-left hover:bg-muted transition-all text-xs"
											// selectedRole?.id === role.id && "bg-accent font-semibold"
										)}
										onClick={() => {
											navigate(route.path);
											setIsSelectPopoverOpen(false);
											setTab(route.name);
										}}
									>
										{route.name}
									</button>
								);
							})}
						</div>
					</PopoverContent>
				</Popover>
			</div>

			<Outlet />
		</div>
	);
};

export default AllPortfolioRouteTabs;
