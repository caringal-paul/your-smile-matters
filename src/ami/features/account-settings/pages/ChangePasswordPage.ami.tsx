import { Suspense } from "react";
import AccountSettingsForm from "../components/AccountSettingsForm.ami";
import ChangePasswordForm from "../components/ChangePasswordForm.ami";
import ChangePasswordBreadcrumbs from "../components/AccountSettingsBreadcrumbs";

const ChangePasswordPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div>
				<ChangePasswordBreadcrumbs />
				<ChangePasswordForm />
			</div>
		</Suspense>
	);
};

export default ChangePasswordPage;
