import { useState } from "react";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceCard } from "@/store-front/shared/components/ServiceCard";

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

const PackagePage = () => {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const servicesPerPage = 9;

	const allServices = [
		// Photography Packages
		{
			category: "Photography",
			title: "Professional Portrait Studio",
			location: "Downtown Arts District, Road: 542, USA",
			price: 180,
			oldPrice: 220,
			image:
				"https://images.unsplash.com/photo-1554048612-b6a482b224b4?w=400&h=300&fit=crop",
		},
		{
			category: "Photography",
			title: "Wedding Photography Pro",
			location: "Sunset Boulevard, Road: 789, USA",
			price: 850,
			oldPrice: 1000,
			image:
				"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
		},
		{
			category: "Photography",
			title: "Nature & Landscape Photos",
			location: "Green Valley Park, Road: 123, USA",
			price: 120,
			oldPrice: 150,
			image:
				"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
		},
		{
			category: "Photography",
			title: "Event Photography Packages",
			location: "City Center Plaza, Road: 456, USA",
			price: 300,
			oldPrice: 380,
			image:
				"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
		},
		// Beauty Packages
		{
			category: "Beauty",
			title: "Luxury Spa & Wellness",
			location: "Wellness District, Road: 321, USA",
			price: 95,
			oldPrice: 120,
			image:
				"https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=300&fit=crop",
		},
		{
			category: "Beauty",
			title: "Professional Makeup Artist",
			location: "Fashion Avenue, Road: 654, USA",
			price: 75,
			oldPrice: 100,
			image:
				"https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
		},
		{
			category: "Beauty",
			title: "Hair Styling & Color",
			location: "Style Central, Road: 987, USA",
			price: 85,
			oldPrice: 110,
			image:
				"https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=300&fit=crop",
		},
		{
			category: "Beauty",
			title: "Nail Art & Manicure",
			location: "Beauty Plaza, Road: 147, USA",
			price: 45,
			oldPrice: 65,
			image:
				"https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
		},
		{
			category: "Beauty",
			title: "Skincare & Facial Treatments",
			location: "Glow Center, Road: 258, USA",
			price: 110,
			oldPrice: 140,
			image:
				"https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop",
		},
		// Styling Packages
		{
			category: "Styling",
			title: "Personal Fashion Stylist",
			location: "Fashion District, Road: 369, USA",
			price: 150,
			oldPrice: 200,
			image:
				"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
		},
		{
			category: "Styling",
			title: "Wardrobe Consulting",
			location: "Style Boulevard, Road: 741, USA",
			price: 200,
			oldPrice: 250,
			image:
				"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop",
		},
		{
			category: "Styling",
			title: "Interior Design Packages",
			location: "Design Hub, Road: 852, USA",
			price: 400,
			oldPrice: 500,
			image:
				"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
		},
		{
			category: "Styling",
			title: "Event Styling & Decor",
			location: "Party Central, Road: 963, USA",
			price: 320,
			oldPrice: 400,
			image:
				"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
		},
		// Equipment Packages
		{
			category: "Equipment",
			title: "Photography Equipment Rental",
			location: "Tech Rental Hub, Road: 159, USA",
			price: 80,
			oldPrice: 100,
			image:
				"https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
		},
		{
			category: "Equipment",
			title: "Audio & Sound Equipment",
			location: "Music District, Road: 357, USA",
			price: 120,
			oldPrice: 150,
			image:
				"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
		},
		{
			category: "Equipment",
			title: "Lighting Equipment Rental",
			location: "Studio Row, Road: 753, USA",
			price: 90,
			oldPrice: 120,
			image:
				"https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
		},
		{
			category: "Equipment",
			title: "Video Production Gear",
			location: "Media Center, Road: 951, USA",
			price: 200,
			oldPrice: 250,
			image:
				"https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&h=300&fit=crop",
		},
		// Other Packages
		{
			category: "Other",
			title: "Social Media Management",
			location: "Digital Hub, Road: 159, USA",
			price: 250,
			oldPrice: 300,
			image:
				"https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
		},
		{
			category: "Other",
			title: "Brand Consulting Packages",
			location: "Business District, Road: 357, USA",
			price: 350,
			oldPrice: 420,
			image:
				"https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
		},
		{
			category: "Other",
			title: "Creative Workshop Sessions",
			location: "Art Quarter, Road: 753, USA",
			price: 65,
			oldPrice: 85,
			image:
				"https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
		},
		{
			category: "Other",
			title: "Digital Art Commissions",
			location: "Creative Space, Road: 951, USA",
			price: 180,
			oldPrice: 220,
			image:
				"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
		},
	];

	// Calculate pagination
	const totalPages = Math.ceil(allServices.length / servicesPerPage);
	const startIndex = (currentPage - 1) * servicesPerPage;
	const endIndex = startIndex + servicesPerPage;
	const currentServices = allServices.slice(startIndex, endIndex);

	// Pagination handlers
	const goToPage = (page: number) => {
		window.scrollTo({ top: 100, behavior: "smooth" });
		setCurrentPage(page);
		// Scroll to top of packages grid
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

	return (
		<div className="min-h-screen bg-sf-background">
			<div className="flex mx-auto max-w-7xl">
				{/* Sidebar */}
				<div className="sticky space-y-4 p-6 bg-white rounded-lg shadow-sm w-80 h-fit top-4">
					{/* Categories */}
					<Label className="text-xl text-primary font-bold">
						Search Package:
					</Label>
					<Input
						className="h-[38px] text-sm xl:text-base placeholder:text-base font-normal"
						placeholder="Browse for service names here"
					/>

					{/* <CategoriesFilterCard /> */}

					{/* Pricing */}
					{/* <PricingFilterCard /> */}

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
								Packages
							</h1>
							<Button className="text-xs rounded-2xl px-4 py-2 h-8 bg-secondary hover:bg-secondary-foreground">
								Clear Filter
							</Button>
						</div>
						<div className="flex items-center gap-2">
							<Select>
								<SelectTrigger className="w-[300px] xl:text-sm h-[38px] px-4">
									<SelectValue
										placeholder="Sort packages"
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
						{allServices.length} packages
					</div>

					{/* Packages Grid */}
					<div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
						{currentServices.map((service, index) => (
							<ServiceCard
								key={startIndex + index}
								category={service.category}
								title={service.title}
								location={service.location}
								price={service.price}
								oldPrice={service.oldPrice}
								image={service.image}
								onBook={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
									navigate("/packages/service/1/service-details");
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

export default PackagePage;
