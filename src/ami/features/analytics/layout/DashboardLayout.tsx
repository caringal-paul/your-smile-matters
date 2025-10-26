import PageHeader from "@/ami/shared/components/header/PageHeader";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
	return (
		<div className="flex flex-col h-full w-full space-y-20 xl:space-y-4 bg-background">
			<PageHeader pageTitle="Dashboard" />

			<div className="flex-1 overflow-y-auto scrollbar-hidden">
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardLayout;
