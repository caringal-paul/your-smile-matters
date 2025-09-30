import { Badge } from "@/core/components/base/badge";
import { Button } from "@/core/components/base/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/core/components/base/accordion";
import { ShoppingCart, Clock } from "lucide-react";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { Label } from "@/core/components/base/label";
import { formatDuration } from "../helpers/formatDurationMinutes";
import React from "react";

type ServiceAccordionCardProps = {
	id: string;
	category: string;
	name: string;
	description?: string | null;
	price: number;
	oldPrice?: number;
	images: string[]; // Only images prop
	duration_minutes?: number | null;
	disabled?: boolean;
	onBook?: () => void;
};

const ServiceAccordionCard = React.memo(
	({
		id,
		category,
		name,
		description = "No description available.",
		price,
		oldPrice,
		images,
		duration_minutes = 120,
		disabled = true,
		onBook,
	}: ServiceAccordionCardProps) => {
		const mainImage = images?.[0] || "/sf/ysm-card-fallback.png"; // first image as main
		const galleryImages = images?.slice(1) || []; // rest for gallery

		return (
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem
					value={id}
					className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${
						disabled ? "opacity-65" : "opacity-100"
					}`}
				>
					<AccordionTrigger
						className="hover:no-underline pr-4 pl-2 py-0"
						disabled={disabled}
					>
						<div className="flex flex-col w-full">
							<div className="flex flex-row p-4 space-x-4">
								<div className="flex-shrink-0">
									<img
										src={mainImage}
										onError={(e) =>
											(e.currentTarget.src = "/sf/ysm-card-fallback.png")
										}
										alt={name}
										className="w-14 h-14 2xl:w-16 2xl:h-16 object-cover rounded-lg"
									/>
								</div>
								<div className="flex-1 flex flex-col justify-between min-w-0">
									<div className="flex-1 min-w-0">
										<h3 className="text-sm 2xl:text-base overflow-hidden whitespace-nowrap text-ellipsis max-w-[35em] 2xl:max-w-[16em] font-bold text-foreground text-left">
											{name}
										</h3>
									</div>

									<div className="flex justify-between items-center">
										<div className="space-y-1 2xl:space-y-1">
											<div className="flex flex-row gap-2">
												<Badge className="xl:text-3xs 2xl:text-xs bg-secondary text-white tracking-tight hover:bg-secondary">
													{category}
												</Badge>

												<Label className="text-2xs font-normal text-gray-300 [&_svg]:size-3 [&_svg]:shrink-0 flex gap-1 items-center">
													<Clock /> {formatDuration(duration_minutes ?? 120)}
												</Label>
											</div>

											<div className="flex items-center space-x-2 whitespace-nowrap">
												<span className="text-2xs 2xl:text-sm font-bold text-black opacity-80">
													{formatToPeso(price.toFixed(2))}
												</span>
												{oldPrice && (
													<span className="text-3xs 2xl:text-xs text-gray-400 line-through">
														{formatToPeso(oldPrice.toFixed(2))}
													</span>
												)}
											</div>
										</div>
										<Button
											variant="icon"
											size="icon"
											disabled={disabled}
											onClick={(e) => {
												e.stopPropagation();
												onBook?.();
											}}
											className="text-xs xl:size-8 2xl:size-10 bg-primary hover:bg-primary/80 text-white [&_svg]:size-3 2xl:[&_svg]:size-4 [&_svg]:shrink-0"
										>
											<ShoppingCart />
										</Button>
									</div>
								</div>
							</div>
						</div>
					</AccordionTrigger>

					<AccordionContent className="p-0">
						<div className="px-4 py-4 space-y-4 border-t border-gray-100">
							<div>
								<h4 className="text-xs 2xl:text-sm font-semibold tracking-tight text-gray-900 mb-2">
									Description:
								</h4>
								<p className="text-2xs 2xl:text-xs text-foreground tracking-tight leading-normal line-clamp-5">
									{description}
								</p>
							</div>

							{galleryImages.length > 0 && (
								<div>
									<h4 className="text-xs 2xl:text-sm font-semibold tracking-tight text-gray-900 mb-2">
										Other images:
									</h4>
									<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
										{galleryImages.map((img, index) => (
											<img
												key={index}
												src={img}
												onError={(e) =>
													(e.currentTarget.src = "/sf/ysm-card-fallback.png")
												}
												alt={`${name} - Image ${index + 1}`}
												className="w-full h-24 object-cover rounded-lg border border-gray-200"
											/>
										))}
									</div>
								</div>
							)}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		);
	}
);

export default ServiceAccordionCard;
