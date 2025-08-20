import { Suspense } from "react";
import UserActivityLogsTable from "../components/UserActivityLogsTable";

const UserActivityLogsPage = () => {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<UserActivityLogsTable />
			</Suspense>
		</div>
	);
};

export default UserActivityLogsPage;
