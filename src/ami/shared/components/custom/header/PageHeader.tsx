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
		<div className="sticky top-20 xl:top-0 z-10">
			<div className="flex justify-between items-center w-full h-fit py-2 px-4 xl:py-3 xl:px-8 bg-accent rounded-md">
				<Label className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold">
					{pageTitle}
				</Label>

				<div className="flex gap-2">
					<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
						<PopoverTrigger asChild>
							<button
								onClick={() => setIsPopoverOpen((prev) => !prev)}
								className="rounded-full h-6 w-6 bg-cover"
								style={{ backgroundImage: `url("/profile-avatar.png")` }}
								aria-label="Profile"
							/>
						</PopoverTrigger>

						<PopoverContent
							side="bottom"
							align="start"
							className="w-fit p-2 z-50 flex flex-col gap-1 bg-white mt-2 mr-8 justify-start"
						>
							<button
								className="text-xs p-2 bg-transparent hover:bg-accent w-full text-foreground text-start"
								onClick={() => navigate("/account-settings")}
							>
								Account Settings
							</button>
							<button
								className="text-xs p-2 bg-transparent hover:bg-accent w-full text-foreground text-start"
								onClick={() => navigate("/auth")}
							>
								Logout
							</button>
						</PopoverContent>
					</Popover>

					<div className="flex flex-col gap-0 leading-none tracking-tight text-center">
						<Label className="text-foreground text-xs font-semibold">
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
