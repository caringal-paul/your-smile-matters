import { Suspense } from "react";
import AccountSettingsForm from "../components/AccountSettingsForm.ami";

const AccountSettingsPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<AccountSettingsForm />
		</Suspense>
	);
};

export default AccountSettingsPage;
