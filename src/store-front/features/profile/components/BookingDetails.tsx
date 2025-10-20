import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/core/components/base/card";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMyBookingDetailsQuery } from "../queries/getMyBookingDetails.sf.query";
import { Badge } from "@/core/components/base/badge";
import { Calendar, Clock, MapPin, TriangleAlertIcon, User } from "lucide-react";
import { Separator } from "@/core/components/base/separator";
import { cn } from "@/core/lib/utils";
import {
	BOOKING_STATUS_COLORS,
	TRANSACTION_STATUS_COLORS,
} from "@/ami/shared/constants/status-colors.constants";
import {
	BookingStatus,
	TransactionStatus,
} from "@/ami/shared/types/status.types";
import { Label } from "@/core/components/base/label";
import { formatDurationByMinutes } from "@/store-front/shared/helpers/formatDuration";
import {
	formatToNormalDate,
	formatToNormalTime,
} from "@/ami/shared/helpers/formatDate";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/core/components/base/tooltip";
import { Button } from "@/core/components/base/button";
import CreateTransactionModal from "../../transactions/components/CreateTransactionModal";
import { useState } from "react";

const BookingDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [isCreateTransactionModalOpen, setIsCreateTransactionModalOpen] =
		useState(false);

	const { data: booking, isPending: isBookingFetching } =
		useGetMyBookingDetailsQuery(id!);

	const total = booking?.services.reduce(
		(sum, service) => sum + service.total_price,
		0
	);

	if (isBookingFetching && !booking) {
		return <div>Loading...</div>;
	}

	return (
		<Card className="h-full w-full flex flex-col">
			<CardHeader className="pb-3 border-gray-300 border-b-[1px] drop-shadow-sm shadow-sm">
				<div className="flex items-start justify-between">
					<div>
						<CardTitle className="text-3xl">Booking Details</CardTitle>
						<CardDescription className="text-lg">
							Ref:{" "}
							<span className="text-primary font-semibold">
								{booking?.booking_reference}
							</span>
						</CardDescription>
					</div>
					<Badge
						className={cn(
							"px-3 py-1",
							BOOKING_STATUS_COLORS[booking?.status as BookingStatus]
						)}
					>
						<span className="text-base">{booking?.status}</span>
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="overflow-auto px-8 space-y-4">
				{booking?.status === "Cancelled" ? (
					<>
						<div className="gap-2 flex flex-col">
							<Label className="font-semibold text-base text-slate-800 tracking-tighter">
								REASON FOR CANCELLATION:
							</Label>

							<Label className="font-light text-sm text-foregound">
								{booking?.cancelled_reason || "N/A"}
							</Label>
						</div>

						<Separator />
					</>
				) : null}

				<div className="grid md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label className="font-semibold text-base text-slate-800 tracking-tighter">
							CUSTOMER DETAILS:
						</Label>
						<div className="flex flex-col space-y-1">
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								Name: {booking?.customer_id.first_name}{" "}
								{booking?.customer_id.last_name}
							</Label>
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								Email: {booking?.customer_id.email}
							</Label>
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								Mobile Number: {booking?.customer_id.mobile_number}
							</Label>
						</div>
					</div>
					<div className="space-y-2">
						<Label className="font-semibold text-base text-slate-800 tracking-tighter">
							PHOTOGRAPHER DETAILS:
						</Label>
						<div className="flex flex-col space-y-1">
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								Name: {booking?.photographer_id.name}{" "}
							</Label>
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								Email: {booking?.photographer_id.email}
							</Label>
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								Mobile Number: {booking?.photographer_id.mobile_number}
							</Label>
						</div>
					</div>
				</div>

				<Separator />

				<div className="space-y-3">
					<Label className="font-semibold text-base text-slate-800 tracking-tighter">
						BOOKING INFORMATION:
					</Label>

					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<User className="w-4 h-4 text-primary" />

							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								<span className="font-medium">Package:</span>{" "}
								{booking?.package_id?.name || "N/A"}
							</Label>
						</div>
						<div className="flex items-center gap-3">
							<Calendar className="w-4 h-4 text-primary" />
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								<span className="font-medium">Date:</span>{" "}
								{formatToNormalDate(booking?.booking_date ?? "")}
							</Label>
						</div>
						<div className="flex items-center gap-3">
							<Clock className="w-4 h-4 text-primary" />
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								<span className="font-medium">Time:</span>{" "}
								{formatToNormalTime(booking?.start_time ?? "")} -{" "}
								{formatToNormalTime(booking?.end_time ?? "")}
							</Label>
						</div>
						<div className="flex items-center gap-3">
							<Clock className="w-4 h-4 text-primary" />
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								<span className="font-medium">Duration:</span>{" "}
								{formatDurationByMinutes(
									booking?.session_duration_minutes ?? 120
								)}
							</Label>
						</div>
						<div className="flex gap-3 items-start">
							<MapPin className="w-4 h-4 text-primary mt-[1px]" />
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground max-w-[70%]"
							>
								<span className="font-medium">Location: </span>
								{booking?.location}
							</Label>
						</div>
					</div>
				</div>

				<Separator />

				<div className="space-y-3">
					<Label className="font-semibold text-base text-slate-800 tracking-tighter">
						SERVICES INCLUDED:
					</Label>

					<div className="border border-gray-300 rounded overflow-hidden">
						<div className="grid grid-cols-12 bg-secondary/30 border-b border-gray-300">
							<div className="col-span-1 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700">
								#
							</div>
							<div className="col-span-5 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700">
								Service Name
							</div>
							<div className="col-span-2 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 text-right">
								Unit Price
							</div>
							<div className="col-span-2 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 text-right">
								Quantity
							</div>
							<div className="col-span-2 px-4 py-2 text-sm font-semibold text-gray-700 text-right">
								Total
							</div>
						</div>

						{booking?.services.map((service, idx) => (
							<div
								key={idx}
								className="grid grid-cols-12 border-b border-gray-300 bg-white hover:bg-blue-50 transition-colors"
							>
								<div className="col-span-1 px-4 py-3 border-r border-gray-300 text-sm font-light text-gray-600">
									{idx + 1}
								</div>
								<div className="col-span-5 px-4 py-3 border-r border-gray-300 text-sm font-light text-gray-800">
									{service.service_id.name}
								</div>
								<div className="col-span-2 px-4 py-3 border-r border-gray-300 text-sm font-light text-gray-800 text-right">
									{formatToPeso(String(service.price_per_unit))}
								</div>
								<div className="col-span-2 px-4 py-3 border-r border-gray-300 text-sm font-light text-gray-800 text-right">
									{service.quantity}
								</div>
								<div className="col-span-2 px-4 py-3 text-sm text-gray-800 text-right font-light">
									{formatToPeso(String(service.total_price))}
								</div>
							</div>
						))}

						<div className="grid grid-cols-12 bg-secondary/30 border-t border-gray-300">
							<div className="col-span-10 px-4 py-3 border-r border-gray-300 text-sm font-bold text-gray-800 text-left tracking-tight">
								TOTAL:
							</div>
							<div className="col-span-2 px-4 py-3 text-sm font-extrabold text-secondary-foreground text-right">
								{formatToPeso(String(total))}{" "}
							</div>
						</div>
					</div>
				</div>

				<Separator />

				<CardFooter className="mx-0 px-0">
					{booking?.payment_status.transactions.length === 0 ? (
						<div>No transactions found.</div>
					) : (
						<div className="w-full space-y-3">
							<div className="font-semibold text-base text-slate-800 tracking-tighter">
								TRANSACTIONS:
							</div>

							{booking?.payment_status.transactions.length === 0 ? (
								<div className="text-gray-500 text-sm py-4">
									No transactions found.
								</div>
							) : (
								<div className="border border-gray-300 rounded overflow-hidden">
									{/* Header Row */}
									<div className="grid grid-cols-12 bg-secondary/30 border-b border-gray-300">
										<div className="col-span-3 px-4 py-3 border-r border-gray-300 text-sm font-medium text-gray-700">
											Reference
										</div>
										<div className="col-span-3 px-4 py-3 border-r border-gray-300 text-sm font-medium text-gray-700 text-right">
											Date
										</div>
										<div className="col-span-3 px-4 py-3 border-r border-gray-300 text-sm font-medium text-gray-700 text-right">
											Amount
										</div>
										<div className="col-span-3 px-4 py-3 text-sm font-medium text-gray-700 text-center">
											Status
										</div>
									</div>

									{booking?.payment_status.transactions.map(
										(transaction, idx) => (
											<div
												key={transaction._id}
												className={`grid grid-cols-12 bg-white items-center ${
													idx !==
													booking?.payment_status.transactions.length - 1
														? "border-b border-gray-300"
														: ""
												}`}
											>
												<div className="col-span-3 px-4 py-3 border-r border-gray-300">
													<Tooltip delayDuration={200}>
														<TooltipTrigger asChild className="cursor-pointer">
															<Button
																variant="link"
																size="link"
																className="text-sm"
																onClick={() => {
																	navigate(
																		`/profile/my-transactions/transaction/${transaction._id}/details`
																	);
																}}
															>
																{transaction?.transaction_reference}
															</Button>
														</TooltipTrigger>
														<TooltipContent
															className="text-white bg-admin-secondary text-3xs"
															side="right"
															sideOffset={5}
															align="end"
															alignOffset={10}
														>
															<p>View Transaction?</p>
														</TooltipContent>
													</Tooltip>
												</div>
												<div className="col-span-3 px-4 py-3 border-r border-gray-300 text-sm text-gray-800 text-right font-light">
													{formatToNormalDate(transaction?.transaction_date)}
												</div>
												<div className="col-span-3 px-4 py-3 border-r border-gray-300 text-sm text-gray-800 text-right font-light">
													{formatToPeso(String(transaction?.amount))}
												</div>
												<div className="col-span-3 px-4 py-3 text-sm flex justify-center">
													<Badge
														className={cn(
															`px-2 py-1 rounded text-xs font-semibold`,
															TRANSACTION_STATUS_COLORS[
																transaction?.status as TransactionStatus
															]
														)}
													>
														{transaction?.status.charAt(0).toUpperCase() +
															transaction?.status.slice(1)}
													</Badge>
												</div>
											</div>
										)
									)}
								</div>
							)}
						</div>
					)}
				</CardFooter>

				<Separator />

				<div className="space-y-3 w-full">
					<div className="font-semibold text-base text-slate-800 tracking-tighter">
						PAYMENT SUMMARY:
					</div>

					{/* Receipt Container */}
					<div className="bg-white border-[1px] border-border rounded-lg p-6 space-y-4 font-mono text-sm">
						{/* Decorative Line */}
						<div className="border-t-2 border-dashed border-gray-400"></div>

						{/* Total Amount Row */}
						<div className="flex justify-between items-start">
							<span className="text-foreground">Total Amount</span>
							<span className="font-medium">
								₱{booking?.total_amount.toLocaleString()}
							</span>
						</div>

						{/* Amount Paid Row */}
						<div className="flex justify-between items-start">
							<span className="text-foreground">Amount Paid</span>
							<span className="font-medium text-green-600">
								{formatToPeso(String(booking?.payment_status.amount_paid))}
							</span>
						</div>

						<div className="border-t-2 border-dashed border-gray-400"></div>

						{!booking?.payment_status.remaining_balance ? (
							<>
								<div className="flex justify-between items-start bg-secondary/30 p-3 rounded border-[1px] border-secondary/40">
									<span className="font-bold text-gray-800">
										REMAINING BALANCE
									</span>
									<span className="font-bold text-lg text-secondary-foreground">
										{formatToPeso(
											String(booking?.payment_status.remaining_balance)
										)}
									</span>
								</div>
								<div className="border-t-2 border-dashed border-gray-400"></div>
							</>
						) : null}

						<div className="text-center text-xs text-secondary-foreground mt-4">
							Thanks for your trust — we hope to serve you again soon!
						</div>
					</div>
				</div>

				{booking?.payment_status.remaining_balance &&
				booking?.payment_status.remaining_balance > 0 ? (
					<div className="w-full">
						{/* Modern Alert with Gradient */}
						<div className="relative overflow-hidden bg-primary/20 border border-primary rounded-lg p-4 shadow-sm">
							{/* Decorative left accent bar */}
							<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>

							<div className="flex gap-4 ml-2">
								{/* Icon with animation */}
								<div className="flex-shrink-0">
									<div className="w-10 h-10 rounded-full bg-primary/40 border border-primary  flex items-center justify-center">
										<TriangleAlertIcon className="w-5 h-5 text-primary" />
									</div>
								</div>

								{/* Content */}
								<div className="flex-1 space-y-1">
									<div className="flex items-center gap-2">
										<p className="font-semibold text-primary text-base">
											{booking.status === "Pending"
												? "Booking Unconfirmed"
												: "Payment Pending"}
										</p>
										<span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/70 text-admin-primary-foreground text-xs font-medium rounded-full animate-pulse duration-3000 transition-all">
											<Clock className="w-3 h-3" />
											{booking.status === "Pending"
												? "Wait for Confirmation"
												: "Action Required"}
										</span>
									</div>

									{booking.status === "Pending" ? (
										<p className="text-primary/80 text-sm font-light">
											Please wait while we review your booking details.
										</p>
									) : (
										<p className="text-primary/80 text-sm font-light">
											Your booking requires full payment of{" "}
											<span className="font-medium text-primary">
												{formatToPeso(
													String(booking?.payment_status.remaining_balance)
												)}
											</span>{" "}
											to be confirmed. Please complete payment to secure your
											booking date.
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Optional CTA Button */}
						<div className="mt-3">
							<CreateTransactionModal
								disabled={booking.status === "Pending"}
								bookingId={booking._id}
								open={isCreateTransactionModalOpen}
								setIsModalOpen={setIsCreateTransactionModalOpen}
							/>
						</div>
					</div>
				) : null}
			</CardContent>
		</Card>
	);
};

export default BookingDetails;
