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
import {
	PaymentMethod,
	useBookingFormStore,
} from "@/store-front/store/useBookingFormStore";
import { formatToUtc } from "@/ami/shared/helpers/formatDate";
import { useGetAllPackagesQuerySf } from "../queries/getPackages.sf.query";
import { GetAllPackageResponseSf } from "../utils/types/package-response.sf.types";
import { useMyCredentials } from "@/store-front/store/useMyCredentials";

// WORKON REMOVE THIS HERE
export interface ServiceDetails {
	_id: string;
	name: string;
	description: string;
	category: string;
	price: number;
	old_price?: number;
	duration_minutes: number;
	is_available: boolean;
	service_gallery: string[];
	is_active: boolean;
	__v: number;
	created_at: string;
	updated_at: string;
}

export interface PackageService {
	service_id: string;
	quantity: number;
	price_per_unit: number;
	total_price: number;
	duration_minutes: number;
	_id: string;
	service_details: ServiceDetails;
}

export interface Package {
	_id: string;
	name: string;
	description: string;
	image: string;
	package_price: number;
	discount_percentage: number;
	discount_amount: number | null;
	final_price: number;
	looks: number;
	custom_duration_minutes: number | null;
	is_available: boolean;
	is_active: boolean;
	services: PackageService[];
	created_at: string;
	updated_at: string;
}

const PackagePage = () => {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const packagesPerPage = 6;

	const myCredentials = useMyCredentials((state) => state.myCredentials);

	const {
		openModal,
		clearForm,
		setLoading,
		saveOriginalForm,
		setFieldImmediate,
		originalFormData,
	} = useBookingFormStore();

	const handleBook = (
		pkg: GetAllPackageResponseSf,
		totalServicesPrice: number,
		hasCustomPackagePrice: boolean
	) => {
		const initialData = {
			services: pkg.services.map(
				({
					service_id,
					quantity,
					price_per_unit,
					total_price,
					duration_minutes,
				}) => ({
					_id: service_id,
					quantity: quantity,
					price_per_unit: price_per_unit,
					total_price: total_price,
					duration_minutes: duration_minutes,
				})
			),

			is_customized: false,
			customer_id: myCredentials?._id,
			customization_notes: null,
			package_id: pkg._id,

			booking_date: formatToUtc(new Date()),
			start_time: "",
			end_time: "",
			session_duration_minutes: 0,
			location: "",

			photographer_id: "",
			photographer_name: null,
			theme: null,
			special_requests: null,

			old_amount: hasCustomPackagePrice ? totalServicesPrice : undefined,
			total_amount: hasCustomPackagePrice
				? pkg.package_price
				: totalServicesPrice,
			discount_amount: 0,
			promo_id: null,
			final_amount: hasCustomPackagePrice
				? pkg.package_price
				: totalServicesPrice,
			amount_paid: 0,
			method_of_payment: null,
			payment_images: [],

			is_booking_sent: false,
			status: "Pending" as const,
			booking_reference: "",
		};

		try {
			saveOriginalForm(initialData);
			setLoading(true);
		} catch (error) {
			console.error(error);
		} finally {
			// small timeout to ensure loading state renders
			setLoading(false);
			openModal();
		}
	};

	const { data: allPackages = [], isPending } = useGetAllPackagesQuerySf();

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

	if (isPending) {
		return <>Loading</>;
	}

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
							clearForm();
							setFieldImmediate("is_customized", true);

							openModal();
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

					<div className="flex flex-col space-y-4 mb-8">
						{currentPackages.map((packageItem) => {
							const totalServicesPrice = packageItem.services.reduce(
								(total, service) =>
									total + service.price_per_unit * service.quantity,
								0
							);

							const hasCustomPackagePrice =
								packageItem.package_price > 0 && !!packageItem.package_price;

							return (
								<PackageAccordionCard
									key={packageItem._id}
									id={packageItem._id}
									name={packageItem.name}
									description={packageItem.description}
									image={packageItem.image}
									status={
										packageItem.is_available ? "available" : "unavailable"
									}
									services={packageItem.services.map(
										(service) => service.service_details?.name ?? ""
									)}
									price={
										hasCustomPackagePrice
											? packageItem.package_price
											: totalServicesPrice
									}
									oldPrice={
										hasCustomPackagePrice ? totalServicesPrice : undefined
									}
									looks={packageItem.looks}
									onBook={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
										handleBook(
											packageItem,
											totalServicesPrice,
											hasCustomPackagePrice
										);
									}}
									onView={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
										navigate(`/packages/service/${packageItem._id}/details`);
									}}
								/>
							);
						})}
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
