import LoginForm from "@/ami/features/auth/components/LoginForm.ami";
import VerifyCodeForm from "@/ami/features/auth/components/VerifyCodeForm.ami";
import AuthLayout from "@/ami/layouts/AuthLayout.ami";
import { Route } from "react-router-dom";

const authRoutes = (
	<Route path="ami/auth" element={<AuthLayout />}>
		<Route index element={<LoginForm />} />
		<Route path="verify" element={<VerifyCodeForm />} />
	</Route>
);

export default authRoutes;
