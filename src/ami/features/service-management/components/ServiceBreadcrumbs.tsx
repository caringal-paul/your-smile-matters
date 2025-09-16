import BackIcon from "@/ami/shared/assets/icons/BackIcon";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { ChevronRight } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const ServiceBreadcrumbs = () => {
	const navigate = useNavigate();

	return (
		<div>
			<SectionHeader className="flex justify-start mb-4">
				<div>
					<Label className="flex flex-row flex-wrap items-center gap-1 font-normal text-md">
						<Button
							variant={"icon"}
							onClick={() => navigate("/admin/ami/service-management/services")}
							className="px-2 font-normal hover:bg-transparent text-md"
						>
							<BackIcon fill="#1C1B1F" className="w-4 h-4" /> Services
						</Button>
						<ChevronRight className="w-4 h-4" />{" "}
						<span className="text-admin-secondary">Service Details</span>
					</Label>
				</div>
			</SectionHeader>

			<Outlet />
		</div>
	);
};

export default ServiceBreadcrumbs;
