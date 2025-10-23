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
