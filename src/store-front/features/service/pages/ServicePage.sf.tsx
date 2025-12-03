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
	const { myCredentials } = useMyCredentials();

	// Filtering states
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
	const [sortBy, setSortBy] = useState("");

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const servicesPerPage = 9;

	const { data: allServices = [], isPending } = useGetAllServicesQuerySf();

	// Filter services based on all criteria
	const filteredServices = allServices.filter((service) => {
		// Search filter
		const matchesSearch =
			searchQuery.trim() === "" ||
			service.name.toLowerCase().includes(searchQuery.toLowerCase());

		// Category filter
		const matchesCategory =
			selectedCategories.length === 0 ||
			selectedCategories.includes(service.category);

		// Price filter
		const matchesPrice =
			service.price >= priceRange.min && service.price <= priceRange.max;

		return matchesSearch && matchesCategory && matchesPrice;
	});

	// Sort filtered services
	const sortedServices = [...filteredServices].sort((a, b) => {
		switch (sortBy) {
			case "price-low":
				return a.price - b.price;
			case "price-high":
				return b.price - a.price;
			case "newest":
				// Assuming there's a created_at field, adjust as needed
				return (
					new Date(b.created_at || 0).getTime() -
					new Date(a.created_at || 0).getTime()
				);

			default:
				return 0;
		}
	});

	// Calculate pagination
	const totalPages = Math.ceil(sortedServices.length / servicesPerPage);
	const startIndex = (currentPage - 1) * servicesPerPage;
	const endIndex = startIndex + servicesPerPage;
	const currentServices = sortedServices.slice(startIndex, endIndex);

	// Reset to page 1 when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, selectedCategories, priceRange, sortBy]);

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

	// Clear all filters
	const handleClearFilters = () => {
		setSearchQuery("");
		setSelectedCategories([]);
		setPriceRange({ min: 0, max: Infinity });
		setSortBy("");
		setCurrentPage(1);
	};

	// Check if any filters are active
	const hasActiveFilters =
		searchQuery !== "" ||
		selectedCategories.length > 0 ||
		priceRange.min > 0 ||
		priceRange.max < Infinity ||
		sortBy !== "";

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
					{/* Search */}
					<Label className="text-xl text-primary font-bold">
						Search Service:
					</Label>
					<Input
						className="h-[38px] text-sm xl:text-base placeholder:text-base font-normal"
						placeholder="Search for service name here"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>

					<CategoriesFilterCard
						selectedCategories={selectedCategories}
						onCategoriesChange={setSelectedCategories}
					/>

					<PricingFilterCard
						priceRange={priceRange}
						onPriceRangeChange={setPriceRange}
					/>
				</div>

				<div className="flex-1 p-6">
					<div className="flex items-center justify-between mb-6">
						<div className="flex flex-row gap-4">
							<h1 className="mb-2 text-2xl font-bold">
								We Found{" "}
								<span className="text-primary">{sortedServices.length}</span>{" "}
								Services
							</h1>
							{hasActiveFilters && (
								<Button
									onClick={handleClearFilters}
									className="text-xs rounded-2xl px-4 py-2 h-8 bg-secondary hover:bg-secondary-foreground"
								>
									Clear Filter
								</Button>
							)}
						</div>
						<div className="flex items-center gap-2">
							<Select value={sortBy} onValueChange={setSortBy}>
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
						Showing {sortedServices.length > 0 ? startIndex + 1 : 0}-
						{Math.min(endIndex, sortedServices.length)} of{" "}
						{sortedServices.length} services
					</div>

					{/* Services Grid */}
					{currentServices.length > 0 ? (
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
										navigate(
											`/services/service/${service._id}/service-details`
										);
									}}
								/>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-16 text-center">
							<p className="text-xl text-gray-500 mb-2">No services found</p>
							<p className="text-sm text-gray-400 mb-4">
								Try adjusting your filters
							</p>
							{hasActiveFilters && (
								<Button onClick={handleClearFilters} variant="outline">
									Clear All Filters
								</Button>
							)}
						</div>
					)}

					{/* Pagination */}
					{totalPages > 1 && (
						<>
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
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ServicePage;
