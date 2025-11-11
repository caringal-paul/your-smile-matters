// RequestRescheduleBookingFormModal.tsx
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	RescheduleBookingSchema,
	rescheduleSchema,
} from "@/core/schemas/reschedule.schema";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/core/components/base/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/core/components/base/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/core/components/base/popover";
import CalendarIcon from "@/ami/shared/assets/icons/CalendarIcon";
import { format } from "date-fns";
import { cn } from "@/core/lib/utils";
import { Calendar } from "@/core/components/base/calendar";
import { useGetTimeAvailabilityMutation } from "@/store-front/features/booking/queries/getTimeAvailability.sf.mutation";
import { useEffect, useState } from "react";
import { TimeSlot } from "@/core/types/time-slots.types";
import FormCard from "@/ami/shared/components/card/FormCard";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";
import { Label } from "@/core/components/base/label";
import { Spinner } from "@/core/components/base/spinner";
import {
	formatTo24HourTime,
	formatToUtc,
} from "@/ami/shared/helpers/formatDate";
import { useGetAvailablePhotographersMutation } from "@/store-front/features/booking/queries/getAvailablePhotographers.sf.mutation";
import {
	BookingResponseSf,
	GetAvailablePhotographersByTimeRangeResponseSf,
} from "@/store-front/features/booking/utils/types/booking-response.sf.types";
import { GetByIdBookingResponseAmi } from "@/ami/features/booking-management/utils/types/booking-response.ami.types";
import { Textarea } from "@/core/components/base/textarea";

type RequestRescheduleBookingFormModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: () => void;
	form: UseFormReturn<
		{
			new_start_time: string;
			new_end_time: string;
			new_photographer_id: string;
			reschedule_reason: string;
			new_booking_date?: Date | undefined;
			dummy_time?: string | undefined;
		},
		any,
		{
			new_start_time: string;
			new_end_time: string;
			new_photographer_id: string;
			reschedule_reason: string;
			new_booking_date?: Date | undefined;
			dummy_time?: string | undefined;
		}
	>;
	selectedBooking: BookingResponseSf;
};

export const RequestRescheduleBookingFormModal = ({
	open,
	onOpenChange,
	onSubmit,
	form: rescheduleForm,
	selectedBooking,
}: RequestRescheduleBookingFormModalProps) => {
	const {
		mutateAsync: getTimeAvailability,
		isPending: isCheckingForAvailability,
	} = useGetTimeAvailabilityMutation();

	const {
		mutateAsync: getAvailablePhotographers,
		isPending: isCheckingForPhotographers,
	} = useGetAvailablePhotographersMutation();

	const [slots, setSlots] = useState<TimeSlot[]>([]);
	const [photographers, setPhotographers] = useState<
		GetAvailablePhotographersByTimeRangeResponseSf[]
	>([]);

	const [error, setError] = useState<string | null>(null);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Reschedule Booking</DialogTitle>
				</DialogHeader>

				<Form {...rescheduleForm}>
					<form className="flex flex-col gap-3">
						<FormField
							control={rescheduleForm.control}
							name="new_booking_date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel className="2xl:text-xs font-semibold">
										New Booking Date
									</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"pl-3 text-left font-light w-full",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span className="text-xs xl:text-sm text-gray-400 font-light">
															Choose new booking date
														</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-full" align="end">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={(date) => {
													if (date) {
														field.onChange(formatToUtc(date));

														const newBookingDate = date;

														if (newBookingDate) {
															const formattedDate = format(
																newBookingDate,
																"yyyy-MM-dd"
															);

															const checkAvailability = async () => {
																try {
																	const response = await getTimeAvailability({
																		date: formattedDate!,
																		session_duration_minutes:
																			selectedBooking.session_duration_minutes,
																	});

																	if (response && response.length > 0) {
																		setSlots(response);
																	} else {
																		rescheduleForm.setValue(
																			"new_start_time",
																			""
																		);
																		rescheduleForm.setValue("new_end_time", "");
																	}
																} catch (error) {
																	console.error(
																		"Error fetching time availability:",
																		error
																	);
																}
															};

															checkAvailability();
														}
													}
												}}
												disabled={(date) => {
													const today = new Date();
													today.setHours(0, 0, 0, 0); // reset to start of day
													return date < today; // disables only dates before today
												}}
												captionLayout="dropdown"
											/>
										</PopoverContent>
									</Popover>
									<FormMessage className="ml-1" />
								</FormItem>
							)}
						/>

						{error && (
							<p
								className={cn(
									"xs:text-2xs text-base font-medium text-destructive ml-1"
								)}
							>
								{error}
							</p>
						)}

						<FormField
							control={rescheduleForm.control}
							name="dummy_time"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel className="2xl:text-xs font-semibold">
										Time
									</FormLabel>
									<Select
										value={field.value}
										onValueChange={async (value) => {
											const formattedSlot = value.split(" - ");

											if (
												Array.isArray(formattedSlot) &&
												formattedSlot.length === 2
											) {
												const slot: TimeSlot = {
													start: formattedSlot[0],
													end: formattedSlot[1],
												};

												rescheduleForm.setValue(
													"new_start_time",
													formatTo24HourTime(slot.start)
												);
												rescheduleForm.setValue(
													"new_end_time",
													formatTo24HourTime(slot.end)
												);
											}

											field.onChange(value);

											const formattedDate = format(
												new Date(rescheduleForm.getValues("new_booking_date")!),
												"yyyy-MM-dd"
											);

											const res = await getAvailablePhotographers({
												date: formattedDate!,
												start_time: rescheduleForm.getValues("new_start_time")!,
												end_time: rescheduleForm.getValues("new_end_time")!,
												session_duration_minutes:
													selectedBooking.session_duration_minutes!,
											});

											if (res) {
												setPhotographers(res);

												setError(null);
											} else {
												setError(
													"No photographers available for the selected time."
												);
											}
										}}
									>
										<SelectTrigger
											className={`w-full h-9 xl:h-9 rounded-xl shadow-none border-border ${
												!field.value ? "text-gray-400" : "text-foreground"
											}`}
											disabled={slots.length === 0}
										>
											{isCheckingForAvailability ? (
												<Label className="flex flex-row items-center gap-1 text-sm xl:text-sm 2xl:text-sm placeholder:text-2xs placeholder:xl:text-xs placeholder:2xl:text-sm font-light">
													<Spinner className="xl:size-4" /> Checking for time
													slots...
												</Label>
											) : (
												<Label className="text-sm xl:text-sm 2xl:text-sm font-light">
													<SelectValue placeholder="Select slot" />
												</Label>
											)}
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{slots.map((slot, index) => {
													return (
														<SelectItem
															className="text-2xs xl:text-xs 2xl:text-sm"
															key={index}
															value={`${slot.start} - ${slot.end}`}
														>{`${slot.start} - ${slot.end}`}</SelectItem>
													);
												})}
											</SelectGroup>
										</SelectContent>
									</Select>

									<div />
									<FormMessage className="ml-1" />
								</FormItem>
							)}
						/>

						<FormField
							control={rescheduleForm.control}
							name="new_photographer_id"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel className="2xl:text-xs font-semibold">
										Photographer
									</FormLabel>
									<Select
										value={field.value}
										onValueChange={async (value) => {
											field.onChange(value);
										}}
									>
										<SelectTrigger
											className={`w-full h-9 xl:h-9 rounded-xl shadow-none border-border ${
												!field.value ? "text-gray-400" : "text-foreground"
											}`}
											disabled={photographers.length === 0}
										>
											{isCheckingForPhotographers ? (
												<Label className="flex flex-row items-center gap-1 text-sm xl:text-sm 2xl:text-sm placeholder:text-2xs placeholder:xl:text-xs placeholder:2xl:text-sm font-light">
													<Spinner className="xl:size-4" /> Checking for
													photographers...
												</Label>
											) : (
												<Label className="text-sm xl:text-sm 2xl:text-sm font-light">
													<SelectValue placeholder="Select photographer" />
												</Label>
											)}
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{photographers.map((photographer) => {
													return (
														<SelectItem
															className="text-2xs xl:text-xs 2xl:text-sm"
															key={photographer._id}
															value={photographer._id}
														>
															{photographer.name}
														</SelectItem>
													);
												})}
											</SelectGroup>
										</SelectContent>
									</Select>

									<div />
									<FormMessage className="ml-1" />
								</FormItem>
							)}
						/>

						<FormField
							control={rescheduleForm.control}
							name="reschedule_reason"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel className="2xl:text-xs font-semibold">
										Reason for Rescheduling
									</FormLabel>
									<Textarea
										id={`reschedule_reason`}
										placeholder="Define your reason for rescheduling the booking"
										{...field}
										className="disabled:opacity-50 max-h-[20em] h-[10em] font-light text-xs xl:text-xs 2xl:text-sm"
									/>

									<div />
									<FormMessage className="ml-1" />
								</FormItem>
							)}
						/>

						<DialogFooter className="flex flex-row gap-1">
							<Button
								type="button"
								className="w-full"
								disabled={
									!rescheduleForm.getValues("new_booking_date") ||
									!rescheduleForm.getValues("new_start_time") ||
									!rescheduleForm.getValues("new_end_time") ||
									!rescheduleForm.getValues("new_photographer_id")
								}
								onClick={onSubmit}
							>
								Send for Approval
							</Button>
							<Button
								type="button"
								variant="outline"
								className="w-1/3"
								onClick={() => onOpenChange(false)}
							>
								Cancel
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
