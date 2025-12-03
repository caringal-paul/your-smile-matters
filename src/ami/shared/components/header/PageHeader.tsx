import { useState } from "react";
import { Label } from "../../../../core/components/base/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../../core/components/base/popover";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserLoggedInQuery } from "@/ami/features/account-settings/queries/getCurrentUserLoggedIn.ami.query";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/core/components/base/avatar";
import { getInitials } from "@/core/helpers/getInitials";
import { useLogoutUserMutation } from "@/ami/features/auth/queries/logoutAmiUser.mutation";

type PageHeaderProps = { pageTitle: string };

const PageHeader = ({ pageTitle }: PageHeaderProps) => {
	const navigate = useNavigate();
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const { data: currUserLoggedIn, isLoading: isUserDataFetching } =
		useGetCurrentUserLoggedInQuery();

	const { mutateAsync: logout } = useLogoutUserMutation();

	return (
		<div className="sticky z-10 top-20 xl:top-0">
			<div className="flex items-center justify-between w-full px-4 py-2 rounded-md h-fit xl:py-3 xl:px-8 bg-accent">
				<Label className="text-sm font-semibold md:text-base lg:text-lg xl:text-xl">
					{pageTitle}
				</Label>

				<div className="flex gap-2 items-center">
					<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
						<PopoverTrigger asChild>
							<button
								onClick={() => setIsPopoverOpen((prev) => !prev)}
								className="size-8 bg-cover rounded-full"
								aria-label="Profile"
							>
								<Avatar className="size-8 border-2 border-gray-300">
									<AvatarImage
										src={currUserLoggedIn?.profile_image || ""}
										alt="@my-profile"
										className="object-cover"
									/>
									<AvatarFallback>
										{getInitials(
											`${currUserLoggedIn?.first_name} ${currUserLoggedIn?.last_name}`
										)}
									</AvatarFallback>
								</Avatar>
							</button>
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
								onClick={async () => {
									await logout();
									localStorage.removeItem("ami_access_token");
									localStorage.removeItem("ami_refresh_token");
									navigate("/admin/ami/auth");
								}}
							>
								Logout
							</button>
						</PopoverContent>
					</Popover>

					<div className="flex flex-col gap-0 leading-none tracking-tight text-center">
						<Label className="text-xs font-semibold text-foreground">
							{currUserLoggedIn?.first_name} {currUserLoggedIn?.last_name}
						</Label>
						<Label className="text-[#74889E] text-[8px] font-light">
							{currUserLoggedIn?.role_and_permissions?.name}
						</Label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageHeader;
