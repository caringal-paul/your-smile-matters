import { Suspense } from "react";
import SupportsForApprovalTable from "../components/SupportsForApprovalTable";

const SupportApprovalPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SupportsForApprovalTable />
		</Suspense>
	);
};

export default SupportApprovalPage;
