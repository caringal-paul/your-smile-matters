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

interface Review {
	id: string;
	author: string;
	avatar: string;
	rating: number;
	date: string;
	text: string;
}

export type Service = {
	_id: string;
	name: string;
	description: string;
	category: string;
	price: number;
	old_price?: number; // optional, not always present
	duration_minutes: number | null;
	is_available: boolean;
	service_gallery: string[];
	is_active: boolean;
	created_by: string;
	updated_by: string;
	deleted_by: string | null;
	retrieved_by: string | null;
	deleted_at: string | null;
	retrieved_at: string | null;
	__v: number;
	created_at: string; // ISO date string
	updated_at: string; // ISO date string
};

export const ALL_SERVICES: Service[] = [
	{
		_id: "68db7cd6a46929dc4e9479f0",
		name: "Bridal Makeup",
		description: `
			<p><b>💄 Bridal Makeup</b> includes a <i>trial session</i> to perfect your look before the big day. 
			We use ✨ <b>waterproof, long-lasting products</b> to keep you glowing all day.</p>
			<ul>
				<li>✅ Personalized consultation</li>
				<li>✅ Trial makeup session</li>
				<li>✅ Premium branded products</li>
			</ul>
			<p><s>Old price: ₱3000</s> 👉 <b>Now only ₱2500!</b></p>
		`,
		category: "Beauty",
		price: 2500,
		old_price: 3000,
		duration_minutes: 120,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
			"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
			"https://images.unsplash.com/photo-1516975080664-ed2fc6a32937",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479f1",
		name: "Party Makeup",
		description: `
			<p>✨ Look <b>fabulous</b> at your next party with our <i>customized</i> glam looks.</p>
			<ol>
				<li>🎨 Smokey eyes</li>
				<li>💎 Glitter highlights</li>
				<li>🌟 Natural glowing finish</li>
			</ol>
			<p><s>Regular ₱1500</s> 👉 <b>Now only ₱1200!</b></p>
		`,
		category: "Beauty",
		price: 1200,
		duration_minutes: 90,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1560066984-138dadb4c035",
			"https://images.unsplash.com/photo-1583001809809-a2b0c6e3f22f",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479f2",
		name: "Hair Styling",
		description: `
			<p>💇 Get a <i>professional</i> hairstyle tailored to your event. Perfect for <b>weddings</b>, parties, or casual outings.</p>
			<ul>
				<li>🌹 Elegant updos</li>
				<li>🌊 Beach waves</li>
				<li>✨ Sleek straightening</li>
			</ul>
			<p><b>Pro tip:</b> Book with makeup for a <s>10% discount</s> 🎁 <i>(limited time)</i>.</p>
		`,
		category: "Styling",
		price: 800,
		duration_minutes: 60,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1562322140-8baeececf3df",
			"https://images.unsplash.com/photo-1605497788044-5a32c7078486",
			"https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479ed",
		name: "Photo Editing",
		description: `
			<p>📸 Enhance your photos with <b>professional editing</b>. We make your shots <i>magazine-ready</i>!</p>
			<ol>
				<li>✨ Skin smoothing</li>
				<li>💡 Lighting adjustments</li>
				<li>🖼 Background cleanup</li>
			</ol>
			<p><s>₱500</s> 👉 <b>Now ₱400 per photo!</b></p>
		`,
		category: "Editing",
		price: 400,
		duration_minutes: 30,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1504203700686-0f3ec2a5dd12",
			"https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479ed",
		name: "Portrait Photography",
		description: `
			<p>📷 Get timeless <b>portrait photos</b> with our expert photographers. Perfect for <i>branding</i> or family shoots.</p>
			<ul>
				<li>🏢 Studio setup</li>
				<li>🌳 Outdoor natural light</li>
				<li>🖼 Up to 20 edited shots</li>
			</ul>
			<p><b>Special:</b> Free <i>framed print</i> 🎁 this month only!</p>
		`,
		category: "Photography",
		price: 2000,
		duration_minutes: 90,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
			"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479ef",
		name: "Event Photography",
		description: `
			<p>🎉 Our <b>Event Photography</b> captures <i>every important moment</i> of your gathering. Perfect for corporate & social occasions.</p>
			<ol>
				<li>📌 Coverage of highlights</li>
				<li>🤩 Candid moments</li>
				<li>👥 Group portraits</li>
			</ol>
			<p><b>Deal:</b> Free <i>editing</i> on 10 selected photos 🎁</p>
		`,
		category: "Photography",
		price: 3500,
		duration_minutes: 240,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
			"https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479ed",
		name: "Videography",
		description: `
			<p>🎥 <b>Videography</b> that brings your story to life. From <i>weddings</i> to launches, we create unforgettable films.</p>
			<ul>
				<li>📹 HD & 4K recording</li>
				<li>🎬 Professional editing</li>
				<li>🌟 Highlight reel included</li>
			</ul>
			<p><s>₱5000</s> 👉 <b>Now ₱4500</b> (early bookings) 🎁</p>
		`,
		category: "Video",
		price: 4500,
		duration_minutes: 300,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
			"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479f7",
		name: "Wedding Photography",
		description: `
			<p>💍 Make your <b>wedding day</b> unforgettable with our <i>full-coverage</i> photography service.</p>
			<ol>
				<li>📸 Pre-wedding shoot</li>
				<li>💒 Ceremony coverage</li>
				<li>🎉 Reception highlights</li>
			</ol>
			<p><b>Bonus:</b> Free <i>engagement shoot</i> included 💝</p>
		`,
		category: "Photography",
		price: 6000,
		duration_minutes: 480,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1529634893481-bd1c1c8f84b0",
			"https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
];

const ServiceDetailsPage = () => {
	const { id } = useParams();

	const selectedService = ALL_SERVICES.find((service) => service._id == id);

	const serviceImages = [
		"/sf/sf-service-1.jpg",
		"/sf/sf-service-2.jpg",
		"/sf/sf-service-3.jpg",
		"/sf/sf-service-4.jpg",
	];

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

	return (
		<div className="min-h-screen bg-sf-background">
			<div className="max-w-7xl mx-auto p-6 bg-white">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					<div className="lg:col-span-3 space-y-8">
						<div className="flex flex-col lg:flex-row gap-4">
							{/* Main Image (fills entire div) */}
							<div className="flex-1 relative">
								<div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-border ring-2 ring-primary">
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
