import BackIcon from "@/ami/shared/assets/icons/BackIcon";
import { Button } from "@/core/components/base/button";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { ChevronRight } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const AllInvestmentFormBreadcrumb = () => {
	const navigate = useNavigate();

	return (
		<div className="xl:mt-4">
			<SectionHeader className="flex justify-start">
				<div className="text-md font-normal flex flex-row flex-wrap gap-1 items-center">
					<Button
						variant={"icon"}
						onClick={() => navigate("/portfolio-management/investments")}
						className="hover:bg-transparent px-2 text-md font-normal"
					>
						<BackIcon fill="#1C1B1F" className="h-4 w-4" /> All Investments
					</Button>
					<ChevronRight className="h-4 w-4" />{" "}
					<span className="text-text-blue">Investment Details</span>
				</div>
			</SectionHeader>

			<Outlet />
		</div>
	);
};

export default AllInvestmentFormBreadcrumb;
