import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/components/Navbar";
import FooterSection from "../features/home/components/FooterSection";
import { useMyCredentials } from "../store/useMyCredentials";
import BookingFormModal from "../features/booking/components/BookingFormModal";

const MainLayout = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	const myCredentials = useMyCredentials((state) => state.myCredentials);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			if (!isScrolled && scrollTop > 110) {
				setIsScrolled(true);
			} else if (isScrolled && scrollTop < 80) {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isScrolled]);

	return (
		<div className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto min-w-screen scrollbar-store-front bg-sf-background">
			{!isScrolled && (
				<div className="w-full px-6 py-2 bg-sf-background md:px-10 lg:px-24 2xl:px-60">
					<Navbar />
				</div>
			)}
			<div
				className={`fixed left-0 z-50 w-full px-6 md:px-10 lg:px-24 2xl:px-60 transition-all duration-500 ease-in-out ${
					isScrolled
						? "top-0 bg-sf-background drop-shadow-lg translate-y-0"
						: "-top-full bg-sf-navbar-bg drop-shadow-lg -translate-y-full"
				}`}
			>
				<Navbar />
			</div>

			<Outlet />

			<FooterSection />

			<BookingFormModal />
		</div>
	);
};

export default MainLayout;
