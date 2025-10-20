import React, { useEffect, useState } from "react";
import {
	Star,
	Phone,
	Mail,
	MapPin,
	Tag,
	Book,
	User,
	Clock,
	UserCircle,
} from "lucide-react";
import parse from "html-react-parser";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/core/components/base/card";
import { Badge } from "@/core/components/base/badge";
import { Button } from "@/core/components/base/button";
import { useParams } from "react-router-dom";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { useGetServiceByIdQuerySf } from "../queries/getServiceById.sf.query";

type Review = {
	id: string;
	author: string;
	avatar: string;
	rating: number;
	date: string;
	text: string;
};

const ServiceDetailsPage = () => {
	const { id } = useParams();

	const { data: selectedService, isPending } = useGetServiceByIdQuerySf(id!);

	const serviceImages = selectedService?.service_gallery || [];

	const reviews: Review[] = [
		{
			id: "1",
			author: "John Doe",
			avatar:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
			rating: 5,
			date: "2 days ago",
			text: "Ace Estafic was very logical and creative at the same time",
		},
		{
			id: "2",
			author: "James San",
			avatar:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
			rating: 5,
			date: "1 week ago",
			text: "Ace Estafic was very logical and creative at the same time",
		},
	];

	const [current, setCurrent] = useState(0);

	// autoplay fade effect
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent((prev) => (prev + 1) % serviceImages.length);
		}, 5000);

		return () => clearInterval(timer);
	}, [serviceImages.length]);

	if (isPending) {
		return <>Loading</>;
	}

	return (
		<div className="min-h-screen bg-sf-background">
			<div className="max-w-7xl mx-auto p-6 bg-white">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					<div className="lg:col-span-3 space-y-8">
						<div className="flex flex-col lg:flex-row gap-4">
							{/* Main Image (fills entire div) */}
							<div className="flex-1 relative">
								<div className="relative w-full h-[16em] aspect-square xl:aspect-auto xl:h-full rounded-xl overflow-hidden border-2 border-border ring-2 ring-primary">
									<AnimatePresence mode="wait">
										<motion.img
											key={current}
											src={
												selectedService?.service_gallery[current] ||
												"/sf/ysm-card-fallback.png"
											}
											alt={`Service ${current + 1}`}
											className="absolute inset-0 w-full h-full object-cover"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.65 }}
											onError={(e) => {
												e.currentTarget.src = "/sf/ysm-card-fallback.png";
											}}
										/>
									</AnimatePresence>
								</div>
							</div>

							{/* Thumbnails (Right Side) */}
							<div className="w-full lg:w-40 grid grid-cols-4 lg:grid-cols-1 gap-3 ">
								{selectedService?.service_gallery.map((img, index) => (
									<img
										key={index}
										src={img || "/sf/ysm-card-fallback.png"}
										onError={(e) => {
											e.currentTarget.src = "/sf/ysm-card-fallback.png";
										}}
										alt={`Service ${index + 1}`}
										onClick={() => setCurrent(index)}
										className={`w-full h-20 sm:h-24 lg:h-28 object-cover rounded-lg cursor-pointer transition-opacity  border-2 border-border    ${
											current === index
												? "ring-2 ring-primary"
												: "hover:opacity-80"
										}`}
									/>
								))}
							</div>
						</div>

						{/* ---------------------------------------------------------------------- */}

						{/* Service Details */}
						<div className="space-y-6">
							<div>
								<div className="flex flex-row gap-4 items-center">
									<h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2">
										{selectedService?.name}
									</h1>
									<Badge
										className={`xl:text-lg xl:p-2 xl:px-4 xl:rounded-xl ${
											selectedService?.is_available
												? "bg-primary"
												: "bg-secondary"
										}`}
									>
										{" "}
										{selectedService?.is_available
											? "Available"
											: "Unavailable"}
									</Badge>
								</div>
								<div className="flex items-center gap-4 text-gray-600">
									<span className="text-2xl font-bold text-gray-900">
										{formatToPeso(String(selectedService?.price))}
									</span>
									{!!selectedService?.old_price && (
										<span className="text-sm text-gray-500 line-through">
											{formatToPeso(String(selectedService?.old_price))}
										</span>
									)}
									<div className="flex items-center gap-1">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className="w-4 h-4 fill-yellow-400 text-yellow-400"
											/>
										))}
										<span className="ml-1 text-sm">5.0</span>
									</div>
								</div>
							</div>

							{/* Service Description */}
							<div className="space-y-4">
								<h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
									Service Description
								</h2>
								<p className="text-gray-700 leading-6 rich-text">
									{parse(String(selectedService?.description))}
								</p>
							</div>

							{/* TODO CHANGE TO PACKAGE SUGGESTION */}
							{/* Service Provider */}
							{/* <div className="bg-gray-50 rounded-lg p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								So You Want A Best Men's Haircut At Our Hair Service?
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<img
											src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
											alt="Big Times Barber Shop"
											className="w-12 h-12 rounded-full object-cover"
										/>
										<div>
											<h3 className="font-semibold text-gray-900">
												Big Times Barber Shop
											</h3>
											<div className="flex items-center gap-1">
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														className="w-4 h-4 fill-yellow-400 text-yellow-400"
													/>
												))}
												<span className="text-sm text-gray-600 ml-1">4.8</span>
											</div>
										</div>
									</div>
									<p className="text-gray-600 text-sm">
										Professional barber with 10+ years experience
									</p>
								</div>

								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<img
											src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
											alt="Big Times Barber Shop"
											className="w-12 h-12 rounded-full object-cover"
										/>
										<div>
											<h3 className="font-semibold text-gray-900">
												Big Times Barber Shop
											</h3>
											<div className="flex items-center gap-1">
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														className="w-4 h-4 fill-yellow-400 text-yellow-400"
													/>
												))}
												<span className="text-sm text-gray-600 ml-1">4.8</span>
											</div>
										</div>
									</div>
									<p className="text-gray-600 text-sm">
										Expert in modern and classic haircuts
									</p>
								</div>
							</div>
						</div> */}
						</div>
						{/* ---------------------------------------------------------------------- */}

						{/* Reviews Section */}
						<div className="space-y-2">
							{/* Rating Breakdown */}
							<Card>
								<CardContent className="py-6 space-y-4">
									<h2 className="text-3xl font-semibold text-gray-900">
										Reviews: 399
									</h2>

									{[
										{ label: "Excellent", count: 285, percentage: 95 },
										{ label: "Very Good", count: 15, percentage: 85 },
										{ label: "Average", count: 8, percentage: 70 },
										{ label: "Poor", count: 3, percentage: 55 },
										{ label: "Terrible", count: 1, percentage: 40 },
									].map((item, index) => (
										<div key={index} className="flex items-center gap-3">
											<span className="text-sm text-gray-700 w-20">
												{item.label}
											</span>
											<div className="flex-1 bg-gray-200 rounded-full h-2">
												<div
													className="bg-primary h-2 rounded-full transition-all duration-300"
													style={{ width: `${item.percentage}%` }}
												/>
											</div>
											<span className="text-sm text-gray-700 w-8">
												{item.count}
											</span>
										</div>
									))}
								</CardContent>
							</Card>

							{/* Individual Reviews */}
							<div className="space-y-2">
								{reviews.map((review) => (
									<Card>
										<CardContent>
											<div key={review.id} className="space-y-4">
												<div className="flex items-start gap-4">
													<img
														src={review.avatar}
														alt={review.author}
														className="w-14 h-14 rounded-full object-cover"
													/>
													<div className="flex-1 space-y-1">
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-1">
																<UserCircle className="w-4 h-4 text-gray-400" />
																<h4 className="font-semibold text-gray-900">
																	{review.author}
																</h4>
															</div>
															<div className="flex items-center gap-1 text-xs">
																<Clock className="size-3 text-gray-400" />
																<h4 className="font-light text-gray-400">
																	{review.date}
																</h4>
															</div>
														</div>
														<div className="flex items-center gap-1 leading-none">
															{[...Array(review.rating)].map((_, i) => (
																<Star
																	key={i}
																	className="w-4 h-4 fill-yellow-400 text-yellow-400"
																/>
															))}
															<span className="ml-1 text-sm">5.0</span>
														</div>
													</div>
												</div>

												<p className="text-foreground text-sm line-clamp-4 text-ellipsis overflow-hidden max-h-[16em]">
													{review.text}
												</p>
											</div>
										</CardContent>
									</Card>
								))}
							</div>

							<button className="text-secondary font-medium hover:text-secondary/80 transition-colors tracking-tight text-base hover:underline flex mx-auto">
								View More...
							</button>
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6 ">
						<Button
							onClick={() => {
								console.log("Book now!");
							}}
							variant="sf"
							className="w-full text-2xl py-8 px-6"
						>
							<Book className="size-6" />
							Book Now
						</Button>

						{/* <Card>
							<CardContent className="flex flex-col gap-6 py-4 px-6">
								<CardTitle className="text-2xl font-semibold">
									Time Availability
								</CardTitle>
								<div className="grid grid-cols-2 gap-y-3 leading-none">
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between">
										Monday
									</h2>
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between whitespace-nowrap ml-3">
										8:00-16:00
									</h2>
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between">
										Tuesday
									</h2>
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between whitespace-nowrap ml-3">
										12:00-15:00
									</h2>
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between">
										Wednesday
									</h2>
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between whitespace-nowrap ml-3">
										9:00-13:00
									</h2>
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between">
										Thursday
									</h2>
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between whitespace-nowrap ml-3">
										8:00-16:00
									</h2>
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between">
										Friday
									</h2>
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between whitespace-nowrap ml-3">
										Close
									</h2>
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between">
										Saturday
									</h2>
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between whitespace-nowrap ml-3">
										8:00-16:00
									</h2>
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between">
										Sunday
									</h2>
									<h2 className="text-base font-light tracking-tight text-gray-500 justify-between whitespace-nowrap ml-3">
										10:00-20:00
									</h2>
								</div>
							</CardContent>
						</Card> */}

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

								<div className="space-y-1  rounded-xl">
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

export default ServiceDetailsPage;
