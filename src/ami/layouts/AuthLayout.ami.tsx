import { Outlet } from "react-router-dom";
import { Label } from "@/core/components/base/label";

const AuthLayout = () => {
	return (
		<div className="relative min-h-screen max-h-screen min-w-screen max-w-screen h-screen w-screen xl:flex">
			<div
				id="image-left"
				className="relative w-full h-full bg-cover bg-center text-center"
				style={{ backgroundImage: "url('/login.jpg')" }}
			></div>

			<Outlet />
		</div>
	);
};

export default AuthLayout;
