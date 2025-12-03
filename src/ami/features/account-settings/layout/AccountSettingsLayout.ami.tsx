import PageHeader from "@/ami/shared/components/header/PageHeader";
import { Outlet } from "react-router-dom";

const AccountSettingsLayout = () => {
	return (
		<div className="flex flex-col h-full w-full space-y-20 xl:space-y-4">
			<PageHeader pageTitle={"Account Settings"} />

			<div className="flex-1 overflow-y-auto scrollbar-hidden mt-20 xl:mt-4 pb-8">
				<Outlet />{" "}
			</div>
		</div>
	);
};

export default AccountSettingsLayout;
