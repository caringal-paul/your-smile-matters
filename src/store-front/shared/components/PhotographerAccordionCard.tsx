import { Badge } from "@/core/components/base/badge";
import { Button } from "@/core/components/base/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/core/components/base/accordion";
import {
	User,
	Mail,
	Phone,
	Calendar,
	Camera,
	Star,
	Clock,
	AlertCircle,
} from "lucide-react";
import { Label } from "@/core/components/base/label";
import React from "react";
import parse from "html-react-parser";

type WeeklyScheduleItem = {
	day_of_week: string;
	start_time: string;
	end_time: string;
	is_available: boolean;

	notes?: string | null;
};

type DateOverride = {
	date: Date;
	is_available: boolean;
	custom_hours?: {
		start_time: string;
		end_time: string;
	} | null;
	reason?: string;
	notes?: string;
};

type PhotographerAccordionCardProps = {
	id: string;
	name: string;
	profile_image?: string | null;
	email: string;
	mobile_number?: string | null;
	bio?: string | null;
	specialties: string[]; // ServiceCategory[]
	photo_gallery?: string[] | null;
	weekly_schedule?: WeeklyScheduleItem[] | null;
	date_overrides?: DateOverride[] | null;
	total_bookings: number;
	completed_bookings: number;
	booking_lead_time_hours?: number | null;
	disabled?: boolean;
	onSelect?: () => void;
	isSelected?: boolean;
};

const PhotographerAccordionCard = React.memo(
	({
		id,
		name,
		profile_image,
		email,
		mobile_number,
		bio = "No bio available.",
		specialties,
		photo_gallery,
		weekly_schedule,
		date_overrides,
		total_bookings,
		completed_bookings,
		booking_lead_time_hours = 24,
		disabled = false,
		onSelect,
		isSelected = false,
	}: PhotographerAccordionCardProps) => {
		const mainImage = profile_image || "/sf/ysm-profile-fallback.jpg";
		const galleryImages = photo_gallery || [];
		const completionRate =
			total_bookings > 0
				? Math.round((completed_bookings / total_bookings) * 100)
				: 0;

		return (
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem
					value={id}
					className={`bg-white rounded-lg overflow-hidden ${
						disabled ? "opacity-65" : "opacity-100"
					} ${
						isSelected
							? "border-primary border-2 shadow-md shadow-primary/80"
							: "border-border border-[1px] shadow-md"
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
											(e.currentTarget.src = "/sf/ysm-profile-fallback.jpg")
										}
										alt={name}
										className="w-14 h-14 2xl:w-16 2xl:h-16 object-cover rounded-full"
									/>
								</div>
								<div className="flex-1 flex flex-col justify-between min-w-0">
									<div className="flex-1 min-w-0">
										<h3 className="text-sm 2xl:text-base overflow-hidden whitespace-nowrap text-ellipsis max-w-[35em] 2xl:max-w-[16em] font-semibold text-foreground text-left tracking-tight">
											{name}
										</h3>
									</div>

									<div className="flex justify-between items-center">
										<div className="space-y-1 2xl:space-y-1">
											<div className="flex flex-row gap-1 flex-wrap">
												{specialties.slice(0, 2).map((specialty, index) => (
													<Badge
														key={index}
														className="xl:text-3xs 2xl:text-xs bg-primary text-white tracking-tight hover:bg-primary hover:cursor-default"
													>
														{specialty}
													</Badge>
												))}
												{specialties.length > 2 && (
													<Badge className="xl:text-3xs 2xl:text-2xs bg-secondary text-white tracking-tight hover:bg-secondary hover:cursor-default">
														+{specialties.length - 2}
													</Badge>
												)}
											</div>

											<div className="flex items-center space-x-4 whitespace-nowrap">
												<Label className="text-2xs font-normal text-gray-600 [&_svg]:size-3 [&_svg]:shrink-0 flex gap-1 items-center">
													<Star className="fill-yellow-400 text-yellow-400" />
													{completionRate}% completion
												</Label>
												<Label className="text-2xs font-normal text-gray-600 [&_svg]:size-3 [&_svg]:shrink-0 flex gap-1 items-center">
													<Calendar />
													{total_bookings} bookings
												</Label>
											</div>
										</div>
										<Button
											variant="icon"
											size="icon"
											disabled={disabled}
											onClick={(e) => {
												e.stopPropagation();
												onSelect?.();
											}}
											className="text-xs xl:size-8 2xl:size-10 bg-primary hover:bg-primary/80 text-white [&_svg]:size-3 2xl:[&_svg]:size-4 [&_svg]:shrink-0"
										>
											<User />
										</Button>
									</div>
								</div>
							</div>
						</div>
					</AccordionTrigger>

					<AccordionContent className="p-0">
						<div className="px-4 py-4 space-y-4 border-t border-gray-100">
							{/* Contact Information */}
							<div>
								<h4 className="text-xs 2xl:text-sm font-semibold tracking-tight text-gray-900 mb-2">
									Contact Information:
								</h4>
								<div className="space-y-1">
									<Label className="text-2xs 2xl:text-xs text-foreground tracking-tight flex gap-2 items-center">
										<Mail className="size-3 text-gray-500" />
										{email}
									</Label>
									{mobile_number && (
										<Label className="text-2xs 2xl:text-xs text-foreground tracking-tight flex gap-2 items-center">
											<Phone className="size-3 text-gray-500" />
											{mobile_number}
										</Label>
									)}
								</div>
							</div>

							{/* Bio */}
							<div>
								<h4 className="text-xs 2xl:text-sm font-semibold tracking-tight text-gray-900 mb-2">
									About:
								</h4>
								<p className="text-2xs 2xl:text-xs text-foreground tracking-tight leading-normal line-clamp-3 rich-text">
									{bio
										? parse(bio)
										: "This photographer has not provided a bio."}
								</p>
							</div>

							{/* All Specialties */}
							<div>
								<h4 className="text-xs 2xl:text-sm font-semibold tracking-tight text-gray-900 mb-2">
									Specialties:
								</h4>
								<div className="flex flex-wrap gap-1">
									{specialties.map((specialty, index) => (
										<Badge key={index} className="text-3xs 2xl:text-xs">
											{specialty}
										</Badge>
									))}
								</div>
							</div>

							{/* Booking Details */}
							<div>
								<h4 className="text-xs 2xl:text-sm font-semibold tracking-tight text-gray-900 mb-2">
									Booking Information:
								</h4>
								<div className="grid grid-cols-2 gap-4 text-2xs 2xl:text-xs">
									<div>
										<span className="text-gray-600">Total Bookings:</span>
										<span className="ml-2 font-semibold">{total_bookings}</span>
									</div>
									<div>
										<span className="text-gray-600">Completed:</span>
										<span className="ml-2 font-semibold">
											{completed_bookings}
										</span>
									</div>
									<div>
										<span className="text-gray-600">Success Rate:</span>
										<span className="ml-2 font-medium text-green-500">
											{completionRate}%
										</span>
									</div>
									<div>
										<span className="text-gray-600">Lead Time:</span>
										<span className="ml-2 font-medium">
											{booking_lead_time_hours}h advance
										</span>
									</div>
								</div>
							</div>

							{/* Weekly Schedule */}
							{weekly_schedule && weekly_schedule.length > 0 && (
								<div>
									<h4 className="text-xs 2xl:text-sm font-semibold tracking-tight text-gray-900 mb-2 flex gap-1 items-center">
										<Clock className="size-3" />
										Weekly Schedule:
									</h4>
									<div className="space-y-2">
										{weekly_schedule.map((schedule, index) => (
											<div
												key={index}
												className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
											>
												<div className="flex items-center gap-2">
													<span className="text-2xs 2xl:text-xs font-semibold min-w-[70px]">
														{schedule.day_of_week}
													</span>
													{schedule.is_available ? (
														<span className="text-2xs 2xl:text-xs text-green-500">
															{schedule.start_time} - {schedule.end_time}
														</span>
													) : (
														<span className="text-2xs 2xl:text-xs text-destructive">
															Unavailable
														</span>
													)}
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Date Overrides */}
							{date_overrides && date_overrides.length > 0 && (
								<div>
									<h4 className="text-xs 2xl:text-sm font-semibold tracking-tight text-gray-900 mb-2 flex gap-1 items-center">
										<AlertCircle className="size-3" />
										Schedule Exceptions:
									</h4>
									<div className="space-y-2">
										{date_overrides.slice(0, 3).map((override, index) => (
											<div
												key={index}
												className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg"
											>
												<div className="flex flex-col">
													<span className="text-2xs 2xl:text-xs font-medium">
														{new Date(override.date).toLocaleDateString()}
													</span>
													{override.reason && (
														<span className="text-3xs text-gray-600">
															{override.reason}
														</span>
													)}
												</div>
												<div className="text-right">
													{override.is_available ? (
														override.custom_hours ? (
															<span className="text-2xs text-blue-500">
																{override.custom_hours.start_time} -{" "}
																{override.custom_hours.end_time}
															</span>
														) : (
															<span className="text-2xs text-green-500">
																Available
															</span>
														)
													) : (
														<span className="text-2xs text-destructive">
															Unavailable
														</span>
													)}
												</div>
											</div>
										))}
										{date_overrides.length > 3 && (
											<p className="text-3xs text-gray-500 text-center">
												+{date_overrides.length - 3} more exceptions
											</p>
										)}
									</div>
								</div>
							)}

							{/* Photo Gallery */}
							{galleryImages.length > 0 && (
								<div>
									<h4 className="text-xs 2xl:text-sm font-semibold tracking-tight text-gray-900 mb-2 flex gap-1 items-center">
										<Camera className="size-3" />
										Portfolio ({galleryImages.length}/9):
									</h4>
									<div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-xl">
										{galleryImages.map((img, index) => (
											<img
												key={index}
												src={img}
												onError={(e) =>
													(e.currentTarget.src = "/sf/ysm-card-fallback.png")
												}
												alt={`${name} - Portfolio ${index + 1}`}
												className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition-opacity cursor-pointer"
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

PhotographerAccordionCard.displayName = "PhotographerAccordionCard";

export default PhotographerAccordionCard;
