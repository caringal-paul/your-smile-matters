import React from "react";

import { TabsList, TabsTrigger } from "@/core/components/base/tabs";

import {
	CheckCircle,
	Clock,
	CreditCard,
	ShoppingCart,
	User,
} from "lucide-react";
import { useBookingFormStore } from "@/store-front/store/useBookingFormStore";

type BookingFormStepsHeader = {
	currentTab: string;
};

// Step Indicator Component
interface Step {
	id: number;
	label: string;
	icon: React.ReactNode;
	value: string;
	isClickable: boolean;
}

const BookingFormStepsHeader = ({ currentTab }: BookingFormStepsHeader) => {
	const { stepValidation, formData } = useBookingFormStore();

	const bookingSteps: Step[] = [
		{
			id: 1,
			label: "Service",
			icon: <ShoppingCart size={16} />,
			value: "service",
			isClickable: !formData.is_booking_sent,
		},
		{
			id: 2,
			label: "Time",
			icon: <Clock size={16} />,
			value: "time",
			isClickable: stepValidation.step1 && !formData.is_booking_sent,
		},
		{
			id: 3,
			label: "Staff",
			icon: <User size={16} />,
			value: "photographer",
			isClickable:
				stepValidation.step2 &&
				stepValidation.step1 &&
				!formData.is_booking_sent,
		},
		{
			id: 4,
			label: "Summary",
			icon: <CheckCircle size={16} />,
			value: "summary",
			isClickable:
				stepValidation.step3 && stepValidation.step2 && stepValidation.step1,
		},
		{
			id: 5,
			label: "Status",
			icon: <CheckCircle size={16} />,
			value: "status",
			isClickable:
				stepValidation.step4 &&
				stepValidation.step3 &&
				stepValidation.step2 &&
				stepValidation.step1,
		},
	];

	return (
		<TabsList className="flex justify-center items-center space-x-4 bg-white relative border-none w-full py-10">
			{bookingSteps.map((step, index) => (
				<div key={step.id} className="flex items-center">
					<TabsTrigger
						value={step.value}
						className="flex flex-col items-center px-2 py-2 relative bg-transparent border-none shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none disabled:opacity-30"
						disabled={!step.isClickable}
					>
						<div
							className={`
w-8 h-6 rounded text-xs font-medium flex items-center justify-center mb-1 transition-colors duration-200
${
	currentTab === step.value
		? "bg-primary/10 text-primary"
		: "bg-secondary/20 text-secondary"
}
`}
						>
							{String(step.id).padStart(2, "0")}
						</div>
						<div
							className={`
w-10 h-10 rounded-lg flex items-center justify-center mb-[2px] transition-all duration-700
${
	currentTab === step.value
		? "bg-primary/5 text-primary border border-primary scale-110"
		: "bg-secondary/20 text-secondary border border-secondary"
}
`}
						>
							{step.icon}
						</div>
						<span
							className={`
text-sm font-medium transition-colors duration-200 whitespace-nowrap
${currentTab === step.value ? "text-primary" : "text-secondary"}
`}
						>
							{step.label}
						</span>
					</TabsTrigger>

					{index < bookingSteps.length - 1 && (
						<div
							className={`
							w-12 h-0.5 mx-2 mt-4 transition-colors duration-200 flex-shrink-0
							${currentTab === step.value ? "bg-primary/30" : "bg-gray-200"}
							`}
						/>
					)}
				</div>
			))}
		</TabsList>
	);
};

export default BookingFormStepsHeader;
