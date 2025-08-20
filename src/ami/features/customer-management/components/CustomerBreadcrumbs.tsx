import BackIcon from "@/ami/shared/assets/icons/BackIcon";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { ChevronRight } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const CustomerBreadcrumbs = () => {
	const navigate = useNavigate();

	return (
		<div>
			<SectionHeader className="flex justify-start mb-4">
				<div>
					<Label className="text-md font-normal flex flex-row flex-wrap gap-1 items-center">
						<Button
							variant={"icon"}
							onClick={() => navigate("/customer-management/customers")}
							className="hover:bg-transparent px-2 text-md font-normal"
						>
							<BackIcon fill="#1C1B1F" className="h-4 w-4" /> Customer List
						</Button>
						<ChevronRight className="h-4 w-4" />{" "}
						<span className="text-text-blue">Customer Details</span>
					</Label>
				</div>
			</SectionHeader>

			<Outlet />
		</div>
	);
};

export default CustomerBreadcrumbs;
