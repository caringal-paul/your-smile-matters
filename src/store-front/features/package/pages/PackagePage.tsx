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

	const {
		openModal,
		clearForm,
		setLoading,
		saveOriginalForm,
		setFieldImmediate,
	} = useBookingFormStore();

	const handleBook = (pkg: Package) => {
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
			customer_id: "12",
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

			total_amount: pkg.package_price,
			discount_amount: 0,
			promo_id: null,
			final_amount: pkg.final_price,
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

	const allPackages: Package[] = [
		{
			_id: "68db7cd6a46929dc4e9479f7",
			name: "Basic Portrait Package",
			description: "Perfect for individual portraits and headshots",
			image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
			package_price: 2000,
			discount_percentage: 10,
			discount_amount: null,
			final_price: 1800,
			looks: 1,
			custom_duration_minutes: null,
			is_available: true,
			is_active: true,
			services: [
				{
					service_id: "68db7cd6a46929dc4e9479ed",
					quantity: 1,
					price_per_unit: 1500,
					total_price: 1500,
					duration_minutes: 60,
					_id: "68db7cd6a46929dc4e9479f8",
					service_details: {
						_id: "68db7cd6a46929dc4e9479ed",
						name: "Portrait Photography",
						description:
							"Professional portrait photography session with studio lighting",
						category: "Photography",
						price: 1500,
						old_price: 2000,
						duration_minutes: 60,
						is_available: true,
						service_gallery: [
							"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
							"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
							"https://images.unsplash.com/photo-1494790108377-be9c29b29330",
						],
						is_active: true,
						__v: 0,
						created_at: "2025-09-30T06:46:46.081Z",
						updated_at: "2025-09-30T06:46:46.081Z",
					},
				},
			],
			created_at: "2025-09-30T06:46:46.097Z",
			updated_at: "2025-09-30T06:46:46.097Z",
		},
		{
			_id: "68db7cd6a46929dc4e947a00",
			name: "Glam Party Package",
			description: "Party makeup with hair styling and portrait photography",
			image: "https://images.unsplash.com/photo-1560066984-138dadb4c035",
			package_price: 3500,
			discount_percentage: 12,
			discount_amount: null,
			final_price: 3080,
			looks: 2,
			custom_duration_minutes: 210,
			is_available: true,
			is_active: true,
			services: [
				{
					service_id: "68db7cd6a46929dc4e9479f1",
					quantity: 1,
					price_per_unit: 1200,
					total_price: 1200,
					duration_minutes: 90,
					_id: "68db7cd6a46929dc4e947a01",
					service_details: {
						_id: "68db7cd6a46929dc4e9479f1",
						name: "Party Makeup",
						description: "Glamorous makeup for parties and special occasions",
						category: "Beauty",
						price: 1200,
						duration_minutes: 90,
						is_available: true,
						service_gallery: [
							"https://images.unsplash.com/photo-1560066984-138dadb4c035",
							"https://images.unsplash.com/photo-1583001809809-a2b0c6e3f22f",
						],
						is_active: true,
						__v: 0,
						created_at: "2025-09-30T06:46:46.083Z",
						updated_at: "2025-09-30T06:46:46.083Z",
					},
				},
				{
					service_id: "68db7cd6a46929dc4e9479f2",
					quantity: 1,
					price_per_unit: 800,
					total_price: 800,
					duration_minutes: 60,
					_id: "68db7cd6a46929dc4e947a02",
					service_details: {
						_id: "68db7cd6a46929dc4e9479f2",
						name: "Hair Styling",
						description: "Professional hair styling and updos for any occasion",
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
						__v: 0,
						created_at: "2025-09-30T06:46:46.083Z",
						updated_at: "2025-09-30T06:46:46.083Z",
					},
				},
				{
					service_id: "68db7cd6a46929dc4e9479ed",
					quantity: 1,
					price_per_unit: 1500,
					total_price: 1500,
					duration_minutes: 60,
					_id: "68db7cd6a46929dc4e947a03",
					service_details: {
						_id: "68db7cd6a46929dc4e9479ed",
						name: "Portrait Photography",
						description:
							"Professional portrait photography session with studio lighting",
						category: "Photography",
						price: 1500,
						old_price: 2000,
						duration_minutes: 60,
						is_available: true,
						service_gallery: [
							"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
							"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
							"https://images.unsplash.com/photo-1494790108377-be9c29b29330",
						],
						is_active: true,
						__v: 0,
						created_at: "2025-09-30T06:46:46.081Z",
						updated_at: "2025-09-30T06:46:46.081Z",
					},
				},
			],
			created_at: "2025-09-30T06:46:46.098Z",
			updated_at: "2025-09-30T06:46:46.098Z",
		},
		{
			_id: "68db7cd6a46929dc4e9479fd",
			name: "Event Coverage Package",
			description: "Professional event photography and videography",
			image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
			package_price: 10000,
			discount_percentage: 10,
			discount_amount: null,
			final_price: 9000,
			looks: 2,
			custom_duration_minutes: null,
			is_available: true,
			is_active: true,
			services: [
				{
					service_id: "68db7cd6a46929dc4e9479ef",
					quantity: 1,
					price_per_unit: 3500,
					total_price: 3500,
					duration_minutes: 240,
					_id: "68db7cd6a46929dc4e9479fe",
					service_details: {
						_id: "68db7cd6a46929dc4e9479ef",
						name: "Event Photography",
						description:
							"Professional event coverage for corporate and social events",
						category: "Photography",
						price: 3500,
						duration_minutes: 240,
						is_available: true,
						service_gallery: [
							"https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
							"https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
						],
						is_active: true,
						__v: 0,
						created_at: "2025-09-30T06:46:46.083Z",
						updated_at: "2025-09-30T06:46:46.083Z",
					},
				},
				{
					service_id: "68db7cd6a46929dc4e9479ed",
					quantity: 1,
					price_per_unit: 5000,
					total_price: 5000,
					duration_minutes: 480,
					_id: "68db7cd6a46929dc4e9479ff",
					service_details: {
						_id: "68db7cd6a46929dc4e9479ed",
						name: "Videography",
						description: "Professional video coverage with cinematic editing",
						category: "Other",
						price: 5000,
						duration_minutes: 480,
						is_available: true,
						service_gallery: [
							"https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
							"https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
						],
						is_active: true,
						__v: 0,
						created_at: "2025-09-30T06:46:46.083Z",
						updated_at: "2025-09-30T06:46:46.083Z",
					},
				},
			],
			created_at: "2025-09-30T06:46:46.098Z",
			updated_at: "2025-09-30T06:46:46.098Z",
		},
		{
			_id: "68db7cd6a46929dc4e9479f9",
			name: "Wedding Premium Package",
			description:
				"Complete wedding coverage with photography, videography, and makeup",
			image: "https://images.unsplash.com/photo-1519741497674-611481863552",
			package_price: 18000,
			discount_percentage: 15,
			discount_amount: null,
			final_price: 15300,
			looks: 3,
			custom_duration_minutes: 600,
			is_available: true,
			is_active: true,
			services: [
				{
					service_id: "68db7cd6a46929dc4e9479ee",
					quantity: 1,
					price_per_unit: 8000,
					total_price: 8000,
					duration_minutes: 480,
					_id: "68db7cd6a46929dc4e9479fa",
					service_details: {
						_id: "68db7cd6a46929dc4e9479ee",
						name: "Wedding Photography",
						description: "Complete wedding day coverage with two photographers",
						category: "Photography",
						price: 8000,
						old_price: 10000,
						duration_minutes: 480,
						is_available: true,
						service_gallery: [
							"https://images.unsplash.com/photo-1519741497674-611481863552",
							"https://images.unsplash.com/photo-1606800052052-a08af7148866",
							"https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
							"https://images.unsplash.com/photo-1525258847-a273d31b68fd",
						],
						is_active: true,
						__v: 0,
						created_at: "2025-09-30T06:46:46.083Z",
						updated_at: "2025-09-30T06:46:46.083Z",
					},
				},
				{
					service_id: "68db7cd6a46929dc4e9479ed",
					quantity: 1,
					price_per_unit: 5000,
					total_price: 5000,
					duration_minutes: 480,
					_id: "68db7cd6a46929dc4e9479fb",
					service_details: {
						_id: "68db7cd6a46929dc4e9479ed",
						name: "Videography",
						description: "Professional video coverage with cinematic editing",
						category: "Other",
						price: 5000,
						duration_minutes: 480,
						is_available: true,
						service_gallery: [
							"https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
							"https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
						],
						is_active: true,
						__v: 0,
						created_at: "2025-09-30T06:46:46.083Z",
						updated_at: "2025-09-30T06:46:46.083Z",
					},
				},
				{
					service_id: "68db7cd6a46929dc4e9479f0",
					quantity: 2,
					price_per_unit: 2500,
					total_price: 5000,
					duration_minutes: 120,
					_id: "68db7cd6a46929dc4e9479fc",
					service_details: {
						_id: "68db7cd6a46929dc4e9479f0",
						name: "Bridal Makeup",
						description: "Complete bridal makeup with trial session included",
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
						__v: 0,
						created_at: "2025-09-30T06:46:46.083Z",
						updated_at: "2025-09-30T06:46:46.083Z",
					},
				},
			],
			created_at: "2025-09-30T06:46:46.098Z",
			updated_at: "2025-09-30T06:46:46.098Z",
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

					{/* Packages List - Accordion Layout */}
					<div className="flex flex-col space-y-4 mb-8">
						{currentPackages.map((packageItem) => (
							<PackageAccordionCard
								key={packageItem._id}
								id={packageItem._id}
								name={packageItem.name}
								description={packageItem.description}
								image={packageItem.image}
								status={packageItem.is_available ? "available" : "unavailable"}
								services={packageItem.services.map(
									(service) => service.service_details.name
								)}
								price={packageItem.final_price}
								oldPrice={packageItem.package_price}
								looks={packageItem.looks}
								onBook={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });

									handleBook(packageItem);
								}}
								onView={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
									navigate(`/packages/service/${packageItem._id}/details`);
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
