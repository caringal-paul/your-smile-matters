// Components
import { Label } from "@/core/components/base/label";
import { useParams } from "react-router-dom";
import FormCard from "@/ami/shared/components/card/FormCard";
import {
	formatToNormalDate,
	formatToNormalTime,
} from "@/ami/shared/helpers/formatDate";

import { Check, X, CheckCircle2 } from "lucide-react";

import { Badge } from "@/core/components/base/badge";
import { useGetBookingByIdQuery } from "../queries/getBookingById.ami.query";
import { formatDurationByMinutes } from "@/store-front/shared/helpers/formatDuration";
import { cn } from "@/core/lib/utils";
import {
	BOOKING_STATUS_COLORS,
	TRANSACTION_STATUS_COLORS,
} from "@/ami/shared/constants/status-colors.constants";
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
import { useConfirmBookingMutation } from "../queries/confirmBooking.ami.mutation";
import { useCancelBookingMutation } from "../queries/cancelBooking.ami.mutation";
import { useRescheduleBookingMutation } from "../queries/rescheduleBooking.ami.mutation";
import { useStartBookingMutation } from "../queries/startBooking.ami.mutation";
import { toast } from "sonner";
import { useCompleteBookingMutation } from "../queries/completeBooking.ami.mutation";
import { Separator } from "@/core/components/base/separator";
import { BookingActionModal } from "./BookingModalForms";
import { useForm } from "react-hook-form";
import {
	RescheduleBookingSchema,
	rescheduleSchema,
} from "@/core/schemas/reschedule.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingRescheduleFormModal } from "./BookingRescheduleFormModal";
import { GetByIdBookingResponseAmi } from "../utils/types/booking-response.ami.types";
import {
	CancelBookingSchema,
	cancelSchema,
} from "@/core/schemas/cancel.schema";
import { BookingCancelFormModal } from "./BookingCancelFormModal";

const ViewBookingForm = () => {
	const { id } = useParams();

	const { data: booking, isLoading } = useGetBookingByIdQuery(id!);

	console.log(booking?.payment_status);

	if (isLoading) {
		return <>Loading</>;
	}

	if (!booking) {
		return <>Booking Not Found</>;
	}

	console.log(booking);

	return (
		<div className="pb-8 grid grid-cols-1 xl:grid-cols-3 gap-4">
			<FormCard className="col-span-1 xl:col-span-3 w-full h-full">
				<FormCard.Title className="flex flex-row items-center justify-between gap-2">
					<span className="flex flex-row gap-2">
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
							{booking.status === "Ongoing" &&
							!booking.payment_status.is_payment_complete
								? "Waiting for payment"
								: booking.status}
						</Badge>
					</span>

					<BookingFormButtonControls
						status={booking.status}
						booking={booking as GetByIdBookingResponseAmi}
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
								{formatDurationByMinutes(booking?.session_duration_minutes)})
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
								<FormCard.Label>
									Original date before reschedule:
								</FormCard.Label>
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
						<FormCard.Label>Customer No:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{booking.customer_id?.customer_no}
						</Label>
					</FormCard.Field>
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
				</div>
			</FormCard>

			{/* <FormCard className="col-span-1 w-full h-full ">
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
						<Label
							className={`font-medium text-xs ${
								booking.payment_status?.remaining_balance === 0
									? "text-green-500"
									: "text-orange-500"
							}`}
						>
							{booking.payment_status?.remaining_balance === 0 ? (
								"Paid in full"
							) : (
								<>
									{" "}
									{formatToPeso(
										String(booking.payment_status?.remaining_balance)
									) || "-"}
								</>
							)}
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
			</FormCard> */}

			<FormCard className="col-span-1 w-full h-full">
				<FormCard.Title className="flex flex-row items-center gap-2">
					Payment Details
				</FormCard.Title>

				<div className="flex flex-col w-full gap-4">
					{/* Total / Final Price */}
					<FormCard.Field>
						<FormCard.Label>Total Price:</FormCard.Label>
						<Label className="font-normal text-2xs flex flex-row items-center gap-2">
							{booking.discount_amount && booking.promo_id?.promo_code ? (
								<span className="text-xs font-normal text-foreground">
									{formatToPeso(String(booking.total_amount))} -{" "}
									{formatToPeso(String(booking.discount_amount))} =
								</span>
							) : null}
							<span className="text-primary font-bold text-sm">
								{formatToPeso(String(booking.payment_status?.total_price || 0))}
							</span>
						</Label>
					</FormCard.Field>

					{/* Refund section if applicable */}
					{booking.payment_status?.has_refund && (
						<>
							<FormCard.Field>
								<FormCard.Label>Refunded Amount:</FormCard.Label>
								<Label className="font-medium text-xs text-red-500">
									-{" "}
									{formatToPeso(
										String(booking.payment_status.total_refunded || 0)
									)}
								</Label>
							</FormCard.Field>

							<FormCard.Field>
								<FormCard.Label>Net Amount Received:</FormCard.Label>
								<Label className="font-bold text-sm text-green-600">
									{formatToPeso(
										String(booking.payment_status.amount_paid || 0)
									)}
								</Label>
							</FormCard.Field>
						</>
					)}

					{/* Remaining balance (only if not finished) */}
					{!booking.payment_status.isBookingFinalized && (
						<FormCard.Field>
							<FormCard.Label>Remaining Balance:</FormCard.Label>
							<Label
								className={`font-medium text-xs ${
									booking.payment_status?.remaining_balance === 0
										? "text-green-500"
										: "text-orange-500"
								}`}
							>
								{booking.payment_status?.remaining_balance === 0
									? "Paid in full"
									: formatToPeso(
											String(booking.payment_status?.remaining_balance || 0)
									  )}
							</Label>
						</FormCard.Field>
					)}

					{/* Payment status summary */}
					{booking.payment_status.isBookingFinalized && (
						<FormCard.Field>
							<FormCard.Label>Payment Status:</FormCard.Label>
							<Label
								className={`font-medium text-xs ${
									booking.payment_status?.has_refund
										? "text-red-600"
										: booking.payment_status?.is_payment_complete
										? "text-green-600"
										: booking.payment_status?.is_partially_paid
										? "text-orange-600"
										: "text-muted-foreground"
								}`}
							>
								{(() => {
									const ps = booking.payment_status;

									if (!ps) return "No payment info";

									switch (ps.payment_scenario) {
										case "no_payment":
											return "No Payment Received";
										case "partially_paid_no_refund":
											return "Partially Paid";
										case "fully_paid_no_refund":
											return "Fully Paid";
										case "fully_paid_with_refund":
											return ps.amount_paid === 0
												? "Fully Refunded"
												: `Refunded (${formatToPeso(
														String(ps.total_refunded)
												  )} refunded, ${formatToPeso(
														String(ps.amount_paid)
												  )} retained)`;
										case "refund_only":
											return "Refund Issued";
										default:
											// Fallback if backend didn't assign a scenario
											if (ps.has_refund && ps.amount_paid === 0)
												return "Fully Refunded";
											if (ps.has_refund && ps.amount_paid > 0)
												return "Refunded";
											if (ps.is_payment_complete) return "Fully Paid";
											if (ps.is_partially_paid) return "Partially Paid";
											return "No Payment Received";
									}
								})()}
							</Label>
						</FormCard.Field>
					)}

					{/* Promo code */}
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

			{/* TRANSACTIONS */}
			{booking.payment_status?.transactions &&
				booking.payment_status.transactions.length > 0 && (
					<FormCard className="col-span-1 xl:col-span-3 w-full h-full">
						<FormCard.Title className="flex flex-row items-center gap-2">
							Transaction History
							<Badge className="text-2xs">
								{booking.payment_status.transactions.length} transaction
								{booking.payment_status.transactions.length !== 1 ? "s" : ""}
							</Badge>
						</FormCard.Title>

						<ItemGroup className="flex flex-col w-full gap-4 p-4">
							{booking.payment_status.transactions
								.filter((t) => t.transaction_type !== "Refund")
								.map((transaction) => {
									const hasBeenRefunded = transaction.status === "Refunded";
									const refundTransaction = hasBeenRefunded
										? booking.payment_status.transactions.find(
												(t) => t.original_transaction_id === transaction._id
										  )
										: null;

									return (
										<div key={transaction._id} className="space-y-2">
											<Item role="listitem" variant="outline">
												<ItemContent className="gap-4">
													<div className="flex-1 space-y-2">
														<div className="flex items-center gap-2 flex-wrap">
															<Label className="text-xs 2xl:text-sm font-semibold">
																{transaction.transaction_reference}
															</Label>
															<Badge
																className={cn(
																	"text-2xs",
																	TRANSACTION_STATUS_COLORS[transaction.status]
																)}
															>
																{transaction.status}
															</Badge>
														</div>

														<div className="text-2xs 2xl:text-xs space-y-1 text-muted-foreground">
															<div>
																<span className="font-medium">Type:</span>{" "}
																{transaction.transaction_type}
															</div>
															<div>
																<span className="font-medium">Method:</span>{" "}
																{transaction.payment_method}
															</div>
															<div>
																<span className="font-medium">Date:</span>{" "}
																{formatToNormalDate(
																	transaction.transaction_date
																)}{" "}
																@{" "}
																{formatToNormalTime(
																	transaction.transaction_date
																)}
															</div>

															{transaction.notes && (
																<div>
																	<span className="font-medium">Notes:</span>{" "}
																	{transaction.notes}
																</div>
															)}

															{transaction.refund_reason && (
																<div>
																	<span className="font-medium text-red-600">
																		Refund Reason:
																	</span>{" "}
																	{transaction.refund_reason}
																</div>
															)}
														</div>
													</div>

													<ItemContent className="flex-none text-right">
														<ItemDescription
															className={cn(
																"font-bold text-sm 2xl:text-base",
																transaction.transaction_type === "Refund"
																	? "text-red-600"
																	: hasBeenRefunded
																	? "text-red-600 line-through"
																	: "text-green-600"
															)}
														>
															{transaction.transaction_type === "Refund"
																? "-"
																: "+"}
															{formatToPeso(String(transaction.amount))}
														</ItemDescription>

														{transaction.processed_at && (
															<ItemDescription className="text-2xs text-muted-foreground">
																Processed:{" "}
																{formatToNormalDate(transaction.processed_at)}
															</ItemDescription>
														)}
													</ItemContent>
												</ItemContent>

												{/* Linked refund transaction (indented) */}
												{hasBeenRefunded && refundTransaction && (
													<div className="ml-8 pl-4 border-l-2 border-red-400 w-1/2">
														<Item
															role="listitem"
															variant="outline"
															className="bg-red-50/50"
														>
															<ItemContent className="gap-4">
																<div className="flex-1 space-y-2">
																	<div className="flex items-center gap-2 flex-wrap">
																		<Label className="text-xs 2xl:text-sm font-semibold text-red-700">
																			{refundTransaction.transaction_reference}
																		</Label>
																		<Badge className="text-2xs bg-red-100 text-red-700">
																			{refundTransaction.status}
																		</Badge>
																	</div>

																	<div className="text-2xs 2xl:text-xs space-y-1 text-muted-foreground">
																		<div>
																			<span className="font-medium">Type:</span>{" "}
																			Refund
																		</div>
																		<div>
																			<span className="font-medium">
																				Method:
																			</span>{" "}
																			{refundTransaction.payment_method}
																		</div>
																		<div>
																			<span className="font-medium">Date:</span>{" "}
																			{formatToNormalDate(
																				refundTransaction.transaction_date
																			)}{" "}
																			@{" "}
																			{formatToNormalTime(
																				refundTransaction.transaction_date
																			)}
																		</div>

																		{refundTransaction.refund_reason && (
																			<div>
																				<span className="font-medium text-red-600">
																					Refund Reason:
																				</span>{" "}
																				{refundTransaction.refund_reason}
																			</div>
																		)}
																	</div>
																</div>

																<ItemContent className="flex-none text-right">
																	<ItemDescription className="font-bold text-sm 2xl:text-base text-red-600">
																		-
																		{formatToPeso(
																			String(refundTransaction.amount)
																		)}
																	</ItemDescription>

																	{refundTransaction.processed_at && (
																		<ItemDescription className="text-2xs text-muted-foreground">
																			Processed:{" "}
																			{formatToNormalDate(
																				refundTransaction.processed_at
																			)}
																		</ItemDescription>
																	)}
																</ItemContent>
															</ItemContent>
														</Item>
													</div>
												)}
											</Item>
										</div>
									);
								})}
						</ItemGroup>
					</FormCard>
				)}

			<FormCard className="col-span-1 xl:col-span-3 w-full h-full">
				<FormCard.Title>Service Details</FormCard.Title>

				{booking.package_id && booking.package_id._id ? (
					<div className="space-y-4">
						<Item variant={"outline"} className="mx-4">
							<ItemContent>
								<ItemContent>
									<ItemTitle className="line-clamp-1">
										<span className="text-muted-foreground text-lg">
											{booking.package_id.name}
										</span>
									</ItemTitle>
									<ItemDescription>
										{booking.package_id.description}
									</ItemDescription>
								</ItemContent>
								<ItemContent className="flex-none ">
									<ItemDescription>
										Package price:{" "}
										{booking.package_id.package_price
											? booking.package_id.package_price
											: "No package price set. Use services price instead."}
									</ItemDescription>
								</ItemContent>
							</ItemContent>
						</Item>

						<Separator />
					</div>
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
	booking: GetByIdBookingResponseAmi;
};

const BookingFormButtonControls = ({
	status,
	booking,
}: BookingFormButtonControlsProps) => {
	const params = useParams();
	const bookingId = booking._id || params.id;

	// Track which modal is open
	const [openModal, setOpenModal] = useState<string | null>(null);

	const { mutateAsync: confirmMutation, isPending: isConfirming } =
		useConfirmBookingMutation();
	const { mutateAsync: rescheduleMutation, isPending: isRescheduling } =
		useRescheduleBookingMutation();
	const { mutateAsync: cancelMutation, isPending: isCancelling } =
		useCancelBookingMutation();
	const { mutateAsync: startMutation, isPending: isStarting } =
		useStartBookingMutation();
	const { mutateAsync: completeMutation, isPending: isCompleting } =
		useCompleteBookingMutation();

	const [isRescheduleFormOpen, setIsRescheduleFormOpen] = useState(false);
	const [isCancelFormOpen, setIsCancelFormOpen] = useState(false);

	const rescheduleForm = useForm<RescheduleBookingSchema>({
		resolver: zodResolver(rescheduleSchema),
		mode: "onChange",
		defaultValues: {
			new_booking_date: undefined,
			dummy_time: "",
			new_start_time: "",
			new_end_time: "",
			photographer_id: "",
		},
	});

	const cancelForm = useForm<CancelBookingSchema>({
		resolver: zodResolver(cancelSchema),
		mode: "onChange",
		defaultValues: {
			cancelled_reason: "",
		},
	});

	const handleConfirmRescheduleForm = () => {
		setIsRescheduleFormOpen(false);
		setOpenModal("Reschedule");
	};

	const handleConfirmCancelForm = () => {
		setIsCancelFormOpen(false);
		setOpenModal("Cancel");
	};

	// === Handlers ===
	const handleConfirm = async () => {
		await confirmMutation(String(bookingId));
		setOpenModal(null);
	};

	const handleCancel = () => {
		cancelMutation({
			id: String(bookingId),
			cancelled_reason: cancelForm.getValues("cancelled_reason")!,
		});
		setOpenModal(null);
	};

	const handleStart = () => {
		startMutation(String(bookingId));
		setOpenModal(null);
	};

	const handleReschedule = () => {
		const new_booking_date = rescheduleForm.getValues("new_booking_date");
		const new_start_time = rescheduleForm.getValues("new_start_time");
		const new_end_time = rescheduleForm.getValues("new_end_time");
		const new_photographer_id = rescheduleForm.getValues("photographer_id");

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
				new_photographer_id,
			},
		});

		setOpenModal(null);
	};

	const handleComplete = async () => {
		await completeMutation(String(bookingId));
		setOpenModal(null);
	};

	// === Memoized UI ===
	const buttonControls = useMemo(() => {
		const renderButtonGroup = (...modals: React.ReactNode[]) => (
			<div className="flex flex-row gap-2">{modals}</div>
		);

		switch (status) {
			case "Pending":
				return renderButtonGroup(
					<BookingActionModal
						actionType="Confirm"
						isLoading={isConfirming}
						onAction={handleConfirm}
						open={openModal === "Confirm"}
						onOpenChange={(open) => setOpenModal(open ? "Confirm" : null)}
					/>,
					<BookingActionModal
						actionType="Reschedule"
						isLoading={isRescheduling}
						onAction={handleReschedule}
						open={openModal === "Reschedule"}
						onOpenChange={() => {
							setIsRescheduleFormOpen(true);
							setOpenModal(null);
						}}
					/>,
					<BookingActionModal
						actionType="Cancel"
						isLoading={isCancelling}
						onAction={handleCancel}
						disabled={
							booking.status === "Ongoing" &&
							!booking.payment_status.is_payment_complete
						}
						open={openModal === "Cancel"}
						onOpenChange={() => {
							setIsCancelFormOpen(true);
							setOpenModal(null);
						}}
					/>
				);

			case "Confirmed":
			case "Rescheduled":
				return renderButtonGroup(
					<BookingActionModal
						actionType="Start"
						isLoading={isStarting}
						onAction={handleStart}
						open={openModal === "Start"}
						onOpenChange={(open) => setOpenModal(open ? "Start" : null)}
					/>,
					<BookingActionModal
						actionType="Reschedule"
						isLoading={isRescheduling}
						onAction={handleReschedule}
						open={openModal === "Reschedule"}
						onOpenChange={() => {
							setIsRescheduleFormOpen(true);
							setOpenModal(null);
						}}
					/>,
					<BookingActionModal
						actionType="Cancel"
						isLoading={isCancelling}
						onAction={handleCancel}
						disabled={
							booking.status === "Ongoing" &&
							!booking.payment_status.is_payment_complete
						}
						open={openModal === "Cancel"}
						onOpenChange={() => {
							setIsCancelFormOpen(true);
							setOpenModal(null);
						}}
					/>
				);

			case "Ongoing":
				return renderButtonGroup(
					<BookingActionModal
						actionType="Complete"
						isLoading={isCompleting}
						onAction={handleComplete}
						open={openModal === "Complete"}
						onOpenChange={(open) => setOpenModal(open ? "Complete" : null)}
					/>
				);

			case "Completed":
				return (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<CheckCircle2 className="size-4 text-green-600" />
						<span>Booking completed</span>
					</div>
				);

			case "Cancelled":
				return (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<X className="size-4 text-destructive" />
						<span>Booking cancelled</span>
					</div>
				);

			default:
				return null;
		}
	}, [status, openModal]);

	return (
		<>
			{buttonControls}

			<BookingRescheduleFormModal
				open={isRescheduleFormOpen}
				onOpenChange={setIsRescheduleFormOpen}
				onSubmit={handleConfirmRescheduleForm}
				form={rescheduleForm}
				selectedBooking={booking}
			/>
			<BookingCancelFormModal
				open={isCancelFormOpen}
				onOpenChange={setIsCancelFormOpen}
				onSubmit={handleConfirmCancelForm}
				form={cancelForm}
			/>
		</>
	);
};

export default ViewBookingForm;
