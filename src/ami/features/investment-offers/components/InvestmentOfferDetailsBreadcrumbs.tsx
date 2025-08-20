import BackIcon from "@/ami/shared/assets/icons/BackIcon";
import { Button } from "@/core/components/base/button";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { ChevronRight } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const InvestmentOfferDetailsBreadcrumbs = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// Extract the investment type from the path
	const investmentTypes = ["equity", "commodity", "fixed-income"] as const;
	const currentType = investmentTypes.find((type) =>
		location.pathname.includes(type)
	);

	// Format title (capitalize and replace hyphens)
	const formattedTitle = currentType
		? currentType
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ")
		: "Investment";

	return (
		<div className="mt-20 xl:mt-0">
			<SectionHeader className="flex justify-start mb-4">
				<div className="text-md font-normal flex flex-row flex-wrap gap-1 items-center">
					<Button
						variant={"icon"}
						onClick={() => navigate(-1)}
						className="hover:bg-transparent px-2 text-md font-normal"
					>
						<BackIcon fill="#1C1B1F" className="h-4 w-4" /> {formattedTitle}
					</Button>
					<ChevronRight className="h-4 w-4" />
					<span className="text-text-blue">Investment Offer Details</span>
				</div>
			</SectionHeader>

			<Outlet />
		</div>
	);
};

export default InvestmentOfferDetailsBreadcrumbs;
