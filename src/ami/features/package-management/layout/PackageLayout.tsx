import PageHeader from "@/ami/shared/components/header/PageHeader";
import { Outlet } from "react-router-dom";

const PackageLayout = () => {
	return (
		<div className="flex flex-col w-full h-full space-y-20 xl:space-y-4">
			<PageHeader pageTitle="Package Management" />

			<div className="flex-1 mt-20 overflow-y-auto scrollbar-hidden xl:mt-4">
				<Outlet />
			</div>
		</div>
	);
};

export default PackageLayout;
