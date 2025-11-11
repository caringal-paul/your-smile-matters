import PageHeader from "@/ami/shared/components/header/PageHeader";
import { Outlet } from "react-router-dom";

const AccountSettingsLayout = () => {
	return (
		<div className="flex flex-col h-full w-full space-y-20 xl:space-y-4">
			<PageHeader pageTitle={"Account Settings"} />

			<Outlet />
		</div>
	);
};

export default AccountSettingsLayout;
