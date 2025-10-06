import React, { useState, useEffect } from "react";
import { Label } from "@/core/components/base/label";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import PhotographerAccordionCard from "@/store-front/shared/components/PhotographerAccordionCard";
import { useBookingFormStore } from "@/store-front/store/useBookingFormStore";
import { Textarea } from "@/core/components/base/textarea";
import { Separator } from "@/core/components/base/separator";

// Type definitions matching your backend
type WeeklyScheduleItem = {
	day_of_week: string;
	start_time: string;
	end_time: string;
	is_available: boolean;

	notes?: string | null;
};

type DateOverride = {
	date: Date;
	is_available: boolean;
	custom_hours?: {
		start_time: string;
		end_time: string;
	} | null;
	reason?: string;
	notes?: string;
};

type Photographer = {
	_id: string;
	name: string;
	email: string;
	mobile_number?: string | null;
	bio?: string | null;
	profile_image?: string | null;
	specialties: string[];
	photo_gallery?: string[] | null;
	weekly_schedule?: WeeklyScheduleItem[] | null;
	date_overrides?: DateOverride[] | null;
	total_bookings: number;
	completed_bookings: number;
	booking_lead_time_hours?: number | null;
};

type PhotographerResponse = {
	photographer: Photographer;
};

const PHOTOGRAPHERS_PER_PAGE = 6;

const StepThreeForm = () => {
	const { setFieldImmediate, setField, formData, validateStep } =
		useBookingFormStore();

	const [theme, setTheme] = useState(formData.theme ?? "");
	const [specialRequest, setSpecialRequest] = useState(
		formData.special_requests ?? ""
	);

	const [photographers, setPhotographers] = useState<PhotographerResponse[]>(
		[]
	);
	const [filteredPhotographers, setFilteredPhotographers] = useState<
		PhotographerResponse[]
	>([]);

	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchPhotographers = async () => {
			try {
				setLoading(true);

				const mockData: PhotographerResponse[] = [
					{
						photographer: {
							_id: "650f3f5c2a1b4a00123abcd1",
							name: "Alice Johnson",
							email: "alice.johnson@example.com",
							mobile_number: "09171234567",
							bio: `<p>Professional wedding and portrait photographer with <strong>5+ years</strong> of experience, specializing in capturing <em>timeless moments</em> that tell a story. <span style="color: #555;">Your memories, beautifully preserved.</span></p>`,
							profile_image:
								"https://images.unsplash.com/photo-1494790108755-2616b612b169?w=400&h=400&fit=crop&crop=face",
							specialties: ["Wedding", "Portrait", "Event"],
							photo_gallery: [
								"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1503264116251-35a269479413?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop",
							],
							weekly_schedule: [
								{
									day_of_week: "Monday",
									start_time: "09:00",
									end_time: "17:00",
									is_available: true,
								},
								{
									day_of_week: "Tuesday",
									start_time: "09:00",
									end_time: "17:00",
									is_available: true,
								},
							],
							date_overrides: [
								{
									date: new Date("2024-12-25"),
									is_available: false,
									reason: "Christmas Holiday",
								},
							],
							total_bookings: 15,
							completed_bookings: 14,
							booking_lead_time_hours: 24,
						},
					},
					{
						photographer: {
							_id: "650f3f5c2a1b4a00123abcd2",
							name: "Bob Smith",
							email: "bob.smith@example.com",
							mobile_number: "09171234568",
							bio: "Specialized in natural light portrait photography",
							profile_image:
								"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
							specialties: ["Portrait", "Natural Light"],
							photo_gallery: [
								"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400&h=300&fit=crop",
							],
							weekly_schedule: [
								{
									day_of_week: "Monday",
									start_time: "08:00",
									end_time: "16:00",
									is_available: true,
								},
							],
							total_bookings: 20,
							completed_bookings: 19,
							booking_lead_time_hours: 48,
						},
					},
					{
						photographer: {
							_id: "650f3f5c2a1b4a00123abcd3",
							name: "Carla Martinez",
							email: "carla.martinez@example.com",
							mobile_number: "09171234569",
							bio: "Award-winning event and lifestyle photographer capturing authentic moments.",
							profile_image:
								"https://images.unsplash.com/photo-1531891437562-4b9bcb0b6e16?w=400&h=400&fit=crop&crop=face",
							specialties: ["Event", "Lifestyle", "Documentary"],
							photo_gallery: [
								"https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1503264116251-35a269479413?w=400&h=300&fit=crop",
							],
							weekly_schedule: [
								{
									day_of_week: "Wednesday",
									start_time: "10:00",
									end_time: "18:00",
									is_available: true,
								},
								{
									day_of_week: "Friday",
									start_time: "10:00",
									end_time: "18:00",
									is_available: true,
								},
							],
							date_overrides: [
								{
									date: new Date("2024-11-01"),
									is_available: false,
									reason: "Personal Day",
								},
							],
							total_bookings: 30,
							completed_bookings: 28,
							booking_lead_time_hours: 36,
						},
					},
					{
						photographer: {
							_id: "650f3f5c2a1b4a00123abcd4",
							name: "David Lee",
							email: "david.lee@example.com",
							mobile_number: "09171234570",
							bio: "Creative photographer focusing on candid wedding photography.",
							profile_image:
								"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face",
							specialties: ["Wedding", "Candid", "Portrait"],
							photo_gallery: [
								"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
							],
							weekly_schedule: [
								{
									day_of_week: "Saturday",
									start_time: "09:00",
									end_time: "15:00",
									is_available: true,
								},
							],
							total_bookings: 10,
							completed_bookings: 10,
							booking_lead_time_hours: 12,
						},
					},
					{
						photographer: {
							_id: "650f3f5c2a1b4a00123abcd5",
							name: "Ella Thompson",
							email: "ella.thompson@example.com",
							mobile_number: "09171234571",
							bio: "Specializing in editorial and portrait photography with a modern style.",
							profile_image:
								"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
							specialties: ["Portrait", "Editorial"],
							photo_gallery: [
								"https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=300&fit=crop",
							],
							weekly_schedule: [
								{
									day_of_week: "Thursday",
									start_time: "09:00",
									end_time: "17:00",
									is_available: true,
								},
							],
							total_bookings: 12,
							completed_bookings: 11,
							booking_lead_time_hours: 24,
						},
					},
					{
						photographer: {
							_id: "650f3f5c2a1b4a00123abcd6",
							name: "Franklin Rivera",
							email: "franklin.rivera@example.com",
							mobile_number: "09171234572",
							bio: "Capturing candid moments with natural lighting and creative perspectives.",
							profile_image:
								"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face",
							specialties: ["Candid", "Lifestyle"],
							photo_gallery: [
								"https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
							],
							weekly_schedule: [
								{
									day_of_week: "Friday",
									start_time: "10:00",
									end_time: "18:00",
									is_available: true,
								},
							],
							total_bookings: 25,
							completed_bookings: 23,
							booking_lead_time_hours: 36,
						},
					},
					{
						photographer: {
							_id: "650f3f5c2a1b4a00123abcd7",
							name: "Grace Wong",
							email: "grace.wong@example.com",
							mobile_number: "09171234573",
							bio: "Wedding photographer blending classic and modern aesthetics.",
							profile_image:
								"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face",
							specialties: ["Wedding", "Portrait"],
							photo_gallery: [
								"https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&h=300&fit=crop",
							],
							weekly_schedule: [
								{
									day_of_week: "Sunday",
									start_time: "09:00",
									end_time: "16:00",
									is_available: true,
								},
							],
							total_bookings: 18,
							completed_bookings: 17,
							booking_lead_time_hours: 24,
						},
					},
					{
						photographer: {
							_id: "650f3f5c2a1b4a00123abcd8",
							name: "Henry Adams",
							email: "henry.adams@example.com",
							mobile_number: "09171234574",
							bio: "Lifestyle and portrait photographer focused on storytelling.",
							profile_image:
								"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
							specialties: ["Lifestyle", "Portrait"],
							photo_gallery: [
								"https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
							],
							weekly_schedule: [
								{
									day_of_week: "Wednesday",
									start_time: "09:00",
									end_time: "17:00",
									is_available: true,
								},
							],
							total_bookings: 22,
							completed_bookings: 20,
							booking_lead_time_hours: 30,
						},
					},
					{
						photographer: {
							_id: "650f3f5c2a1b4a00123abcd9",
							name: "Isabella Reyes",
							email: "isabella.reyes@example.com",
							mobile_number: "09171234575",
							bio: "Creative storyteller through candid and portrait photography.",
							profile_image:
								"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face",
							specialties: ["Candid", "Wedding", "Portrait"],
							photo_gallery: [
								"https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&h=300&fit=crop",
								"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
							],
							weekly_schedule: [
								{
									day_of_week: "Saturday",
									start_time: "08:00",
									end_time: "14:00",
									is_available: true,
								},
							],
							total_bookings: 16,
							completed_bookings: 15,
							booking_lead_time_hours: 20,
						},
					},
				];

				setPhotographers(mockData);
				setFilteredPhotographers(mockData);
			} catch (err) {
				setError("Failed to fetch photographers");
				console.error("Error fetching photographers:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPhotographers();
	}, []);

	useEffect(() => {
		if (searchTerm.trim() === "") {
			setFilteredPhotographers(photographers);
		} else {
			const filtered = photographers.filter(
				({ photographer }) =>
					photographer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					photographer.specialties.some((s) =>
						s.toLowerCase().includes(searchTerm.toLowerCase())
					)
			);
			setFilteredPhotographers(filtered);
		}
		setCurrentPage(1);
	}, [searchTerm, photographers]);

	const totalPages = Math.ceil(
		filteredPhotographers.length / PHOTOGRAPHERS_PER_PAGE
	);
	const displayedPhotographers = filteredPhotographers.slice(
		(currentPage - 1) * PHOTOGRAPHERS_PER_PAGE,
		currentPage * PHOTOGRAPHERS_PER_PAGE
	);

	const goToPreviousPage = () =>
		setCurrentPage((prev) => Math.max(prev - 1, 1));
	const goToNextPage = () =>
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	const goToPage = (page: number) => setCurrentPage(page);

	const handleSelectPhotographer = (
		photographerId: string,
		photograperName: string
	) => {
		if (formData.photographer_id === photographerId) {
			// Deselect if the same photographer is clicked
			setFieldImmediate("photographer_id", "");
			setFieldImmediate("photographer_name", null);
		} else {
			setFieldImmediate("photographer_id", photographerId);
			setFieldImmediate("photographer_name", photograperName);
			validateStep(3);
		}

		validateStep(3);
	};

	if (loading) {
		return (
			<div className="relative w-full overflow-auto scrollbar-hidden max-h-[70vh] 2xl:max-h-[75vh] flex flex-col gap-4 border-none px-[2px]">
				<div className="flex items-center justify-center h-64">
					<div className="flex flex-col items-center gap-2">
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
						<Label className="text-sm text-gray-600">
							Loading photographers...
						</Label>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="relative w-full overflow-auto scrollbar-hidden max-h-[70vh] 2xl:max-h-[75vh] flex flex-col gap-4 border-none px-[2px]">
				<div className="flex items-center justify-center h-64">
					<Label className="text-sm text-red-600">{error}</Label>
				</div>
			</div>
		);
	}

	return (
		<div className="relative w-full overflow-auto scrollbar-hidden max-h-[70vh] 2xl:max-h-[75vh] flex flex-col gap-4 border-none px-[2px]">
			{/* Header */}
			<div className="w-full flex flex-col gap-4 sticky top-0 bg-white z-50 pb-2">
				<Label className="text-3xl font-bold text-center py-4 sticky m-0 top-0 w-full z-50 border-y-2 border-secondary border-dashed">
					Choose a{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
						Staff / Photographer{" "}
					</span>
				</Label>
			</div>

			{/* Content */}

			<div className="h-[10em] w-full flex flex-row gap-8">
				<div className="flex flex-col gap-2 w-full">
					<Label>Theme</Label>
					<Textarea
						className="max-h-[10em] h-[10em]"
						placeholder="Describe your desired theme (e.g., anime, vintage, romantic, minimalist, etc.)"
						value={theme}
						onChange={(e) => {
							setTheme(e.target.value);
							setField("theme", e.target.value);
						}}
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<Label>Special Request</Label>
					<Textarea
						className="max-h-[10em] h-[10em]"
						placeholder="Share your special request (e.g., color scheme, style ideas, themes, or outfit details.)"
						value={specialRequest}
						onChange={(e) => {
							setSpecialRequest(e.target.value);
							setField("special_requests", e.target.value);
						}}
					/>
				</div>
			</div>

			<Separator />

			<div className="space-y-3">
				<Label className="text-2xl font-medium tracking-tight text-start text-foreground">
					Photographers
				</Label>
				<div className="relative max-w-md w-full">
					<Input
						type="text"
						placeholder="Search by name or specialty..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="xl:text-sm h-12"
					/>
				</div>
				{displayedPhotographers.length === 0 ? (
					<div className="text-center py-8">
						<Label className="text-gray-600">
							{searchTerm
								? "No photographers found matching your search."
								: "No photographers available."}
						</Label>
					</div>
				) : (
					displayedPhotographers.map(({ photographer }) => (
						<PhotographerAccordionCard
							key={photographer._id}
							id={photographer._id}
							name={photographer.name}
							profile_image={photographer.profile_image}
							email={photographer.email}
							mobile_number={photographer.mobile_number}
							bio={photographer.bio}
							specialties={photographer.specialties}
							photo_gallery={photographer.photo_gallery}
							weekly_schedule={photographer.weekly_schedule}
							date_overrides={photographer.date_overrides}
							total_bookings={photographer.total_bookings}
							completed_bookings={photographer.completed_bookings}
							booking_lead_time_hours={photographer.booking_lead_time_hours}
							onSelect={() =>
								handleSelectPhotographer(photographer._id, photographer.name)
							}
							disabled={false}
							isSelected={formData.photographer_id === photographer._id}
						/>
					))
				)}
			</div>

			{/* Pagination Controls */}
			{totalPages > 1 && (
				<div className="flex justify-center mt-6 space-x-2">
					<Button
						variant="ghost"
						size="icon"
						className="size-8 rounded-full text-2xs hover:bg-primary"
						disabled={currentPage === 1}
						onClick={goToPreviousPage}
					>
						<ChevronLeft />
					</Button>
					{Array.from({ length: totalPages }, (_, i) => (
						<Button
							key={i}
							variant={currentPage === i + 1 ? "default" : "ghost"}
							className="size-8 rounded-full text-2xs"
							onClick={() => goToPage(i + 1)}
						>
							{i + 1}
						</Button>
					))}
					<Button
						variant="ghost"
						size="icon"
						className="size-8 rounded-full text-2xs hover:bg-primary"
						disabled={currentPage === totalPages}
						onClick={goToNextPage}
					>
						<ChevronRight />
					</Button>
				</div>
			)}
		</div>
	);
};

export default StepThreeForm;
