import { Suspense } from "react";
import CustomerForApprovalTable from "../components/CustomerForApprovalTable";

const CustomerApprovalPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<CustomerForApprovalTable />
		</Suspense>
	);
};

export default CustomerApprovalPage;
