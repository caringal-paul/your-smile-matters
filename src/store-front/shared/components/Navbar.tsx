"use client";

import { ArrowRightFromLine } from "lucide-react";

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
							{
								description: "View your own list of package wishlist.",
								subTitle: "My wishlist",
								onClick: () => {
									console.log(
										"Show wishlist, and if not logged in redirect to login"
									);
								},
							},
							{
								description: "Check packages and services and book now",
								subTitle: "Book appointment now",
								onClick: () => {
									console.log("Show packages page as well.");
								},
							},
						]}
					/>

					<NavLinkWithSublink
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
					/>

					<NavLink path="/support" title="Support" />
					<NavLink path="/about" title="About" />
				</NavigationMenuList>
			</NavigationMenu>

			<Button
				className="z-20 p-5 text-base transition-all duration-300 rounded-lg shadow-lg shadow-primary/80 hover:shadow-primary/40 hover:bg-primary/80"
				onClick={() => navigate("auth/login")}
			>
				<ArrowRightFromLine />
				Login
			</Button>
		</div>
	);
};

export default Navbar;
