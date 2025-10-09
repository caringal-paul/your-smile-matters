import BackIcon from "@/ami/shared/assets/icons/BackIcon";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";
import SectionHeader from "@/ami/shared/components/header/SectionHeader";
import { ChevronRight } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const TransactionBreadcrumbs = () => {
	const navigate = useNavigate();

	return (
		<div>
			<SectionHeader className="flex justify-start mb-4">
				<div>
					<Label className="flex flex-row flex-wrap items-center gap-1 font-normal text-md">
						<Button
							variant={"icon"}
							onClick={() =>
								navigate("/admin/ami/transaction-history/transactions")
							}
							className="px-2 font-normal hover:bg-transparent text-md"
						>
							<BackIcon fill="#1C1B1F" className="w-4 h-4" /> Transactions
						</Button>
						<ChevronRight className="w-4 h-4" />{" "}
						<span className="text-admin-secondary">Transaction Details</span>
					</Label>
				</div>
			</SectionHeader>

			<Outlet />
		</div>
	);
};

export default TransactionBreadcrumbs;
