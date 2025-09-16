import BackIcon from "@/ami/shared/assets/icons/BackIcon";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";
import { ChevronRight } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const UserBreadcrumbs = () => {
	const navigate = useNavigate();
	return (
		<div>
			<SectionHeader>
				<div>
					<Label className="flex flex-row items-center gap-1 font-normal text-md">
						<Button
							variant={"icon"}
							onClick={() => navigate("/admin/ami/user-management/users")}
							className="px-2 font-normal hover:bg-transparent text-md"
						>
							<BackIcon fill="#1C1B1F" className="w-4 h-4" /> Users
						</Button>
						<ChevronRight className="w-4 h-4" />{" "}
						<span className="text-secondary">User Form</span>
					</Label>
				</div>
			</SectionHeader>{" "}
			<Outlet />
		</div>
	);
};

export default UserBreadcrumbs;
