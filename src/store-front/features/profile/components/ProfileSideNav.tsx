import { Card } from "@/core/components/base/card";
import { Book, Lock, MailIcon, User, WalletIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
	id: string;
	label: string;
	icon: React.ReactNode;
	path: string;
}

const MENU_ITEMS: MenuItem[] = [
	{
		id: "edit-profile",
		label: "Edit Profile",
		icon: <User className="w-5 h-5" />,
		path: "edit-profile",
	},
	{
		id: "my-bookings",
		label: "My Bookings",
		icon: <Book className="w-5 h-5" />,
		path: "my-bookings",
	},
	{
		id: "my-booking-requests",
		label: "Booking Requests",
		icon: <MailIcon className="w-5 h-5" />,
		path: "my-booking-requests",
	},
	{
		id: "my-transactions",
		label: "My Transactions",
		icon: <WalletIcon className="w-5 h-5" />,
		path: "my-transactions",
	},
	{
		id: "my-refund-requests",
		label: "Refund Requests",
		icon: <MailIcon className="w-5 h-5" />,
		path: "my-refund-requests",
	},
	// {
	// 	id: "reset-password",
	// 	label: "Reset Password",
	// 	icon: <Lock className="w-5 h-5" />,
	// 	path: "reset-password",
	// },
];

const ProfileSideNav = () => {
	const navigate = useNavigate();
	const [activeItem, setActiveItem] = useState("");

	// Update active item based on current pathname
	useEffect(() => {
		const pathname = window.location.pathname;
		const matchedItem = MENU_ITEMS.find((item) => pathname.includes(item.path));
		if (matchedItem) {
			setActiveItem(matchedItem.id);
		}
	}, []);

	// Listen for route changes
	useEffect(() => {
		const handleRouteChange = () => {
			const pathname = window.location.pathname;
			const matchedItem = MENU_ITEMS.find((item) =>
				pathname.includes(item.path)
			);
			if (matchedItem) {
				setActiveItem(matchedItem.id);
			}
		};

		window.addEventListener("popstate", handleRouteChange);
		return () => window.removeEventListener("popstate", handleRouteChange);
	}, []);

	const handleItemClick = (item: MenuItem) => {
		setActiveItem(item.id);
		navigate(item.path);
	};

	return (
		<div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-border py-4">
			<nav className="space-y-1">
				{MENU_ITEMS.map((item, index) => (
					<React.Fragment key={item.id}>
						<button
							onClick={() => handleItemClick(item)}
							className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors relative ${
								activeItem === item.id
									? "text-primary font-medium"
									: "text-foreground hover:bg-gray-50"
							}`}
						>
							<div
								className={`absolute left-0 w-1 bg-primary rounded-r-full transition-all duration-300 ease-out ${
									activeItem === item.id
										? "top-0 bottom-0 opacity-100"
										: "top-1/2 bottom-1/2 opacity-0"
								}`}
							/>
							<span
								className={`transition-all duration-300 ${
									activeItem === item.id ? "ml-2" : ""
								}`}
							>
								{item.icon}
							</span>
							<span className="text-base transition-colors duration-300">
								{item.label}
							</span>
						</button>
						{index < MENU_ITEMS.length - 1 && (
							<div className="border-b border-dashed border-gray-200 my-1" />
						)}
					</React.Fragment>
				))}
			</nav>
		</div>
	);
};

export default ProfileSideNav;
