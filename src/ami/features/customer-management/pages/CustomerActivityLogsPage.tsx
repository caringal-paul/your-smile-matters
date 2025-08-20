import { Suspense } from "react";
import CustomerActivityLogsTable from "../components/CustomerActivityLogsTable";

const CustomerActivityLogsPage = () => {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<CustomerActivityLogsTable />
			</Suspense>
		</div>
	);
};

export default CustomerActivityLogsPage;
