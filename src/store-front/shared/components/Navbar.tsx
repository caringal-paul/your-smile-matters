"use client";

import {
	ArrowRightFromLine,
	CalendarDaysIcon,
	CircleUserRound,
	LogOutIcon,
	WalletIcon,
} from "lucide-react";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/core/components/base/navigation-menu";
import { Button } from "@/core/components/base/button";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/core/components/base/separator";
import { useMyCredentials } from "@/store-front/store/useMyCredentials";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/core/components/base/popover";
import { Label } from "@/core/components/base/label";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/core/components/base/avatar";
import { getInitials } from "@/core/helpers/getInitials";
import { useLogoutCustomerMutation } from "@/store-front/features/auth/queries/customerLogout.mutation";

type NavLinkProps = {
	path: string;
	title: string;
};

const NavLink = ({ path, title }: NavLinkProps) => {
	const navigate = useNavigate();

	return (
		<NavigationMenuItem>
			<NavigationMenuLink
				asChild
				className={navigationMenuTriggerStyle()}
				onClick={() => navigate(path)}
			>
				<div className="hover:cursor-pointer">{title}</div>
			</NavigationMenuLink>
		</NavigationMenuItem>
	);
};

type NavLinkWithSublinkProps = {
	title: string;
	subLinks: {
		subTitle: string;
		description: string;
		onClick: () => void;
	}[];
};

const NavLinkWithSublink = ({ title, subLinks }: NavLinkWithSublinkProps) => {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>{title}</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid w-[300px] gap-3 p-2">
					<li className="space-y-0">
						{subLinks.map((subLink) => {
							return (
								<>
									<NavigationMenuLink asChild>
										<div
											onClick={subLink.onClick}
											className="block p-3 space-y-1 leading-none no-underline transition-colors rounded-md outline-none select-none hover:bg-primary hover:text-white focus:bg-primary focus:text-primary-foreground hover:cursor-pointer"
										>
											<div className="text-sm font-medium leading-none">
												{subLink.subTitle}
											</div>
											<p className="text-xs leading-snug text-muted-foreground line-clamp-2">
												{subLink.description}
											</p>
										</div>
									</NavigationMenuLink>
									<Separator className={`last:hidden`} />
								</>
							);
						})}
					</li>
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);
};

const Navbar = () => {
	const navigate = useNavigate();
	const myCredentials = useMyCredentials((state) => state.myCredentials);

	const { mutateAsync: logoutCustomer } = useLogoutCustomerMutation();

	return (
		<div className="flex items-center justify-between">
			<div
				style={{ backgroundImage: "url('/ysm-sidebar.png')" }}
				className="bg-center bg-no-repeat bg-contain h-36 xl:h-24 w-36 xl:w-32"
			/>

			<NavigationMenu>
				<NavigationMenuList>
					<NavLink path="/" title="Home" />
					<NavLink path="/services" title="Services" />
					<NavLink path="/packages" title="Packages" />

					<NavLinkWithSublink
						title="Booking"
						subLinks={[
							// TODO BRING ME BACK
							// {
							// 	description: "View your own list of package wishlist.",
							// 	subTitle: "My wishlist",
							// 	onClick: () => {
							// 		console.log(
							// 			"Show wishlist, and if not logged in redirect to login"
							// 		);
							// 	},
							// },
							{
								description: "Check packages and services and book now",
								subTitle: "Book appointment now",
								onClick: () => {
									window.location.href = "/packages";
								},
							},
						]}
					/>

					{/* TODO BpING ME BACK */}
					{/* <NavLinkWithSublink
						title="Deals & History"
						subLinks={[
							{
								description: "View your own list of package wishlist.",

								subTitle: "Promo Code Hunt",
								onClick: () => {
									console.log(
										"	Review your past bookings, payments, and receipts in one place."
									);
								},
							},
							{
								description:
									"Visit the page and discover limited promo codes to get a discount on your appoinrment",
								subTitle: "Book appointment now",
								onClick: () => {
									console.log("Show packages page as well.");
								},
							},
						]}
					/> */}

					<NavLink path="/support" title="Support" />
					<NavLink path="/about" title="About" />
				</NavigationMenuList>
			</NavigationMenu>

			{!myCredentials ? (
				<Button
					className="z-20 p-5 text-base transition-all duration-300 rounded-lg shadow-lg shadow-primary/80 hover:shadow-primary/40 hover:bg-primary/80"
					onClick={() => navigate("auth/login")}
				>
					<ArrowRightFromLine />
					Login
				</Button>
			) : (
				<div>
					<Popover>
						<PopoverTrigger asChild>
							<Button className="bg-transparent flex flex-row gap-2 text-foreground shadow-none hover:bg-inherit focus-visible:ring-0">
								<Avatar>
									<AvatarImage
										src={myCredentials.profile_image || ""}
										alt="@ysm-profile"
										className="object-cover"
									/>
									<AvatarFallback>
										{getInitials(
											`${myCredentials.first_name} ${myCredentials.last_name}`
										)}
									</AvatarFallback>
								</Avatar>
								<Label>
									{myCredentials.first_name} {myCredentials.last_name}
								</Label>
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className="w-fit p-0 min-w-[10em] max-w-[12em] mt-1"
							align="end"
							alignOffset={5}
						>
							<Button
								variant="undefined"
								className="text-foreground w-full text-start justify-start hover:bg-accent rounded-none"
								onClick={() => navigate("profile/edit")}
							>
								<CircleUserRound className="size-4" />
								Profile
							</Button>
							<Button
								variant="undefined"
								className="text-foreground w-full text-start justify-start hover:bg-accent rounded-none"
								onClick={() => navigate("profile/my-bookings")}
							>
								<CalendarDaysIcon className="size-4" />
								Bookings
							</Button>
							<Button
								variant="undefined"
								className="text-foreground w-full text-start justify-start hover:bg-accent rounded-none"
								onClick={() => navigate("profile/my-transactions")}
							>
								<WalletIcon className="size-4" />
								Transactions
							</Button>
							<Button
								variant="undefined"
								className="text-foreground w-full text-start justify-start hover:bg-accent rounded-none"
								onClick={async () => {
									await logoutCustomer().then(() => {
										navigate("/auth/login");
									});
								}}
							>
								<LogOutIcon className="size-4" />
								Logout
							</Button>
						</PopoverContent>
					</Popover>
				</div>
			)}
		</div>
	);
};

export default Navbar;
