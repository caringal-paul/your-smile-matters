import PageHeader from "@/ami/shared/components/header/PageHeader";
import { Outlet } from "react-router-dom";

const TransactionLayout = () => {
	return (
		<div className="flex flex-col h-full w-full space-y-4 sm:space-y-0">
			<PageHeader pageTitle="Transaction History" />

			<div className="flex-1 overflow-y-auto scrollbar-hidden">
				<Outlet />
			</div>
		</div>
	);
};

export default TransactionLayout;
