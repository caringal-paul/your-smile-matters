// Components
import { Label } from "@/core/components/base/label";
import { useParams } from "react-router-dom";
import FormCard from "@/ami/shared/components/card/FormCard";
import {
	formatDateToTextMonth,
	formatToNormalDate,
	formatToNormalTime,
} from "@/ami/shared/helpers/formatDate";

import { Check, X, Calendar, Play, CheckCircle2, Undo2 } from "lucide-react";

import image from "/profile-avatar.jpg";
import { Badge } from "@/core/components/base/badge";
import { useGetBookingByIdQuery } from "../queries/getBookingById.ami.query";
import { formatDurationByMinutes } from "@/store-front/shared/helpers/formatDuration";
import { cn } from "@/core/lib/utils";
import { BOOKING_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import parse from "html-react-parser";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/core/components/base/item";
import { BookingStatus } from "@/ami/shared/types/status.types";
import { useMemo, useState } from "react";
import { Button } from "@/core/components/base/button";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { useConfirmBookingMutation } from "../queries/confirmBooking.ami.mutation";
import { useCancelBookingMutation } from "../queries/cancelBooking.ami.mutation";
import { useRescheduleBookingMutation } from "../queries/rescheduleBooking.ami.mutation";
import { useStartBookingMutation } from "../queries/startBooking.ami.mutation";
import { toast } from "sonner";
import { useCompleteBookingMutation } from "../queries/completeBooking.ami.mutation";

const ViewBookingForm = () => {
	const { id } = useParams();

	const { data: booking, isLoading } = useGetBookingByIdQuery(id!);

	if (isLoading) {
		return <>Loading</>;
	}

	if (!booking) {
		return <>Booking Not Found</>;
	}

	return (
		<div className="pb-8 grid grid-cols-1 xl:grid-cols-3 gap-4">
			<FormCard className="col-span-1 xl:col-span-3 w-full h-full">
				<FormCard.Title className="flex flex-row items-center justify-between gap-2">
					<span>
						Reference No:
						<strong className="text-primary font-bold">
							{booking?.booking_reference}
						</strong>
						<Badge
							className={cn(
								"ml-2 text-2xs 2xl:text-xs",
								BOOKING_STATUS_COLORS[booking.status]
							)}
						>
							{booking.status}
						</Badge>
					</span>

					<BookingFormButtonControls
						status={booking.status}
						bookingId={booking._id}
					/>
				</FormCard.Title>
				<div className="flex flex-col w-full gap-2 2xl:gap-4 lg:flex-row lg:min-h-fit">
					<div className="flex flex-col w-full gap-4 p-4 lg:w-2/3">
						<FormCard.Field>
							<FormCard.Label>Scheduled Date:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{formatToNormalDate(booking?.booking_date)} @{" "}
								{formatToNormalTime(booking?.start_time)} -{" "}
								{formatToNormalTime(booking?.end_time)} (
								{formatDurationByMinutes(booking?.session_duration_minutes)}{" "}
								minutes)
							</Label>
						</FormCard.Field>

						<FormCard.Field>
							<FormCard.Label>Location:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{booking?.location || "-"}
							</Label>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label>Theme/s:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{booking.theme || "-"}
							</Label>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label>Special Requests</FormCard.Label>
							<Label className="font-normal text-2xs">
								{booking.special_requests || "-"}
							</Label>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label>Customized?:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{booking.is_customized ? (
									<div className="bg-green-500  size-5 rounded-full shadow-md text-white flex justify-center items-center">
										<Check className="size-3" />
									</div>
								) : (
									<div className="bg-red-500  size-5 rounded-full shadow-md text-white flex justify-center items-center">
										<X className="size-3" />
									</div>
								)}
							</Label>
						</FormCard.Field>

						{booking.is_customized && (
							<FormCard.Field>
								<FormCard.Label>Customization Notes:</FormCard.Label>
								<Label className="font-normal text-2xs line-clamp-4 max-w-[40em]">
									{booking.customization_notes || "-"}
								</Label>
							</FormCard.Field>
						)}

						{booking.created_at && (
							<FormCard.Field>
								<FormCard.Label>Booking request date:</FormCard.Label>
								<Label className="font-normal text-2xs line-clamp-4 max-w-[40em]">
									{formatToNormalDate(booking.created_at) || "-"}
								</Label>
							</FormCard.Field>
						)}

						{booking.booking_confirmed_at && (
							<FormCard.Field>
								<FormCard.Label>Approved date:</FormCard.Label>
								<Label className="font-normal text-2xs line-clamp-4 max-w-[40em]">
									{formatToNormalDate(booking.booking_confirmed_at) || "-"}
								</Label>
							</FormCard.Field>
						)}

						{booking.rescheduled_from && (
							<FormCard.Field>
								<FormCard.Label>Rescheduled at:</FormCard.Label>
								<Label className="font-normal text-2xs line-clamp-4 max-w-[40em]">
									{formatToNormalDate(booking.rescheduled_from) || "-"}
								</Label>
							</FormCard.Field>
						)}

						{booking.status === "Cancelled" && booking.cancelled_reason && (
							<FormCard.Field>
								<FormCard.Label>Reason for cancellation:</FormCard.Label>
								<Label className="font-normal text-2xs line-clamp-4 max-w-[40em]">
									{booking.cancelled_reason || "-"}
								</Label>
							</FormCard.Field>
						)}
					</div>
				</div>
			</FormCard>

			{/* PHOTOGRAPHER */}
			<FormCard className="col-span-1 w-full h-full">
				<FormCard.Title className="flex flex-row items-center gap-2">
					Photographer Details
				</FormCard.Title>
				<div className="flex flex-col w-full gap-4">
					<FormCard.Field>
						<FormCard.Label>Name:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{booking.photographer_id?.name || "-"}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Email:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{booking.photographer_id?.email || "-"}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Mobile Number:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{booking.photographer_id?.mobile_number || "-"}
						</Label>
					</FormCard.Field>
					<FormCard.Field className="items-start">
						<FormCard.Label>Bio:</FormCard.Label>
						<Label className="font-normal text-2xs 2xl:max-w-[70%] line-clamp-4">
							{parse(String(booking.photographer_id?.bio)) || "-"}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Specialties:</FormCard.Label>
						<div className="2xl:max-w-[60%] flex flex-row flex-wrap gap-2">
							{Array.isArray(booking.photographer_id?.specialties) &&
							booking.photographer_id?.specialties.length > 0 ? (
								booking.photographer_id?.specialties.map((specialty, index) => (
									<Badge
										key={index}
										className="text-3xs 2xl:text-2xs mr-1 mb-1"
									>
										{specialty}
									</Badge>
								))
							) : (
								<Label className="font-normal text-2xs">-</Label>
							)}
						</div>
					</FormCard.Field>

					{booking.photographer_notes ? (
						<FormCard.Field>
							<FormCard.Label>Notes:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{booking.photographer_notes || "-"}
							</Label>
						</FormCard.Field>
					) : null}

					{booking.photographer_rating ? (
						<FormCard.Field>
							<FormCard.Label>Booking Rating:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{booking.photographer_rating || "-"}
							</Label>
						</FormCard.Field>
					) : null}
				</div>
			</FormCard>

			{/* CUSTOMER */}
			<FormCard className="col-span-1 w-full h-full ">
				<FormCard.Title className="flex flex-row items-center gap-2">
					Customer Details
				</FormCard.Title>
				<div className="flex flex-col w-full gap-4">
					<FormCard.Field>
						<FormCard.Label>Name:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{booking.customer_id?.first_name} {booking.customer_id?.last_name}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Email:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{booking.customer_id?.email || "-"}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Mobile Number:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{booking.customer_id?.mobile_number || "-"}
						</Label>
					</FormCard.Field>
					{/* <FormCard.Field>
							<FormCard.Label>Specialties:</FormCard.Label>
							<div className="max-w-[60%] flex flex-row flex-wrap gap-2">
								{Array.isArray(booking.customer?.specialties) &&
								booking.photographer_id?.specialties.length > 0 ? (
									booking.photographer_id?.specialties.map(
										(specialty, index) => (
											<Badge
												key={index}
												className="text-3xs 2xl:text-2xs mr-1 mb-1"
											>
												{specialty}
											</Badge>
										)
									)
								) : (
									<Label className="font-normal text-2xs">-</Label>
								)}
							</div>
						</FormCard.Field> */}
				</div>
			</FormCard>
			<FormCard className="col-span-1 w-full h-full ">
				<FormCard.Title className="flex flex-row items-center gap-2">
					Payment Details
				</FormCard.Title>
				<div className="flex flex-col w-full gap-4">
					<FormCard.Field>
						<FormCard.Label>Total Price:</FormCard.Label>
						<Label className="font-normal text-2xs flex flex-row items-center gap-2">
							{booking.discount_amount && booking.promo_id?.promo_code ? (
								<span className="text-xs font-normal text-foreground">
									{formatToPeso(String(booking.total_amount))} -{" "}
									{formatToPeso(String(booking.discount_amount))} =
								</span>
							) : null}
							<span className="text-destructive font-bold text-sm">
								{formatToPeso(String(booking.final_amount))}
							</span>
						</Label>
					</FormCard.Field>

					<FormCard.Field>
						<FormCard.Label>Amount Paid:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{formatToPeso(String(booking.payment_status?.amount_paid))}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Remaining Balance:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{formatToPeso(
								String(booking.payment_status?.remaining_balance)
							) || "-"}
						</Label>
					</FormCard.Field>

					{booking.discount_amount && booking.promo_id?.promo_code ? (
						<FormCard.Field>
							<FormCard.Label>Promo code used:</FormCard.Label>
							<Label className="font-normal text-2xs flex flex-row items-center gap-2">
								{booking.promo_id?.promo_code}
							</Label>
						</FormCard.Field>
					) : null}
				</div>
			</FormCard>

			<FormCard className="col-span-1 xl:col-span-3 w-full h-full">
				<FormCard.Title>Service Details</FormCard.Title>

				{booking.package_id && booking.package_id._id ? (
					<Item variant={"outline"}>
						<ItemContent>
							<ItemContent>
								<ItemTitle className="line-clamp-1">
									<span className="text-muted-foreground">
										{booking.package_id.name}
									</span>
								</ItemTitle>
								<ItemDescription>
									{booking.package_id.description}
								</ItemDescription>
							</ItemContent>
							<ItemContent className="flex-none text-center">
								<ItemDescription>
									{booking.package_id.package_price}
								</ItemDescription>
							</ItemContent>
						</ItemContent>
					</Item>
				) : null}

				<ItemGroup className="flex flex-col w-full gap-4 p-4">
					{booking.services?.map((service, index) => (
						<Item key={index} role="listitem" variant={"outline"}>
							<ItemContent>
								<ItemContent>
									<ItemTitle className="line-clamp-1">
										<Label className="text-xs 2xl:text-sm font-semibold">
											{service.service_id.name}
										</Label>
									</ItemTitle>
									<ItemDescription className="text-2xs 2xl:text-xs">
										{service.service_id.category}
									</ItemDescription>
								</ItemContent>
							</ItemContent>
							<ItemContent className="flex-none text-center">
								<ItemDescription className="font-bold  text-sm 2xl:text-base">
									{formatToPeso(String(service.service_id.price))}
								</ItemDescription>
							</ItemContent>
						</Item>
					))}
				</ItemGroup>
			</FormCard>
		</div>
	);
};

type BookingFormButtonControlsProps = {
	status: BookingStatus;
	bookingId: string;
};

const BookingFormButtonControls = ({
	status,
	bookingId: propBookingId,
}: BookingFormButtonControlsProps) => {
	const params = useParams();
	const bookingId = propBookingId || params.id;

	const { mutateAsync: confirmMutation, isPending: isConfirming } =
		useConfirmBookingMutation();
	const { mutateAsync: cancelMutation, isPending: isCancelling } =
		useCancelBookingMutation();
	const { mutateAsync: rescheduleMutation, isPending: isRecheduling } =
		useRescheduleBookingMutation();
	const { mutateAsync: startMutation, isPending: isStarting } =
		useStartBookingMutation();
	const { mutateAsync: completeMutation, isPending: isCompleting } =
		useCompleteBookingMutation();

	// Handler functions
	const handleConfirm = () => {
		if (window.confirm("Are you sure you want to confirm this booking?")) {
			confirmMutation(String(bookingId));
		}
	};

	const handleCancel = () => {
		const cancelled_reason: string = "Sample Cancel Reason";

		if (cancelled_reason.trim().length < 5) {
			toast.error("Cancellation reason must be at least 5 characters");
			return;
		}

		cancelMutation({
			id: String(bookingId),
			cancelled_reason,
		});
	};

	const handleReschedule = () => {
		const new_booking_date = new Date(); // For demo purposes, set to current date
		const new_start_time = "10:00"; // For demo purposes
		const new_end_time = "11:00"; // For demo purposes

		if (!new_booking_date || !new_start_time) {
			toast.error("Date and start time are required");
			return;
		}

		rescheduleMutation({
			id: String(bookingId),
			payload: {
				new_booking_date,
				new_start_time,
				new_end_time,
			},
		});
	};

	const handleStart = () => {
		if (
			window.confirm("Are you sure you want to start this booking session?")
		) {
			startMutation(String(bookingId));
		}
	};

	const handleComplete = () => {
		if (
			window.confirm(
				"Are you sure you want to complete this booking? Payment must be complete."
			)
		) {
			completeMutation(String(bookingId));
		}
	};

	const isMutating =
		isConfirming || isCancelling || isRecheduling || isStarting || isCompleting;

	// Memoized UI based on status
	const buttonControls = useMemo(() => {
		// Pending Status: Can Confirm, Cancel, or Reschedule
		if (status === "Pending") {
			return (
				<div className="flex flex-row gap-2">
					<Button
						onClick={handleConfirm}
						disabled={isMutating}
						variant="default"
						size="sm"
						className={cn(
							`hover:bg-[${BOOKING_STATUS_COLORS["Confirmed"]}] gap-2`,
							BOOKING_STATUS_COLORS["Confirmed"]
						)}
					>
						<Check className="size-4" />
						Confirm Booking
					</Button>
					<Button
						onClick={handleReschedule}
						disabled={isMutating}
						size="sm"
						className={cn(
							`hover:bg-[${BOOKING_STATUS_COLORS["Rescheduled"]}] gap-2`,
							BOOKING_STATUS_COLORS["Rescheduled"]
						)}
					>
						<Calendar className="size-4" />
						Reschedule
					</Button>
					<Button
						onClick={handleCancel}
						disabled={isMutating}
						variant="destructive"
						size="sm"
						className={cn(
							"gap-2 text-white",
							BOOKING_STATUS_COLORS["Cancelled"]
						)}
					>
						<X className="size-4" />
						Cancel
					</Button>
				</div>
			);
		}

		// Confirmed Status: Can Start (on booking date), Reschedule, or Cancel
		if (status === "Confirmed") {
			return (
				<div className="flex flex-row gap-2">
					<Button
						onClick={handleStart}
						disabled={isMutating}
						variant="default"
						size="sm"
						className={cn(
							`hover:bg-[${BOOKING_STATUS_COLORS["Ongoing"]}] gap-2`,
							BOOKING_STATUS_COLORS["Ongoing"]
						)}
					>
						<Play className="size-4" />
						Start Session
					</Button>
					<Button
						onClick={handleReschedule}
						disabled={isMutating}
						size="sm"
						className={cn(
							`hover:bg-[${BOOKING_STATUS_COLORS["Rescheduled"]}] gap-2`,
							BOOKING_STATUS_COLORS["Rescheduled"]
						)}
					>
						<Calendar className="size-4" />
						Reschedule
					</Button>
					<Button
						onClick={handleCancel}
						disabled={isMutating}
						variant="destructive"
						size="sm"
						className={cn(
							"gap-2 text-white",
							BOOKING_STATUS_COLORS["Cancelled"]
						)}
					>
						<X className="size-4" />
						Cancel
					</Button>
				</div>
			);
		}

		// Rescheduled Status: Can Start (on booking date), Reschedule again, or Cancel
		if (status === "Rescheduled") {
			return (
				<div className="flex flex-row gap-2">
					<Button
						onClick={handleStart}
						disabled={isMutating}
						variant="default"
						size="sm"
						className={cn(
							`hover:bg-[${BOOKING_STATUS_COLORS["Ongoing"]}] gap-2`,
							BOOKING_STATUS_COLORS["Ongoing"]
						)}
					>
						<Play className="size-4" />
						Start Session
					</Button>
					<Button
						onClick={handleReschedule}
						disabled={isMutating}
						size="sm"
						className={cn(
							`hover:bg-[${BOOKING_STATUS_COLORS["Rescheduled"]}] gap-2`,
							BOOKING_STATUS_COLORS["Rescheduled"]
						)}
					>
						<Calendar className="size-4" />
						Reschedule Again
					</Button>
					<Button
						onClick={handleCancel}
						disabled={isMutating}
						variant="destructive"
						size="sm"
						className={cn(
							"gap-2 text-white",
							BOOKING_STATUS_COLORS["Cancelled"]
						)}
					>
						<X className="size-4" />
						Cancel
					</Button>
				</div>
			);
		}

		// Ongoing Status: Can only Complete
		if (status === "Ongoing") {
			return (
				<div className="flex flex-row gap-2">
					<Button
						onClick={handleComplete}
						disabled={isMutating}
						variant="default"
						size="sm"
						className={cn(
							`hover:bg-[${BOOKING_STATUS_COLORS["Completed"]}] gap-2`,
							BOOKING_STATUS_COLORS["Completed"]
						)}
					>
						<CheckCircle2 className="size-4" />
						Complete Booking
					</Button>
				</div>
			);
		}

		// Completed Status: No actions available
		if (status === "Completed") {
			return (
				<div className="flex flex-row gap-2">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<CheckCircle2 className="size-4 text-green-600" />
						<span>Booking completed</span>
					</div>
				</div>
			);
		}

		// Cancelled Status: No actions available
		if (status === "Cancelled") {
			return (
				<div className="flex flex-row gap-2">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<X className="size-4 text-destructive" />
						<span>Booking cancelled</span>
					</div>
				</div>
			);
		}

		return null;
	}, [status, isMutating]);

	return buttonControls;
};

export default ViewBookingForm;
