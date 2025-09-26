import PageHeader from "@/ami/shared/components/header/PageHeader";
import { Outlet } from "react-router-dom";

const AccountSettingsLayout = () => {
	return (
		<div className="h-full w-full space-y-4 sm:space-y-8">
			<PageHeader pageTitle={"Account Settings"} />

			{/* COMPONENTS BASED ON CURRENT PATH */}
			<Outlet />
		</div>
	);
};

export default AccountSettingsLayout;
