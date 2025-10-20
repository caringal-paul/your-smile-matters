import { useEffect, useState } from "react";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceCard } from "@/store-front/shared/components/ServiceCard";
import CategoriesFilterCard from "../components/CategoriesFilterCard";
import PricingFilterCard from "../components/PricingFilterCard";
import { Label } from "@/core/components/base/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";
import { useNavigate } from "react-router-dom";
import { useBookingFormStore } from "@/store-front/store/useBookingFormStore";
import { formatToUtc } from "@/ami/shared/helpers/formatDate";
import { useGetAllServicesQuerySf } from "../queries/getServices.sf.query";
import { useMyCredentials } from "@/store-front/store/useMyCredentials";

const ServicePage = () => {
	const navigate = useNavigate();

	const { openModal, saveOriginalForm } = useBookingFormStore();

	const [currentPage, setCurrentPage] = useState(1);
	const servicesPerPage = 9;

	const { myCredentials } = useMyCredentials();

	const { data: allServices = [], isPending } = useGetAllServicesQuerySf();

	// const allServices: Service[] = [
	// 	{
	// 		_id: "68db7cd6a46929dc4e9479f0",
	// 		name: "Bridal Makeup",
	// 		description:
	// 			"<p><b>💍 Bridal Makeup</b> includes a <i>trial session</i> to perfect your look before the big day.</p><ul><li>✨ <b>Consultation</b> for personalized style</li><li>💄 <i>Premium waterproof products</i></li><li>📸 <b>Camera-ready finish</b></li></ul><p><s>Old Price: 3000</s> <b>Now only 2500!</b></p>",
	// 		category: "Beauty",
	// 		price: 2500,
	// 		old_price: 3000,
	// 		duration_minutes: 120,
	// 		is_available: true,
	// 		service_gallery: [
	// 			"https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
	// 			"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
	// 			"https://images.unsplash.com/photo-1516975080664-ed2fc6a32937",
	// 		],
	// 	},
	// 	{
	// 		_id: "68db7cd6a46929dc4e9479ef",
	// 		name: "Event Photography",
	// 		description:
	// 			"<p><b>📷 Event Photography</b> captures <i>every important moment</i> of your gathering.</p><ol><li>🎉 <b>Corporate & Social Coverage</b></li><li>🤵 <i>Candid Highlights</i></li><li>👨‍👩‍👧 Group Portraits</li></ol><p><b>Special Deal:</b> Free editing on 10 selected photos!</p>",
	// 		category: "Photography",
	// 		price: 3500,
	// 		duration_minutes: 240,
	// 		is_available: true,
	// 		service_gallery: [
	// 			"https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
	// 			"https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
	// 		],
	// 	},
	// 	{
	// 		_id: "68db7cd6a46929dc4e9479f2",
	// 		name: "Hair Styling",
	// 		description:
	// 			"<p><b>💇 Hair Styling</b> tailored to your <i>special event</i>.</p><ul><li>👑 Elegant Updos</li><li>🌊 Beach Waves</li><li>✨ Sleek Straightening</li></ul><p><b>Pro Tip:</b> Book with makeup for a <s>10% discount</s>.</p>",
	// 		category: "Styling",
	// 		price: 800,
	// 		duration_minutes: 60,
	// 		is_available: true,
	// 		service_gallery: [
	// 			"https://images.unsplash.com/photo-1562322140-8baeececf3df",
	// 			"https://images.unsplash.com/photo-1605497788044-5a32c7078486",
	// 			"https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1",
	// 		],
	// 	},
	// 	{
	// 		_id: "68db7cd6a46929dc4e9479f1",
	// 		name: "Party Makeup",
	// 		description:
	// 			"<p><b>💃 Party Makeup</b> for a <i>glamorous</i> night out.</p><ol><li>🔥 Smokey Eyes</li><li>✨ Glitter Highlights</li><li>🌟 Natural Glow Finish</li></ol><p><s>Regular 1500</s> <b>Now only 1200!</b></p>",
	// 		category: "Beauty",
	// 		price: 1200,
	// 		duration_minutes: 90,
	// 		is_available: true,
	// 		service_gallery: [
	// 			"https://images.unsplash.com/photo-1560066984-138dadb4c035",
	// 			"https://images.unsplash.com/photo-1583001809809-a2b0c6e3f22f",
	// 		],
	// 	},
	// 	{
	// 		_id: "68db7cd6a46929dc4e9479ed",
	// 		name: "Photo Editing",
	// 		description:
	// 			"<p><b>🖼️ Photo Editing</b> for stunning transformations.</p><ul><li>💎 Skin Retouching</li><li>🎨 Color Correction</li><li>🌅 Background Cleanup</li></ul><p><b>Price:</b> 500 per photo</p>",
	// 		category: "Other",
	// 		price: 500,
	// 		duration_minutes: null,
	// 		is_available: true,
	// 		service_gallery: [
	// 			"https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
	// 		],
	// 	},
	// 	{
	// 		_id: "68db7cd6a46929dc4e9479ed",
	// 		name: "Portrait Photography",
	// 		description:
	// 			"<p><b>📸 Portrait Photography</b> for timeless shots.</p><ul><li>💡 Studio Lighting</li><li>🌳 Outdoor Natural Light</li><li>🖼️ Up to 20 Edited Shots</li></ul><p><s>Old Price: 2000</s> <b>Now 1500!</b></p>",
	// 		category: "Photography",
	// 		price: 1500,
	// 		old_price: 2000,
	// 		duration_minutes: 60,
	// 		is_available: true,
	// 		service_gallery: [
	// 			"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
	// 			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
	// 			"https://images.unsplash.com/photo-1494790108377-be9c29b29330",
	// 		],
	// 	},
	// 	{
	// 		_id: "68db7cd6a46929dc4e9479ed",
	// 		name: "Videography",
	// 		description:
	// 			"<p><b>🎬 Videography</b> that tells your story in cinematic style.</p><ul><li>📹 HD & 4K Recording</li><li>✂️ Professional Editing</li><li>🎞️ Highlight Reel</li></ul><p><s>Starting at 5000</s> <b>Now 5000</b></p>",
	// 		category: "Other",
	// 		price: 5000,
	// 		duration_minutes: 480,
	// 		is_available: true,
	// 		service_gallery: [
	// 			"https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
	// 			"https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
	// 		],
	// 	},
	// 	{
	// 		_id: "68db7cd6a46929dc4e9479f7",
	// 		name: "Wedding Photography",
	// 		description:
	// 			"<p><b>💒 Wedding Photography</b> for <i>unforgettable memories</i>.</p><ol><li>💍 Pre-Wedding Shoot</li><li>👰 Ceremony Coverage</li><li>🎉 Reception Highlights</li></ol><p><s>Old Price: 10000</s> <b>Now 8000!</b></p>",
	// 		category: "Photography",
	// 		price: 8000,
	// 		old_price: 10000,
	// 		duration_minutes: 480,
	// 		is_available: true,
	// 		service_gallery: [
	// 			"https://images.unsplash.com/photo-1519741497674-611481863552",
	// 			"https://images.unsplash.com/photo-1606800052052-a08af7148866",
	// 			"https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
	// 			"https://images.unsplash.com/photo-1525258847-a273d31b68fd",
	// 		],
	// 	},
	// ];

	// Calculate pagination
	const totalPages = Math.ceil(allServices.length / servicesPerPage);
	const startIndex = (currentPage - 1) * servicesPerPage;
	const endIndex = startIndex + servicesPerPage;
	const currentServices = allServices.slice(startIndex, endIndex);

	const goToPage = (page: number) => {
		setCurrentPage(page);
	};

	const goToPrevPage = () => {
		if (currentPage > 1) {
			goToPage(currentPage - 1);
		}
	};

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			goToPage(currentPage + 1);
		}
	};

	// Generate page numbers for pagination
	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;
		let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
		let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}
		return pages;
	};

	useEffect(() => {
		if (currentPage > 0) {
			window.scrollTo({ top: 100, behavior: "smooth" });
		}
	}, [currentPage]);

	if (isPending) {
		return <>Loading</>;
	}

	return (
		<div className="min-h-screen bg-sf-background">
			<div className="flex mx-auto max-w-7xl">
				{/* Sidebar */}
				<div className="sticky space-y-4 p-6 bg-white w-80 h-fit top-4">
					{/* Categories */}
					<Label className="text-xl text-primary font-bold">
						Search Service:
					</Label>
					<Input
						className="h-[38px] text-sm xl:text-base placeholder:text-base font-normal"
						placeholder="Service for service name here"
					/>

					<CategoriesFilterCard />

					{/* Pricing */}
					<PricingFilterCard />

					{/* Search Button */}
					<Button className="w-full px-6 bg-gradient-to-r from-primary to-primary/65 hover:opacity-90">
						<Search size={16} className="mr-2" />
						Search Now
					</Button>
				</div>

				{/* Main Content */}
				<div className="flex-1 p-6">
					{/* Header */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex flex-row gap-4">
							<h1 className="mb-2 text-2xl font-bold">
								We Found{" "}
								<span className="text-primary">{allServices.length}</span>{" "}
								Services
							</h1>
							<Button className="text-xs rounded-2xl px-4 py-2 h-8 bg-secondary hover:bg-secondary-foreground">
								Clear Filter
							</Button>
						</div>
						<div className="flex items-center gap-2">
							<Select>
								<SelectTrigger className="w-[300px] xl:text-sm h-[38px] px-4">
									<SelectValue
										placeholder="Sort services"
										className="xl:text-sm"
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel className="xl:text-sm">Sort By:</SelectLabel>
										<SelectItem value="trending" className="xl:text-sm">
											Trending
										</SelectItem>
										<SelectItem value="newest" className="xl:text-sm">
											Newest
										</SelectItem>
										<SelectItem value="popular" className="xl:text-sm">
											Popular
										</SelectItem>
										<SelectItem value="price-low" className="xl:text-sm">
											Price: Low to High
										</SelectItem>
										<SelectItem value="price-high" className="xl:text-sm">
											Price: High to Low
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Page Info */}
					<div className="mb-4 text-sm text-gray-600">
						Showing {startIndex + 1}-{Math.min(endIndex, allServices.length)} of{" "}
						{allServices.length} services
					</div>

					{/* Services Grid */}
					<div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
						{currentServices.map((service, index) => (
							<ServiceCard
								key={startIndex + index}
								category={service.category}
								title={service.name}
								duration_minutes={service.duration_minutes}
								price={service.price}
								oldPrice={service.old_price}
								image={service.service_gallery[0]}
								onBook={() => {
									const initialData = {
										services: [
											{
												_id: service._id,
												quantity: 1,
												price_per_unit: service.price,
												total_price: service.price,
												duration_minutes: service.duration_minutes,
											},
										],

										is_customized: false,
										customer_id: myCredentials?._id,
										customization_notes: null,
										package_id: null,

										booking_date: formatToUtc(new Date()),
										start_time: "",
										end_time: "",
										session_duration_minutes: 0,
										location: "",

										photographer_id: "",
										photographer_name: null,
										theme: null,
										special_requests: null,

										total_amount: service.price,
										discount_amount: 0,
										promo_id: null,
										final_amount: service.price,
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
								onView={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
									navigate(`/services/service/${service._id}/service-details`);
								}}
							/>
						))}
					</div>

					{/* Pagination */}
					<div className="flex items-center justify-center space-x-2">
						<Button
							variant="ghost"
							size="sm"
							disabled={currentPage === 1}
							onClick={goToPrevPage}
						>
							<ChevronLeft size={16} />
						</Button>

						{getPageNumbers().map((pageNum) => (
							<Button
								key={pageNum}
								variant={currentPage === pageNum ? "default" : "ghost"}
								size="sm"
								className={
									currentPage === pageNum
										? "w-8 h-8 text-white bg-primary rounded-full hover:bg-primary/80"
										: "w-8 h-8"
								}
								onClick={() => goToPage(pageNum)}
							>
								{pageNum}
							</Button>
						))}

						<Button
							variant="ghost"
							size="sm"
							disabled={currentPage === totalPages}
							onClick={goToNextPage}
						>
							<ChevronRight size={16} />
						</Button>
					</div>

					{/* Pagination Info */}
					<div className="mt-4 text-center text-sm text-gray-500">
						Page {currentPage} of {totalPages}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServicePage;
