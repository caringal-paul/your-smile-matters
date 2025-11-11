import React, { useEffect, useState } from "react";
import {
	Star,
	Phone,
	Mail,
	MapPin,
	Tag,
	Book,
	Clock,
	UserCircle,
	Loader2,
	Package as PackageIcon,
} from "lucide-react";
import parse from "html-react-parser";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/core/components/base/card";
import { Badge } from "@/core/components/base/badge";
import { Button } from "@/core/components/base/button";
import { useParams } from "react-router-dom";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { useGetPackageByIdQuerySf } from "../queries/getPackageById.sf.query";
import { useBookingFormStore } from "@/store-front/store/useBookingFormStore";
import {
	formatToTableDate,
	formatToUtc,
} from "@/ami/shared/helpers/formatDate";
import { useMyCredentials } from "@/store-front/store/useMyCredentials";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/core/components/base/avatar";
import { getInitials } from "@/core/helpers/getInitials";
import { RatingAnalytics } from "@/core/types/base-response.types";
import { useGetPackageRatings } from "../queries/getPackageRatings.sf.query";
import { formatDurationByMinutes } from "@/store-front/shared/helpers/formatDuration";

const PackageDetailsPage = () => {
	const { id } = useParams();
	const { openModal, saveOriginalForm } = useBookingFormStore();
	const { myCredentials } = useMyCredentials();

	const { data: selectedPackage, isPending } = useGetPackageByIdQuerySf(id!);
	const { data: packageRatings, isPending: isRatingsLoading } =
		useGetPackageRatings(id!);

	const analytics =
		packageRatings?.data?.analytics ||
		({
			average_rating: 0,
			total_ratings: 0,
			rating_distribution: {
				one_star: 0,
				two_star: 0,
				three_star: 0,
				four_star: 0,
				five_star: 0,
			},
			rating_distribution_percentage: {
				one_star: 0,
				two_star: 0,
				three_star: 0,
				four_star: 0,
				five_star: 0,
			},
		} as RatingAnalytics);
	const ratings = packageRatings?.data?.ratings || [];

	// Package image handling - single image from the data
	const packageImage = selectedPackage?.image || "/sf/ysm-card-fallback.png";

	const [displayedCount, setDisplayedCount] = useState(5);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const displayedRatings = ratings.slice(0, displayedCount);
	const hasMore = displayedCount < ratings.length;
	const shouldShowScrollbar = displayedCount > 10;

	const handleViewMore = () => {
		setIsLoadingMore(true);
		// Simulate loading delay for better UX
		setTimeout(() => {
			setDisplayedCount((prev) => prev + 5);
			setIsLoadingMore(false);
		}, 300);
	};

	if (isPending || !selectedPackage) {
		return <>Loading</>;
	}

	// Calculate total services count
	const totalServicesCount = selectedPackage.services.reduce(
		(sum, service) => sum + service.quantity,
		0
	);

	return (
		<div className="min-h-screen bg-sf-background">
			<div className="max-w-7xl mx-auto p-6 bg-white">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					<div className="lg:col-span-3 space-y-8">
						{/* Package Main Image */}
						<div className="relative w-full h-[24em] lg:h-[32em] rounded-xl overflow-hidden border-2 border-border ring-2 ring-primary">
							<img
								src={packageImage}
								alt={selectedPackage?.name}
								className="w-full h-full object-cover"
								onError={(e) => {
									e.currentTarget.src = "/sf/ysm-card-fallback.png";
								}}
							/>
						</div>

						{/* Package Details */}
						<div className="space-y-6">
							<div>
								<div className="flex flex-row gap-4 items-center flex-wrap">
									<h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2">
										{selectedPackage?.name}
									</h1>
									<Badge
										className={`xl:text-lg xl:p-2 xl:px-4 xl:rounded-xl ${
											selectedPackage?.is_available
												? "bg-primary"
												: "bg-secondary"
										}`}
									>
										{selectedPackage?.is_available
											? "Available"
											: "Unavailable"}
									</Badge>
								</div>
								<div className="flex items-center gap-4 text-gray-600 flex-wrap">
									<span className="text-2xl font-bold text-gray-900">
										{formatToPeso(String(selectedPackage?.package_price))}
									</span>
									<div className="flex items-center gap-1">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className="w-4 h-4 fill-yellow-400 text-yellow-400"
											/>
										))}
										<span className="ml-1 text-sm">
											{analytics.average_rating.toFixed(1)}
										</span>
									</div>
								</div>
							</div>

							{/* Package Description */}
							<div className="space-y-4">
								<h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
									Package Description
								</h2>
								<p className="text-gray-700 leading-6 rich-text">
									{parse(String(selectedPackage?.description))}
								</p>
							</div>

							{/* Package Details Info */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<Card>
									<CardContent className="py-4">
										<div className="flex flex-col items-center text-center space-y-2">
											<PackageIcon className="w-8 h-8 text-primary" />
											<div>
												<p className="text-sm text-gray-600">
													Services Included
												</p>
												<p className="text-2xl font-bold text-gray-900">
													{totalServicesCount}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardContent className="py-4">
										<div className="flex flex-col items-center text-center space-y-2">
											<Clock className="w-8 h-8 text-primary" />
											<div>
												<p className="text-sm text-gray-600">Total Duration</p>
												<p className="text-2xl font-bold text-gray-900">
													{selectedPackage.custom_duration_minutes
														? formatDurationByMinutes(
																Number(selectedPackage.custom_duration_minutes)
														  )
														: formatDurationByMinutes(
																Number(selectedPackage.total_duration_minutes)
														  )}{" "}
													{/* mins */}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardContent className="py-4">
										<div className="flex flex-col items-center text-center space-y-2">
											<Star className="w-8 h-8 text-primary" />
											<div>
												<p className="text-sm text-gray-600">Looks</p>
												<p className="text-2xl font-bold text-gray-900">
													{selectedPackage.looks}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Services Included */}
							<div className="space-y-4">
								<h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
									Services Included
								</h2>
								<div className="space-y-3">
									{selectedPackage.services.map((service, index) => (
										<Card key={service._id}>
											<CardContent className="py-4">
												<div className="flex justify-between items-start">
													<div className="space-y-1">
														<h3 className="font-semibold text-gray-900">
															Service #{index + 1}
														</h3>
														<div className="flex items-center gap-4 text-sm text-gray-600">
															<span>Quantity: {service.quantity}</span>
															<span>•</span>
															<span>
																Duration:{" "}
																{formatDurationByMinutes(
																	service.duration_minutes
																)}
															</span>
														</div>
													</div>
													<div className="text-right">
														<p className="font-semibold text-gray-900">
															{formatToPeso(String(service.total_price))}
														</p>
														<p className="text-sm text-gray-600">
															{formatToPeso(String(service.price_per_unit))}{" "}
															each
														</p>
													</div>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</div>
						</div>

						{/* Reviews Section */}
						<div className="space-y-2">
							{/* Rating Breakdown */}
							<Card>
								<CardContent className="py-6 space-y-4">
									<div className="flex items-baseline gap-3">
										<h2 className="text-3xl font-semibold text-gray-900">
											{analytics.average_rating.toFixed(1)}
										</h2>
										<div className="flex items-center gap-1">
											<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
											<span className="text-sm text-gray-600">
												({analytics.total_ratings}{" "}
												{analytics.total_ratings === 1 ? "review" : "reviews"})
											</span>
										</div>
									</div>

									<div className="space-y-3">
										{[
											{
												label: "Excellent",
												count: analytics.rating_distribution.five_star,
												percentage:
													analytics.rating_distribution_percentage.five_star,
											},
											{
												label: "Very Good",
												count: analytics.rating_distribution.four_star,
												percentage:
													analytics.rating_distribution_percentage.four_star,
											},
											{
												label: "Average",
												count: analytics.rating_distribution.three_star,
												percentage:
													analytics.rating_distribution_percentage.three_star,
											},
											{
												label: "Poor",
												count: analytics.rating_distribution.two_star,
												percentage:
													analytics.rating_distribution_percentage.two_star,
											},
											{
												label: "Terrible",
												count: analytics.rating_distribution.one_star,
												percentage:
													analytics.rating_distribution_percentage.one_star,
											},
										].map((item, index) => (
											<div key={index} className="flex items-center gap-3">
												<span className="text-sm text-gray-700 w-20">
													{item.label}
												</span>
												<div className="flex-1 bg-gray-200 rounded-full h-2.5">
													<div
														className="bg-primary h-2.5 rounded-full transition-all duration-300"
														style={{ width: `${item.percentage}%` }}
													/>
												</div>
												<span className="text-sm font-medium text-gray-700 w-12 text-right">
													{item.count}
												</span>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							{/* Individual Reviews */}
							<div
								className={`space-y-2 ${
									shouldShowScrollbar
										? "max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
										: ""
								}`}
							>
								{displayedRatings.map((rating) => (
									<Card key={rating._id}>
										<CardContent>
											<div className="space-y-4">
												<div className="flex items-start gap-4">
													<Avatar>
														<AvatarImage
															src={rating.customer_id.profile_image || ""}
															alt="Customer avatar"
															className="size-10"
														/>
														<AvatarFallback>
															{getInitials(
																`${rating.customer_id.first_name} ${rating.customer_id.last_name}`
															)}
														</AvatarFallback>
													</Avatar>

													<div className="flex-1 space-y-1">
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-1">
																<UserCircle className="w-4 h-4 text-gray-400" />
																<h4 className="font-semibold text-gray-900">
																	{rating.customer_id.first_name}{" "}
																	{rating.customer_id.last_name}
																</h4>
															</div>
															<div className="flex items-center gap-1 text-xs">
																<Clock className="size-3 text-gray-400" />
																<h4 className="font-light text-gray-400">
																	{formatToTableDate(String(rating.created_at))}
																</h4>
															</div>
														</div>
														<div className="flex items-center gap-1 leading-none">
															{[...Array(rating.rating)].map((_, i) => (
																<Star
																	key={i}
																	className="w-4 h-4 fill-yellow-400 text-yellow-400"
																/>
															))}
															<span className="ml-1 text-sm">
																{rating.rating}
															</span>
														</div>
													</div>
												</div>

												<p className="text-foreground text-sm">
													{rating.comment}
												</p>

												{/* Business Response */}
												{rating.response && (
													<div className="ml-14 p-3 bg-blue-50 border-l-4 border-primary rounded">
														<div className="flex items-center gap-2 mb-2">
															<Badge variant="outline" className="text-xs">
																Business Response
															</Badge>
															{rating.responded_at && (
																<span className="text-xs text-gray-500">
																	{formatToTableDate(
																		String(rating.responded_at)
																	)}
																</span>
															)}
														</div>
														<p className="text-sm text-gray-700">
															{rating.response}
														</p>
													</div>
												)}
											</div>
										</CardContent>
									</Card>
								))}
							</div>

							{/* View More Button */}
							{hasMore && (
								<div className="flex justify-center pt-4">
									<Button
										onClick={handleViewMore}
										disabled={isLoadingMore}
										variant="ghost"
										className="text-secondary font-medium hover:text-secondary/80 transition-colors tracking-tight text-base hover:underline"
									>
										{isLoadingMore ? (
											<>
												<Loader2 className="w-4 h-4 mr-2 animate-spin" />
												Loading...
											</>
										) : (
											`View More... (${
												ratings.length - displayedCount
											} remaining)`
										)}
									</Button>
								</div>
							)}

							{/* No Reviews Message */}
							{ratings.length === 0 && !isRatingsLoading && (
								<div className="text-center py-12">
									<Star className="w-12 h-12 mx-auto text-gray-300 mb-3" />
									<p className="text-gray-500">No reviews yet</p>
									<p className="text-sm text-gray-400">
										Be the first to review this package!
									</p>
								</div>
							)}
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						<Button
							onClick={() => {
								const initialData = {
									services: selectedPackage.services.map((service) => ({
										_id: service.service_id,
										quantity: service.quantity,
										price_per_unit: service.price_per_unit,
										total_price: service.total_price,
										duration_minutes: service.duration_minutes,
									})),

									is_customized: false,
									customer_id: myCredentials?._id,
									customization_notes: null,
									package_id: selectedPackage._id,

									booking_date: formatToUtc(new Date()),
									start_time: "",
									end_time: "",
									session_duration_minutes:
										selectedPackage.custom_duration_minutes ||
										Number(selectedPackage.total_duration_minutes || 0),
									location: "",

									photographer_id: "",
									photographer_name: null,
									theme: null,
									special_requests: null,

									total_amount: selectedPackage.package_price,
									discount_amount: 0,
									promo_id: null,
									final_amount: selectedPackage.package_price,
									amount_paid: 0,
									method_of_payment: null,
									payment_images: [],

									is_booking_sent: false,
									status: "Pending" as const,
									booking_reference: "",
								};

								openModal();
								saveOriginalForm(initialData);
							}}
							variant="sf"
							className="w-full text-2xl py-8 px-6"
						>
							<Book className="size-6" />
							Book Now
						</Button>

						{/* Location */}
						<Card>
							<CardContent className="flex flex-col gap-4 py-4 px-6">
								<CardTitle className="text-2xl font-semibold">
									Our Address
								</CardTitle>

								{/* Google Map Embed (Manila Pin) */}
								<div className="w-full h-56 rounded-lg overflow-hidden border">
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7723.93452297929!2d120.97999365!3d14.59951265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f5!3m3!1m2!1s0x3397ca0d41eaa38d%3A0x1f8f1f4b5bcb35f6!2sManila%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1693214288215!5m2!1sen!2sph"
										width="100%"
										height="100%"
										allowFullScreen={false}
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									></iframe>
								</div>

								<div className="space-y-1 rounded-xl">
									{/* Location */}
									<div className="flex items-center gap-2 text-gray-700">
										<MapPin className="w-4 h-4 text-primary" />
										<span>Manila, Philippines</span>
									</div>

									{/* Mobile */}
									<div className="flex items-center gap-2 text-gray-700">
										<Phone className="w-4 h-4 text-primary" />
										<span>+63 992 855 9444</span>
									</div>

									{/* Email */}
									<div className="flex items-center gap-2 text-gray-700">
										<Mail className="w-4 h-4 text-primary" />
										<span className="truncate">ysmphotography@yopmail.com</span>
									</div>

									{/* Tag / Category */}
									<div className="flex items-center gap-2 text-gray-700">
										<Tag className="w-4 h-4 text-primary" />
										<span>Home Service</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PackageDetailsPage;
