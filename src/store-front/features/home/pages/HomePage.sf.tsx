import { cn } from "@/core/lib/utils";
import { PropsWithChildren } from "react";
import LandingSection from "../components/LandingSection";
import PromoSection from "../components/PromoSection";
import CategoriesSection from "../components/CategoriesSection";
import TopServicesSection from "../components/TopServicesSection";
import CustomerReviewSection from "../components/CustomerReviewSection";
import AppointmentProcessSection from "../components/AppointmentProcessSection";

type SectionContainerProps = PropsWithChildren & {
	className?: string;
};

export const SectionContainer = ({
	className,
	children,
}: SectionContainerProps) => {
	return (
		<div
			className={cn(
				"w-full h-full px-6 md:px-10 lg:px-24 2xl:px-60",
				className
			)}
		>
			{children}
		</div>
	);
};

const HomePage = () => {
	return (
		<div className="space-y-4">
			<LandingSection />
			<CategoriesSection />
			<AppointmentProcessSection />
			<TopServicesSection />
			<PromoSection />
			<CustomerReviewSection />
		</div>
	);
};

export default HomePage;
