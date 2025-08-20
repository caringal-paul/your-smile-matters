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
import { VIEW_CUSTOMER_PORTFOLIO_ROUTES } from "../../constants/portfolio.constants";
import TableIcon from "@/ami/shared/assets/icons/TableIcon";
import { Separator } from "@/core/components/base/separator";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";
import { Customer } from "../../../customer-management/utils/types/customer-table.types";
import { CustomerInfo } from "./CustomerInfo";
import { ActivityLog } from "@/ami/shared/types/logs.types";
import activityLogs from "../../mock/all-portfolios/temp-portfolio-logs.json";
import { ActivityLogTable } from "@/ami/shared/components/custom/table/ActivityLogTable";

const ViewCustomerPortfolio = () => {
	const [searchText, setSearchText] = useState("");
	const logs = activityLogs as unknown;

	const activityLogsData = logs as ActivityLog[];

	const customer: Customer = {
		id: 660003,
		first_name: "Ngozi",
		surname: "Kelechi",
		email: "ngozikelechi@email.com",
		mobile_number: "+234 201 335 3131",
		status: true,
		portfolio_balance: 0,
		created_on: "2025-06-01T14:14:00.000Z",
	};

	return (
		<div className="relative">
			<div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
				<CustomerPortfolioTabs />
				<TableSearch
					value={searchText}
					onChange={setSearchText}
					className="sm:max-w-full md:max-w-full sm:w-full md:w-full lg:w-80 xl:w-60 2xl:w-80"
				/>
			</div>

			<Separator orientation="horizontal" className="bg-accent mt-4 md:my-6" />

			<div className="flex flex-col gap-0 pb-4">
				<Outlet context={{ searchText }} />
				<CustomerInfo data={customer} />
				<div className="mt-6">
					<ActivityLogTable data={activityLogsData} />
				</div>{" "}
			</div>
		</div>
	);
};

const CustomerPortfolioTabs = () => {
	const navigate = useNavigate();

	const [isSelectPopoverOpen, setIsSelectPopoverOpen] = useState(false);
	const [tab, setTab] = useState("Fixed Income");

	return (
		<>
			<div className="flex">
				<Tabs className="w-full hidden lg:flex" defaultValue="fixed-income">
					<TabsList className="border-none">
						{VIEW_CUSTOMER_PORTFOLIO_ROUTES.map((route: TabRoute) => {
							return (
								<TabsTrigger
									key={route.id}
									value={route.value}
									onClick={() => navigate(route.path)}
									className="data-[state=active]:text-avatar data-[state=active]:border-avatar border-0 data-[state=active]:border-b-2"
								>
									<TableIcon className="h-4 w-4 mr-2" />
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
								"w-full mb-4 lg:mb-0 justify-between shadow-none transition-none lg:hidden bg-transparent hover:bg-transparent text-avatar hover:text-text-primary border-b-2 rounded-none border-avatar"
							)}
						>
							<div className="flex items-center">
								<TableIcon className="h-4 w-4 mr-2" />
								{tab}
							</div>{" "}
							<ButtonArrowRightIcon className="h-7 w-7 text-avatar" />
						</Button>
					</PopoverTrigger>

					<PopoverContent className="w-[var(--radix-popover-trigger-width)] bg-white p-0 sm:hidden">
						<div className="flex flex-col">
							{VIEW_CUSTOMER_PORTFOLIO_ROUTES.map((route: TabRoute) => {
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
		</>
	);
};

export default ViewCustomerPortfolio;
