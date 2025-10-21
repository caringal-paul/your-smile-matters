import { ReactEventHandler, useState } from "react";
import { Check, Clock, Edit, X } from "lucide-react";
import { Calendar } from "@/core/components/base/calendar";
import { Label } from "@/core/components/base/label";
import { useBookingFormStore } from "@/store-front/store/useBookingFormStore";
import {
	formatToUtc,
	formatTo24HourTime,
} from "@/ami/shared/helpers/formatDate";
import { Card, CardContent } from "@/core/components/base/card";
import { Button } from "@/core/components/base/button";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { formatDurationByMinutes } from "@/store-front/shared/helpers/formatDuration";
import DurationInput from "@/core/components/custom/DurationInput";
import { Textarea } from "@/core/components/base/textarea";
import { useGetTimeAvailabilityMutation } from "../queries/getTimeAvailability.sf.mutation";
import { TimeSlot } from "@/core/types/time-slots.types";
import { toast } from "sonner";
import { format } from "date-fns";
import { Spinner } from "@/core/components/base/spinner";

const StepTwoForm = () => {
	const { formData, setFieldImmediate, setField, validateStep } =
		useBookingFormStore();

	const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

	const {
		mutateAsync: getTimeAvailability,
		isPending: isCheckingForAvailability,
	} = useGetTimeAvailabilityMutation();

	const [isDurationCustom, setIsDurationCustom] = useState(false);

	const [duration, setDuration] = useState<string>("");
	const [location, setLocation] = useState<string>(formData.location || "");

	const handleDateSelect = (date: Date) => {
		if (date) {
			setFieldImmediate("booking_date", formatToUtc(date));
		}
	};

	const handleCheckAvailability = async () => {
		if (!formData.booking_date) {
			toast("Please select a booking date.");
			return;
		}

		if (
			!formData.session_duration_minutes ||
			formData.session_duration_minutes <= 0
		) {
			toast("Please set a valid session duration.");
			return;
		}

		const formattedDate = format(new Date(formData.booking_date), "yyyy-MM-dd");

		await getTimeAvailability({
			date: formattedDate,
			session_duration_minutes: formData.session_duration_minutes,
		})
			.then((slots) => {
				setAvailableSlots(slots);
			})
			.catch((error) => {
				console.error("Error fetching time availability:", error);
				toast.error("Error fetching time availability. Please try again.");
			});
	};

	return (
		<div className="relative w-full overflow-auto scrollbar-hidden max-h-[70vh] 2xl:max-h-[75vh] flex flex-col gap-4 border-none px-[2px]">
			<div className="w-full flex flex-col gap-4 sticky top-0 bg-white z-50 pb-2">
				<Label className="text-3xl font-bold tracking-normal text-center py-4 sticky m-0 top-0 w-full z-50 border-y-2 border-secondary border-dashed">
					Set your{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
						Appointment{" "}
					</span>
					Date
				</Label>
			</div>

			{/* Content */}
			<div className="flex flex-col lg:flex-row gap-4 max-h-[70em] h-full">
				{/* Left: Calendar */}
				<div className="flex-1 max-w-lg w-full max-h-[70em] h-full  mx-auto">
					<h3 className="text-lg font-semibold text-center mb-2 text-gray-800">
						Choose a date
					</h3>
					<Calendar
						disabled={(date) =>
							formData.is_booking_sent ||
							date < new Date(new Date().setHours(0, 0, 0, 0))
						}
						mode="single"
						selected={formData.booking_date}
						onDayClick={handleDateSelect}
						className="w-full rounded-md border"
					/>
				</div>

				{/* Right: Service + Slots */}
				<div className="flex-1 flex flex-col gap-2 h-full max-h-[70em]">
					{/* Service Details */}
					<div className="flex flex-row gap-2 w-full">
						<div className="h-fit w-full ">
							<h3 className="text-lg font-semibold text-center mb-2 text-gray-800">
								Service Details
							</h3>

							<Card className="border">
								<CardContent className="flex justify-between items-center h-[6em]">
									<div>
										{formData.services.length > 0 && (
											<div className="flex flex-col gap-1">
												<Label className="text-sm text-foreground">
													Total:{" "}
													{formatToPeso(formData.total_amount.toFixed(2))}
												</Label>

												{isDurationCustom ? (
													<div className="flex flex-col gap-1 max-w-[15em] ">
														<DurationInput
															value={duration}
															onChange={setDuration}
															disabled={formData.is_booking_sent}
														/>

														<Label className="text-gray-400 font-light leading-none tracking-tight text-4xs line-clamp-2">
															Enter duration in minutes (must be in 30-minute
															intervals). Example: 2 hrs = 120, 1 hr 30 mins =
															90
														</Label>
													</div>
												) : (
													<Label className="text-sm text-foreground">
														Session duration:{" "}
														{formatDurationByMinutes(
															formData.session_duration_minutes
														)}
													</Label>
												)}
											</div>
										)}
									</div>
									<div className="flex flex-col gap-2 ml-2">
										{isDurationCustom && (
											<Button
												onClick={() => {
													setFieldImmediate(
														"session_duration_minutes",
														Number(duration)
													);

													setIsDurationCustom(false);
												}}
												disabled={formData.is_booking_sent}
											>
												<Check />
											</Button>
										)}

										<Button
											className={`bg-secondary text-xs ${
												formData.is_booking_sent && "hidden"
											}`}
											onClick={() => {
												setIsDurationCustom(!isDurationCustom);
											}}
										>
											{!isDurationCustom ? (
												<Edit className="size-3" />
											) : (
												<X className="size-3" />
											)}
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>

						<div className="h-fit w-full ">
							<h3 className="text-lg font-semibold text-center mb-2 text-gray-800">
								Location
							</h3>

							<Textarea
								className="max-h-[7em] h-[7em] xl:text-sm xl:placeholder:text-sm tracking-tight p-4 rounded-lg"
								placeholder="Enter your location (e.g. address, barangay, city, etc.)"
								value={location}
								disabled={formData.is_booking_sent}
								onChange={(e) => {
									setLocation(e.target.value);
									setField("location", e.target.value);
								}}
							/>
						</div>
					</div>

					{/* Available Slots */}
					<div className="flex-1 h-[18em] overflow-auto">
						<h3 className="text-lg font-semibold text-center mb-2 text-gray-800">
							Our Available Schedule For You
						</h3>

						<div className="grid grid-cols-2 gap-3 max-h-[18em] overflow-y-auto pr-1">
							{isCheckingForAvailability ? (
								<div className="flex gap-2 justify-center items-center col-span-2 h-[18em] border border-border rounded-lg">
									<Spinner className="size-4" />
									<Label className="text-sm">
										Hang on a moment while we check for available slots. Please
										wait.
									</Label>
								</div>
							) : (
								<>
									{availableSlots.length === 0 ? (
										<div className="flex justify-center items-center col-span-2 h-[18em] border border-border rounded-lg">
											<Label className="text-sm">
												Press Check Availability Status to check for available
												schedules
											</Label>
										</div>
									) : (
										<>
											{availableSlots.map((slot, index) => (
												<div
													key={index}
													className={`flex items-center p-3 border border-border rounded-lg hover:border-primary/40 transition-colors cursor-pointer ${
														formData.start_time ===
															formatTo24HourTime(slot.start) &&
														formData.end_time === formatTo24HourTime(slot.end)
															? "bg-primary/10 border-primary"
															: "bg-white"
													}`}
													onClick={() => {
														if (formData.is_booking_sent) return;

														setFieldImmediate(
															"start_time",
															formatTo24HourTime(slot.start)
														);
														setFieldImmediate(
															"end_time",
															formatTo24HourTime(slot.end)
														);

														validateStep(2);
													}}
												>
													<div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center mr-3">
														<Clock size={16} className="text-primary" />
													</div>
													<div className="text-sm">
														<div className="font-medium text-gray-800">
															{slot.start}
														</div>
														<div className="text-gray-500">{slot.end}</div>
													</div>
												</div>
											))}
										</>
									)}
								</>
							)}
						</div>
					</div>

					<Button
						className="w-full rounded-lg h-full"
						onClick={handleCheckAvailability}
					>
						Check Available Schedules
					</Button>
				</div>
			</div>
		</div>
	);
};

export default StepTwoForm;
