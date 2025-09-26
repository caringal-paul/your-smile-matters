import { Outlet } from "react-router-dom";

const CustomerAuthLayout = () => {
	return (
		<div className="flex bg-background max-h-screen max-w-screen w-full h-screen">
			<Outlet />
		</div>
	);
};

export default CustomerAuthLayout;
