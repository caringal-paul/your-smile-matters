import { Outlet } from "react-router-dom";
import ResponsiveSidebar from "../shared/components/custom/sidebar/ResponsiveSidebar";

const RootLayout = () => {
	return (
		<div className="relative xl:flex min-h-screen w-screen overflow-hidden">
			<ResponsiveSidebar />

			<div className="relative flex flex-col w-full h-screen p-4 xl:px-12 xl:pt-12 xl:pb-0">
				<Outlet />
			</div>
		</div>
	);
};

export default RootLayout;
