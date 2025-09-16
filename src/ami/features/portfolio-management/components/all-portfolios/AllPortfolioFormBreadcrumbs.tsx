import BackIcon from "@/ami/shared/assets/icons/BackIcon";
import { Button } from "@/core/components/base/button";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { ChevronRight } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AllPortfolioFormBreadcrumbs = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const name = params.get("name");

	const tempName = "Ngozi Kelechi";

	return (
		<div>
			<SectionHeader className="flex justify-start mb-4">
				<div>
					<div className="text-md font-normal flex flex-row flex-wrap gap-1 items-center">
						<Button
							variant={"icon"}
							onClick={() => navigate("/portfolio-management/portfolios")}
							className="hover:bg-transparent px-2 text-md font-normal"
						>
							<BackIcon fill="#1C1B1F" className="h-4 w-4" /> Portfolio List
						</Button>
						<ChevronRight className="h-4 w-4" />
						<button
							className={`${
								!name ? "text-text-blue" : "text-foreground hover:underline"
							}`}
							onClick={() => navigate(-1)}
							disabled={!name}
						>
							{tempName}'s Portfolio
						</button>

						{name && (
							<>
								<ChevronRight className="h-4 w-4" />
								<span className="text-admin-secondary">{name}</span>
							</>
						)}
					</div>
				</div>
			</SectionHeader>

			<Outlet />
		</div>
	);
};

export default AllPortfolioFormBreadcrumbs;
