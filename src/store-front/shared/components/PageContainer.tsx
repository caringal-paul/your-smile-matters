import { Outlet } from "react-router-dom";
import PageHeader from "./PageHeader";

const PageContainer = () => {
	return (
		<div className="space-y-4 bg-sf-background">
			<PageHeader />

			<Outlet />
		</div>
	);
};

export default PageContainer;
