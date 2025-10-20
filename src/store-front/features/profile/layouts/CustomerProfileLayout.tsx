import ProfileSideNav from "../components/ProfileSideNav";
import { Outlet } from "react-router-dom";

const CustomerProfileLayout = () => {
	return (
		<div className="flex flex-row gap-4 mx-auto container w-full py-8">
			<div className="w-[20%] h-fit sticky top-8">
				<ProfileSideNav />
			</div>

			<div className="flex-1 w-[80%]">
				<Outlet />
			</div>
		</div>
	);
};

export default CustomerProfileLayout;
