import { useState } from "react";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
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
import { PackageAccordionCard } from "../components/PackageAccordionCard";
import PackageCustomizationCard from "../components/PackageCustomizationCard";

const PackagePage = () => {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const packagesPerPage = 6;

	const allPackages = [
		// Photography Packages
		{
			id: "photo-portrait-pro",
			name: "Professional Portrait Studio Package",
			description:
				"Complete portrait photography session with professional editing and multiple outfit changes in our premium studio.",
			image:
				"https://images.unsplash.com/photo-1554048612-b6a482b224b4?w=400&h=300&fit=crop",
			status: "available" as const,
			services: [
				"2-hour studio session",
				"Professional lighting setup",
				"Up to 3 outfit changes",
				"50 edited high-resolution photos",
				"Online gallery access",
				"Print release included",
			],
			price: 180,
			oldPrice: 220,
			looks: 3,
		},
		{
			id: "wedding-photo-pro",
			name: "Wedding Photography Pro Package",
			description:
				"Comprehensive wedding photography coverage from preparation to reception with dual photographer team.",
			image:
				"https://images.unsplash.com/photo-1511285560929-80b023f02d71?w=400&h=300&fit=crop",
			status: "unavailable" as const,
			services: [
				"8-hour wedding day coverage",
				"Dual photographer team",
				"Bridal preparation photos",
				"Ceremony and reception coverage",
				"500+ edited photos",
				"Wedding album (50 pages)",
				"USB drive with all photos",
			],
			price: 850,
			oldPrice: 1000,
			looks: 2,
		},
		{
			id: "nature-landscape",
			name: "Nature & Landscape Photography",
			description:
				"Outdoor photography session capturing stunning landscapes and natural beauty with professional equipment.",
			image:
				"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
			status: "available" as const,
			services: [
				"3-hour outdoor session",
				"Professional landscape equipment",
				"Golden hour photography",
				"30 edited high-resolution photos",
				"Location scouting included",
				"Weather contingency planning",
			],
			price: 120,
			oldPrice: 150,
			looks: 4,
		},
		{
			id: "event-photography",
			name: "Event Photography Package",
			description:
				"Professional event coverage for corporate events, parties, and special occasions with quick turnaround.",
			image:
				"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
			status: "available" as const,
			services: [
				"4-hour event coverage",
				"Candid and posed photography",
				"Real-time photo sharing",
				"100+ edited photos",
				"Same-day highlights reel",
				"Professional editing",
			],
			price: 300,
			oldPrice: 380,
			looks: 1,
		},
		// Beauty Packages
		{
			id: "luxury-spa-wellness",
			name: "Luxury Spa & Wellness Package",
			description:
				"Complete relaxation and rejuvenation experience with premium treatments and personalized care.",
			image:
				"https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=300&fit=crop",
			status: "available" as const,
			services: [
				"90-minute full body massage",
				"Facial treatment with premium products",
				"Manicure and pedicure",
				"Steam room access",
				"Healthy refreshments",
				"Take-home skincare kit",
			],
			price: 95,
			oldPrice: 120,
			looks: 3,
		},
		{
			id: "professional-makeup",
			name: "Professional Makeup Artist Package",
			description:
				"Expert makeup application for special events, photoshoots, or weddings with premium cosmetics.",
			image:
				"https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
			status: "unavailable" as const,
			services: [
				"Consultation and skin analysis",
				"Professional makeup application",
				"False lash application",
				"Touch-up kit for events",
				"Makeup removal service",
				"Product recommendations",
			],
			price: 75,
			oldPrice: 100,
			looks: 5,
		},
		{
			id: "hair-styling-color",
			name: "Hair Styling & Color Package",
			description:
				"Complete hair transformation with professional coloring, cutting, and styling by expert stylists.",
			image:
				"https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=300&fit=crop",
			status: "available" as const,
			services: [
				"Hair consultation and analysis",
				"Professional color treatment",
				"Precision cut and styling",
				"Deep conditioning treatment",
				"Heat protection application",
				"Styling tips and aftercare",
			],
			price: 85,
			oldPrice: 110,
			looks: 2,
		},
		{
			id: "nail-art-manicure",
			name: "Nail Art & Manicure Package",
			description:
				"Creative nail art designs with professional manicure service using premium nail products.",
			image:
				"https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
			status: "unavailable" as const,
			services: [
				"Hand and nail care treatment",
				"Custom nail art design",
				"Gel or regular polish application",
				"Cuticle care and shaping",
				"Hand massage with moisturizer",
				"Nail care maintenance tips",
			],
			price: 45,
			oldPrice: 65,
			looks: 1,
		},
		// Equipment Packages
		{
			id: "photo-equipment-rental",
			name: "Photography Equipment Rental",
			description:
				"Professional photography equipment rental with delivery and setup assistance for your projects.",
			image:
				"https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
			status: "available" as const,
			services: [
				"DSLR camera with multiple lenses",
				"Professional lighting kit",
				"Tripods and stabilizers",
				"Memory cards and batteries",
				"Equipment delivery and pickup",
				"24/7 technical support",
			],
			price: 80,
			oldPrice: 100,
			looks: 4,
		},
		{
			id: "audio-sound-equipment",
			name: "Audio & Sound Equipment Package",
			description:
				"Complete audio equipment rental for events, recordings, and presentations with technical support.",
			image:
				"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
			status: "available" as const,
			services: [
				"Professional microphone system",
				"Sound mixing console",
				"Speaker system with amplifiers",
				"Wireless communication devices",
				"Audio recording equipment",
				"On-site technical assistance",
			],
			price: 120,
			oldPrice: 150,
			looks: 2,
		},
	];

	// Calculate pagination
	const totalPages = Math.ceil(allPackages.length / packagesPerPage);
	const startIndex = (currentPage - 1) * packagesPerPage;
	const endIndex = startIndex + packagesPerPage;
	const currentPackages = allPackages.slice(startIndex, endIndex);

	// Pagination handlers
	const goToPage = (page: number) => {
		window.scrollTo({ top: 100, behavior: "smooth" });
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

	return (
		<div className="min-h-screen bg-sf-background">
			<div className="flex mx-auto max-w-7xl">
				{/* Sidebar */}
				<div className="sticky space-y-4 p-6 bg-white rounded-lg shadow-sm w-80 h-fit top-4">
					{/* Search */}
					<Label className="text-xl text-primary font-bold">
						Search Package:
					</Label>
					<Input
						className="h-[38px] text-sm xl:text-base placeholder:text-base font-normal"
						placeholder="Browse for package names here"
					/>

					{/* Search Button */}
					<Button className="w-full px-6 bg-gradient-to-r from-primary to-primary/65 hover:opacity-90">
						<Search size={16} className="mr-2" />
						Search Now
					</Button>

					<PackageCustomizationCard
						onCustomize={() => {
							console.log("Customize");
						}}
					/>
				</div>

				{/* Main Content */}
				<div className="flex-1 p-6">
					{/* Header */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex flex-row gap-4">
							<h1 className="mb-2 text-2xl font-bold">
								We Found{" "}
								<span className="text-primary">{allPackages.length}</span>{" "}
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
						Showing {startIndex + 1}-{Math.min(endIndex, allPackages.length)} of{" "}
						{allPackages.length} packages
					</div>

					{/* Packages List - Accordion Layout */}
					<div className="flex flex-col space-y-4 mb-8">
						{currentPackages.map((packageItem) => (
							<PackageAccordionCard
								key={packageItem.id}
								id={packageItem.id}
								name={packageItem.name}
								description={packageItem.description}
								image={packageItem.image}
								status={packageItem.status}
								services={packageItem.services}
								price={packageItem.price}
								oldPrice={packageItem.oldPrice}
								looks={packageItem.looks}
								onBook={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
									navigate(
										`/packages/service/${packageItem.id}/service-details`
									);
								}}
								onView={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
									navigate(`/packages/service/${packageItem.id}/details`);
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
