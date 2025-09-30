import { useState } from "react";
import { Check, Clock } from "lucide-react";
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
import { formatDuration } from "@/store-front/shared/helpers/formatDurationMinutes";
import DurationInput from "@/core/components/custom/DurationInput";
import { Textarea } from "@/core/components/base/textarea";

const StepTwoForm = () => {
	const {
		formData,
		setFieldImmediate,
		setField,
		validateStep,
		stepValidation,
	} = useBookingFormStore();

	const [isDurationCustom, setIsDurationCustom] = useState(false);

	const [duration, setDuration] = useState<string>("");
	const [location, setLocation] = useState<string>(formData.location || "");

	const availableSlots = [
		{ start: "09:00 AM", end: "11:00 AM" },
		{ start: "12:30 PM", end: "02:00 PM" },
		{ start: "03:00 PM", end: "05:00 PM" },
		{ start: "07:00 AM", end: "08:30 AM" },
		{ start: "10:00 AM", end: "12:00 PM" },
		{ start: "01:00 PM", end: "03:00 PM" },
		{ start: "06:00 PM", end: "08:00 PM" },
		{ start: "08:30 AM", end: "09:30 AM" },
		{ start: "02:00 PM", end: "04:00 PM" },
		{ start: "04:30 PM", end: "06:00 PM" },
		{ start: "11:00 AM", end: "12:30 PM" },
		{ start: "09:30 AM", end: "11:00 AM" },
		{ start: "05:00 PM", end: "06:30 PM" },
		{ start: "07:30 AM", end: "09:00 AM" },
		{ start: "03:30 PM", end: "05:00 PM" },
		{ start: "06:30 AM", end: "08:00 AM" },
		{ start: "01:30 PM", end: "02:30 PM" },
		{ start: "10:30 AM", end: "12:00 PM" },
		{ start: "08:00 PM", end: "09:30 PM" },
		{ start: "11:30 AM", end: "01:00 PM" },
	];

	const handleDateSelect = (date: Date) => {
		if (date) {
			setFieldImmediate("booking_date", formatToUtc(date));
		}
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
						disabled={formData.is_booking_sent}
						mode="single"
						selected={formData.booking_date}
						onDayClick={handleDateSelect}
						className="w-full rounded-md border"
					/>
				</div>

				{/* Right: Service + Slots */}
				<div className="flex-1 flex flex-col gap-2 h-full max-h-[70em]">
					{/* Service Details */}
					<div className="h-fit">
						<h3 className="text-lg font-semibold text-center mb-2 text-gray-800">
							Service Details
						</h3>

						<Card className="border">
							<CardContent className="flex justify-between items-center">
								<div>
									{formData.services.length > 0 && (
										<div className="flex flex-col gap-2">
											<Label className="text-sm text-foreground">
												Total: {formatToPeso(formData.total_amount.toFixed(2))}
											</Label>

											{isDurationCustom ? (
												<div className="flex flex-col gap-1 max-w-[15em] ">
													<DurationInput
														value={duration}
														onChange={setDuration}
														disabled={formData.is_booking_sent}
													/>

													<Label className="text-gray-400 font-light leading-none tracking-tight text-2xs line-clamp-2">
														Enter duration in minutes (must be in 30-minute
														intervals). Example: 2 hrs = 120, 1 hr 30 mins = 90
													</Label>
												</div>
											) : (
												<Label className="text-sm text-foreground">
													Session duration:{" "}
													{formatDuration(formData.session_duration_minutes)}
												</Label>
											)}
										</div>
									)}
								</div>
								<div className="flex flex-row gap-2">
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
										{!isDurationCustom ? "Set own duration" : "Cancel"}
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="h-fit">
						<h3 className="text-lg font-semibold text-center mb-2 text-gray-800">
							Location
						</h3>

						<Textarea
							className="max-h-[7em] h-[7em] xl:text-sm xl:placeholder:text-sm tracking-tight p-4"
							placeholder="Enter your location (e.g. address, barangay, city, etc.)"
							value={location}
							disabled={formData.is_booking_sent}
							onChange={(e) => {
								setLocation(e.target.value);
								setField("location", e.target.value);
							}}
						/>
					</div>

					{/* Available Slots */}
					<div className="flex-1 h-[10em] overflow-auto">
						<h3 className="text-lg font-semibold text-center mb-2 text-gray-800">
							Our Available Schedule For You
						</h3>

						<div className="grid grid-cols-2 gap-3 max-h-[10em] overflow-y-auto pr-1">
							{availableSlots.length === 0 ? (
								<div className="bg-red-500 flex justify-center items-center col-span-2 h-[10em]">
									<Label className="text-sm">
										Press Check Availability Status to Check for available
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
						</div>
					</div>

					<Button className="w-full rounded-lg h-full">
						Check Available Schedules
					</Button>
				</div>
			</div>
		</div>
	);
};

export default StepTwoForm;
