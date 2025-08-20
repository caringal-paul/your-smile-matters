import { Suspense } from "react";
import UserTable from "../components/UserTable";

const UserPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<UserTable />
		</Suspense>
	);
};

export default UserPage;
