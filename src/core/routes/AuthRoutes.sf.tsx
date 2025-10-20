import CustomerLoginForm from "@/store-front/features/auth/components/CustomerLoginForm";
import CustomerRegisterForm from "@/store-front/features/auth/components/CustomerRegisterForm";
import CustomerAuthLayout from "@/store-front/layouts/AuthLayout.sf";
import { Route } from "react-router-dom";

const sfAuthRoutes = (
	<Route path="/auth" element={<CustomerAuthLayout />}>
		<Route path="login" element={<CustomerLoginForm />} />
		<Route path="register" element={<CustomerRegisterForm />} />
	</Route>
);

export default sfAuthRoutes;
