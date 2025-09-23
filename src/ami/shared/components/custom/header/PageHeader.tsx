import { useState } from "react";
import { Label } from "../../../../../core/components/base/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../../../core/components/base/popover";
import { useNavigate } from "react-router-dom";

type PageHeaderProps = { pageTitle: string };

const PageHeader = ({ pageTitle }: PageHeaderProps) => {
	const navigate = useNavigate();
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	return (
		<div className="sticky z-10 top-20 xl:top-0">
			<div className="flex items-center justify-between w-full px-4 py-2 rounded-md h-fit xl:py-3 xl:px-8 bg-accent">
				<Label className="text-sm font-semibold md:text-base lg:text-lg xl:text-xl">
					{pageTitle}
				</Label>

				<div className="flex gap-2">
					<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
						<PopoverTrigger asChild>
							<button
								onClick={() => setIsPopoverOpen((prev) => !prev)}
								className="w-6 h-6 bg-cover rounded-full"
								style={{ backgroundImage: `url("/profile-avatar.jpg")` }}
								aria-label="Profile"
							/>
						</PopoverTrigger>

						<PopoverContent
							side="bottom"
							align="start"
							className="z-50 flex flex-col justify-start gap-1 p-2 mt-2 mr-8 bg-white w-fit"
						>
							<button
								className="w-full p-2 text-xs bg-transparent hover:bg-accent text-foreground text-start"
								onClick={() => navigate("/account-settings")}
							>
								Account Settings
							</button>
							<button
								className="w-full p-2 text-xs bg-transparent hover:bg-accent text-foreground text-start"
								onClick={() => navigate("/admin/ami/auth")}
							>
								Logout
							</button>
						</PopoverContent>
					</Popover>

					<div className="flex flex-col gap-0 leading-none tracking-tight text-center">
						<Label className="text-xs font-semibold text-foreground">
							John Doe
						</Label>
						<Label className="text-[#74889E] text-[8px] font-light">
							Super Admin
						</Label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageHeader;
