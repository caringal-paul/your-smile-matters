import BackIcon from "@/ami/shared/assets/icons/BackIcon";
import SectionHeader from "@/ami/shared/components/header/SectionHeader";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";
import { ChevronRight } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const ChangePasswordBreadcrumbs = () => {
	const navigate = useNavigate();
	return (
		<SectionHeader>
			<Label className="flex flex-row items-center gap-1 font-normal text-md">
				<Button
					variant={"icon"}
					onClick={() => navigate("/admin/ami/account-settings")}
					className="px-2 font-normal hover:bg-transparent text-md"
				>
					<BackIcon fill="#1C1B1F" className="w-4 h-4" /> Account Settings
				</Button>
				<ChevronRight className="w-4 h-4" />{" "}
				<span className="text-secondary">Change Password</span>
			</Label>
		</SectionHeader>
	);
};

export default ChangePasswordBreadcrumbs;
