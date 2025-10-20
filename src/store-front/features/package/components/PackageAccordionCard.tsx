import { Badge } from "@/core/components/base/badge";
import { Button } from "@/core/components/base/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/core/components/base/accordion";
import { Eye, ShoppingCart } from "lucide-react";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { Label } from "@/core/components/base/label";

interface PackageAccordionCardProps {
	id: string;
	name: string;
	description?: string;
	image?: string;
	status: "available" | "unavailable";
	services: string[];
	price: number;
	oldPrice?: number;
	looks?: number;
	onBook?: () => void;
	onView?: () => void;
}

export const PackageAccordionCard = ({
	id,
	name,
	description,
	image,
	status,
	services,
	price,
	oldPrice,
	looks = 0,
	onBook,
	onView,
}: PackageAccordionCardProps) => {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "available":
				return "bg-secondary text-white";
			case "unavailable":
				return "bg-admin-background-sidebar text-white ";
		}
	};

	const getStatusText = (status: string) => {
		switch (status) {
			case "available":
				return "Available";
			case "unavailable":
				return "Unavailable";
			default:
				return status;
		}
	};

	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem
				value={id}
				className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
			>
				<AccordionTrigger className="hover:no-underline pr-4 pl-2 py-0">
					<div className="flex flex-col w-full">
						{/* Header Section - Always Visible */}
						<div className="flex flex-row p-4 space-x-4">
							{/* Image */}
							<div className="flex-shrink-0">
								<img
									src={image || "/sf/ysm-card-fallback.png"}
									onError={(e) => {
										e.currentTarget.src = "/sf/ysm-card-fallback.png";
									}}
									alt={name}
									className="w-20 h-20 object-cover rounded-lg"
								/>
							</div>

							{/* Content */}
							<div className="flex-1 flex flex-col justify-between min-w-0">
								{/* Top Row */}
								<div className="flex items-start justify-between gap-0">
									<div className="flex-1 min-w-0">
										<h3 className="text-lg font-semibold text-gray-900 truncate text-left">
											{name}
										</h3>

										<p className="text-sm text-gray-500 font-light mt-1 line-clamp-4 text-left">
											{description ?? "-"}
										</p>
									</div>
									<Badge className="text-xs text-white bg-sf-dark-bg tracking-tight font-light italic">
										{looks} looks
									</Badge>
									<Badge
										className={`ml-2 text-xs font-medium flex-shrink-0 ${getStatusColor(
											status
										)}`}
									>
										{getStatusText(status)}
									</Badge>
								</div>
							</div>
						</div>
					</div>
				</AccordionTrigger>

				<AccordionContent className="p-0">
					<div className="px-4 py-4 space-y-4 border-t border-gray-100">
						{/* Services List */}
						<div>
							<h4 className="text-sm font-medium text-gray-900 mb-2">
								Included Services:
							</h4>
							<div className="space-y-1">
								{services.map((service, index) => (
									<div
										key={index}
										className="flex items-center text-sm text-gray-600 gap-2"
										onClick={() => {
											console.log("asd", service);
										}}
									>
										<span className="text-2xs font-bold mt-[2px]">
											{index + 1}.
										</span>{" "}
										<Label className="hover:text-primary hover:underline hover:cursor-pointer">
											{service}
										</Label>
									</div>
								))}
							</div>
						</div>

						{/* Price and Stats */}
						<div className="flex items-center justify-between pt-2 border-t border-gray-100">
							<div className="flex flex-col">
								<div className="flex items-center space-x-2">
									<span className="text-xl font-bold">
										{formatToPeso(price.toFixed(2))}
									</span>
									{oldPrice && (
										<span className="text-sm text-gray-400 line-through">
											{formatToPeso(oldPrice.toFixed(2))}
										</span>
									)}
								</div>
							</div>

							<div className="flex space-x-2">
								<Button
									size="sm"
									disabled={status === "unavailable"}
									onClick={(e) => {
										e.stopPropagation();
										onBook?.();
									}}
									className="text-xs px-3 py-1 bg-gradient-to-r from-primary to-primary/65 hover:opacity-90"
								>
									<ShoppingCart size={12} className="mr-1" />
									{status === "unavailable" ? "Sold Out" : "Book Now"}
								</Button>
							</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};
