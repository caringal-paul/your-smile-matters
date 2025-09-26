import { Outlet } from "react-router-dom";
import ResponsiveSidebar from "../shared/components/sidebar/ResponsiveSidebar";

const RootLayout = () => {
	return (
		<div className="relative w-screen min-h-screen overflow-hidden xl:flex">
			<ResponsiveSidebar />

			<div className="relative flex flex-col w-full h-screen p-4 xl:px-12 xl:pt-12 xl:pb-0">
				<Outlet />
			</div>
		</div>
	);
};

export default RootLayout;
