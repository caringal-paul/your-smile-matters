import { useState, useEffect } from "react";
import { Label } from "@/core/components/base/label";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import PhotographerAccordionCard from "@/store-front/shared/components/PhotographerAccordionCard";
import { useBookingFormStore } from "@/store-front/store/useBookingFormStore";
import { Textarea } from "@/core/components/base/textarea";
import { Separator } from "@/core/components/base/separator";
import { useGetAvailablePhotographersMutation } from "../queries/getAvailablePhotographers.sf.mutation";
import { format } from "date-fns";
import { PhotographerModel } from "@/core/models/photographer.model";
import { Spinner } from "@/core/components/base/spinner";
import { GetAvailablePhotographersByTimeRangeResponseSf } from "../utils/types/booking-response.sf.types";

const PHOTOGRAPHERS_PER_PAGE = 6;

const StepThreeForm = () => {
	const { setFieldImmediate, setField, formData, validateStep } =
		useBookingFormStore();

	const { mutateAsync: getAvailablePhotographers, isPending } =
		useGetAvailablePhotographersMutation();

	const [theme, setTheme] = useState(formData.theme ?? "");
	const [specialRequest, setSpecialRequest] = useState(
		formData.special_requests ?? ""
	);

	const [photographers, setPhotographers] = useState<
		GetAvailablePhotographersByTimeRangeResponseSf[]
	>([]);
	const [filteredPhotographers, setFilteredPhotographers] = useState<
		GetAvailablePhotographersByTimeRangeResponseSf[]
	>([]);

	const selectedPhotographerObj = photographers.find(
		(p) => p._id === formData.photographer_id
	);

	const [searchTerm, setSearchTerm] = useState("");
	const [error, setError] = useState<string | null>(null);

	const [currentPage, setCurrentPage] = useState(1);

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

	useEffect(() => {
		const fetchPhotographers = async () => {
			try {
				const formattedDate = format(
					new Date(formData.booking_date),
					"yyyy-MM-dd"
				);

				const res = await getAvailablePhotographers({
					date: formattedDate!,
					start_time: formData.start_time!,
					end_time: formData.end_time!,
					session_duration_minutes: formData.session_duration_minutes!,
				});

				if (res) {
					setPhotographers(res);
					setFilteredPhotographers(res);
					setError(null);
				} else {
					setError("No photographers available for the selected time.");
				}
			} catch (err) {}
		};

		fetchPhotographers();
	}, []);

	useEffect(() => {
		if (searchTerm.trim() === "") {
			setFilteredPhotographers(photographers);
		} else {
			const filtered = photographers.filter(
				(photographer) =>
					photographer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					photographer.specialties.some((s) =>
						s.toLowerCase().includes(searchTerm.toLowerCase())
					)
			);
			setFilteredPhotographers(filtered);
		}
		setCurrentPage(1);
	}, [searchTerm, photographers]);

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

				{selectedPhotographerObj && (
					<div className="mb-4 border-border p-4 rounded-none border-b-[1px] space-y-2">
						<Label className="text-base font-medium mb-2">
							Selected Photographer
						</Label>
						<PhotographerAccordionCard
							key={selectedPhotographerObj._id}
							id={selectedPhotographerObj._id}
							name={selectedPhotographerObj.name}
							profile_image={selectedPhotographerObj.profile_image}
							email={selectedPhotographerObj.email}
							mobile_number={selectedPhotographerObj.mobile_number}
							bio={selectedPhotographerObj.bio}
							specialties={selectedPhotographerObj.specialties}
							photo_gallery={selectedPhotographerObj.photo_gallery}
							weekly_schedule={selectedPhotographerObj.weekly_schedule}
							date_overrides={selectedPhotographerObj.date_overrides}
							total_bookings={selectedPhotographerObj.total_bookings}
							completed_bookings={selectedPhotographerObj.completed_bookings}
							booking_lead_time_hours={
								selectedPhotographerObj.booking_lead_time_hours
							}
							onSelect={() =>
								handleSelectPhotographer(
									selectedPhotographerObj._id,
									selectedPhotographerObj.name
								)
							}
							disabled={false}
							isSelected={true}
						/>
					</div>
				)}

				<div className="relative max-w-md w-full">
					<Input
						type="text"
						placeholder="Search by name or specialty..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="xl:text-sm h-12"
					/>
				</div>
				{isPending ? (
					<div className="text-center py-8 flex items-center justify-center border-[1px] border-border rounded-lg">
						<Label className="flex flex-row gap-2 text-gray-600">
							<Spinner className="size-4" />
							<Label className="text-sm">
								Please hold on while we check for available photographers for
								your selected date and time.
							</Label>
						</Label>
					</div>
				) : (
					<>
						{displayedPhotographers.length === 0 ? (
							<div className="text-center py-8">
								<Label className="text-gray-600">
									{searchTerm
										? "No photographers found matching your search."
										: "No photographers available."}
								</Label>
							</div>
						) : (
							displayedPhotographers.map((photographer) => (
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
										handleSelectPhotographer(
											photographer._id,
											photographer.name
										)
									}
									disabled={false}
									isSelected={formData.photographer_id === photographer._id}
								/>
							))
						)}
					</>
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
