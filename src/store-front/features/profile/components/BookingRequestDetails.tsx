import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/core/components/base/card";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/core/components/base/badge";
import {
	Calendar,
	Clock,
	MapPin,
	User,
	FileText,
	CheckCircle,
	XCircle,
	AlertCircle,
} from "lucide-react";
import { Separator } from "@/core/components/base/separator";
import { cn } from "@/core/lib/utils";
import { BOOKING_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { BookingStatus } from "@/ami/shared/types/status.types";
import { Label } from "@/core/components/base/label";
import { formatDurationByMinutes } from "@/store-front/shared/helpers/formatDuration";
import {
	formatToNormalDate,
	formatToNormalTime,
} from "@/ami/shared/helpers/formatDate";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { useGetBookingRequestByIdQuery } from "../queries/getBookingRequestById.sf.query";
import { Button } from "@/core/components/base/button";

// Request Status Colors
const REQUEST_STATUS_COLORS = {
	Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
	Approved: "bg-green-100 text-green-800 border-green-300",
	Rejected: "bg-red-100 text-red-800 border-red-300",
};

const BookingRequestDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { data: request, isPending: isRequestFetching } =
		useGetBookingRequestByIdQuery(id!);

	const booking = request?.booking_id;

	const total = booking?.services.reduce(
		(sum: number, service: any) => sum + service.total_price,
		0
	);

	if (isRequestFetching && !request) {
		return <div>Loading...</div>;
	}

	const isReschedule = request?.request_type === "Reschedule";
	const isCancellation = request?.request_type === "Cancellation";

	// Get status icon
	const getStatusIcon = () => {
		switch (request?.status) {
			case "Approved":
				return <CheckCircle className="w-5 h-5 text-green-600" />;
			case "Rejected":
				return <XCircle className="w-5 h-5 text-red-600" />;
			default:
				return <AlertCircle className="w-5 h-5 text-yellow-600" />;
		}
	};

	return (
		<Card className="h-full w-full flex flex-col">
			<CardHeader className="pb-3 border-gray-300 border-b-[1px] drop-shadow-sm shadow-sm">
				<div className="flex items-start justify-between">
					<div>
						<div className="flex flex-row gap-2 items-center">
							<CardTitle className="text-3xl mr-2">
								{isReschedule ? "Reschedule" : "Cancellation"} Request
							</CardTitle>
						</div>
						<CardDescription className="text-lg">
							Request Ref:{" "}
							<span className="text-primary font-semibold">
								{request?.request_reference}
							</span>
						</CardDescription>
					</div>
					<div className="flex gap-2">
						<Badge
							className={cn(
								"px-3 py-1",
								REQUEST_STATUS_COLORS[
									request?.status as keyof typeof REQUEST_STATUS_COLORS
								]
							)}
						>
							<span className="text-base">{request?.status}</span>
						</Badge>
					</div>
				</div>
			</CardHeader>

			<CardContent className="overflow-auto px-8 space-y-4">
				{/* Request Status Timeline */}
				<div className="space-y-3">
					<Label className="font-semibold text-base text-slate-800 tracking-tighter">
						REQUEST STATUS:
					</Label>

					<div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 mt-1">{getStatusIcon()}</div>
							<div className="flex-1 space-y-3">
								<div>
									<Label className="font-semibold text-lg text-foreground">
										{request?.status === "Pending" && "Awaiting Review"}
										{request?.status === "Approved" &&
											`${
												isReschedule ? "Reschedule" : "Cancellation"
											} Approved`}
										{request?.status === "Rejected" &&
											`${
												isReschedule ? "Reschedule" : "Cancellation"
											} Rejected`}
									</Label>
									<p className="text-sm text-muted-foreground mt-1 font-light">
										{request?.status === "Pending" &&
											"Your request is currently under review by our team."}
										{request?.status === "Approved" &&
											`Your ${
												isReschedule ? "reschedule" : "cancellation"
											} request has been approved and processed.`}
										{request?.status === "Rejected" &&
											`Your ${
												isReschedule ? "reschedule" : "cancellation"
											} request has been rejected.`}
									</p>
								</div>

								<div className="grid grid-cols-2 gap-4 pt-2">
									<div className="space-y-1">
										<Label className="text-xs text-muted-foreground uppercase tracking-wider">
											Submitted On
										</Label>
										<p className="text-sm font-medium text-foreground">
											{formatToNormalDate(request?.created_at ?? "")}
										</p>
									</div>
									{request?.reviewed_at && (
										<div className="space-y-1">
											<Label className="text-xs text-muted-foreground uppercase tracking-wider">
												Reviewed On
											</Label>
											<p className="text-sm font-medium text-foreground">
												{formatToNormalDate(request?.reviewed_at ?? "")}
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				<Separator />

				{/* Request Details Section */}
				<div className="space-y-3">
					<Label className="font-semibold text-base text-slate-800 tracking-tighter">
						REQUEST DETAILS:
					</Label>

					<div className="bg-white border border-gray-300 rounded-lg p-4 space-y-4">
						<div className="flex items-start gap-3">
							<FileText className="w-5 h-5 text-primary mt-0.5" />
							<div className="flex-1">
								<Label className="font-medium text-sm text-slate-700">
									Request Type:
								</Label>
								<p className="text-base font-semibold text-primary mt-1">
									{request?.request_type}
								</p>
							</div>
						</div>

						{isReschedule && (
							<>
								<Separator />
								<div>
									<Label className="font-medium text-sm text-slate-700 mb-2 block">
										Reason for Reschedule:
									</Label>
									<div className="bg-secondary/5 border border-secondary/20 rounded p-3">
										<p className="text-sm text-foreground font-light leading-relaxed">
											{request?.reschedule_reason || "N/A"}
										</p>
									</div>
								</div>

								<Separator />

								<div>
									<Label className="font-medium text-sm text-slate-700 mb-3 block">
										Proposed New Schedule:
									</Label>
									<div className="space-y-3 bg-primary/5 border border-primary/20 rounded p-4">
										<div className="flex items-center gap-3">
											<Calendar className="w-5 h-5 text-primary" />
											<div>
												<Label className="text-xs text-muted-foreground uppercase tracking-wider">
													Date
												</Label>
												<p className="text-base font-semibold text-primary">
													{formatToNormalDate(request?.new_booking_date ?? "")}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<Clock className="w-5 h-5 text-primary" />
											<div>
												<Label className="text-xs text-muted-foreground uppercase tracking-wider">
													Time
												</Label>
												<p className="text-base font-semibold text-primary">
													{formatToNormalTime(request?.new_start_time ?? "")} -{" "}
													{formatToNormalTime(request?.new_end_time ?? "")}
												</p>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{isCancellation && (
							<>
								<Separator />
								<div>
									<Label className="font-medium text-sm text-slate-700 mb-2 block">
										Reason for Cancellation:
									</Label>
									<div className="bg-secondary/5 border border-secondary/20 rounded p-3">
										<p className="text-sm text-foreground font-light leading-relaxed">
											{request?.cancellation_reason || "N/A"}
										</p>
									</div>
								</div>
							</>
						)}
					</div>
				</div>

				{/* Admin Feedback Section */}
				{(request?.rejection_reason || request?.admin_notes) && (
					<>
						<Separator />
						<div className="space-y-3">
							<Label className="font-semibold text-base text-slate-800 tracking-tighter">
								ADMIN RESPONSE:
							</Label>

							<div className="space-y-3">
								{request?.rejection_reason && (
									<div className="bg-red-50 border border-red-200 rounded-lg p-4">
										<div className="flex items-start gap-3">
											<XCircle className="w-5 h-5 text-red-600 mt-0.5" />
											<div className="flex-1">
												<Label className="font-semibold text-sm text-red-800 mb-1 block">
													Rejection Reason:
												</Label>
												<p className="text-sm text-red-700 font-light leading-relaxed">
													{request.rejection_reason}
												</p>
											</div>
										</div>
									</div>
								)}

								{request?.admin_notes && (
									<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
										<div className="flex items-start gap-3">
											<FileText className="w-5 h-5 text-blue-600 mt-0.5" />
											<div className="flex-1">
												<Label className="font-semibold text-sm text-blue-800 mb-1 block">
													Admin Notes:
												</Label>
												<p className="text-sm text-blue-700 font-light leading-relaxed">
													{request.admin_notes}
												</p>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</>
				)}

				<Separator />

				{/* Related Booking Section */}
				<div className="space-y-3">
					<Label className="font-semibold text-base text-slate-800 tracking-tighter">
						RELATED BOOKING:
					</Label>

					<div className="bg-white border border-gray-300 rounded-lg p-4 space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Booking Reference
								</Label>
								<p className="text-lg font-semibold text-primary">
									{booking?.booking_reference}
								</p>
							</div>
							<Badge
								className={cn(
									"px-3 py-1",
									BOOKING_STATUS_COLORS[booking?.status as BookingStatus]
								)}
							>
								<span className="text-sm">{booking?.status}</span>
							</Badge>
						</div>

						<Separator />

						<div className="grid md:grid-cols-2 gap-4">
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<Calendar className="w-4 h-4 text-muted-foreground" />
									<div>
										<Label className="text-xs text-muted-foreground uppercase tracking-wider">
											Date
										</Label>
										<p className="text-sm font-medium text-foreground">
											{formatToNormalDate(booking?.booking_date ?? "")}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Clock className="w-4 h-4 text-muted-foreground" />
									<div>
										<Label className="text-xs text-muted-foreground uppercase tracking-wider">
											Time
										</Label>
										<p className="text-sm font-medium text-foreground">
											{formatToNormalTime(booking?.start_time ?? "")} -{" "}
											{formatToNormalTime(booking?.end_time ?? "")}
										</p>
									</div>
								</div>
							</div>

							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<MapPin className="w-4 h-4 text-muted-foreground" />
									<div>
										<Label className="text-xs text-muted-foreground uppercase tracking-wider">
											Location
										</Label>
										<p className="text-sm font-medium text-foreground">
											{booking?.location}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<User className="w-4 h-4 text-muted-foreground" />
									<div>
										<Label className="text-xs text-muted-foreground uppercase tracking-wider">
											Photographer
										</Label>
										<p className="text-sm font-medium text-foreground">
											{booking?.photographer_id.name}
										</p>
									</div>
								</div>
							</div>
						</div>

						<Separator />

						<div className="flex items-center justify-between">
							<div>
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Total Amount
								</Label>
								<p className="text-xl font-bold text-secondary-foreground">
									{formatToPeso(String(total))}
								</p>
							</div>
							<Button
								variant="outline"
								size="sm"
								onClick={() => navigate(`/profile/my-bookings/${booking?._id}`)}
							>
								View Full Booking Details
							</Button>
						</div>
					</div>
				</div>

				<Separator />

				{/* Customer Information */}
				<div className="space-y-3">
					<Label className="font-semibold text-base text-slate-800 tracking-tighter">
						CUSTOMER INFORMATION:
					</Label>

					<div className="bg-white border border-gray-300 rounded-lg p-4">
						<div className="grid md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Name
								</Label>
								<p className="text-sm font-medium text-foreground">
									{booking?.customer_id.first_name}{" "}
									{booking?.customer_id.last_name}
								</p>
							</div>
							<div className="space-y-2">
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Email
								</Label>
								<p className="text-sm font-medium text-foreground">
									{booking?.customer_id.email}
								</p>
							</div>
							<div className="space-y-2">
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Mobile Number
								</Label>
								<p className="text-sm font-medium text-foreground">
									{booking?.customer_id.mobile_number}
								</p>
							</div>
							<div className="space-y-2">
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Customer No.
								</Label>
								<p className="text-sm font-medium text-foreground">
									{booking?.customer_id.customer_no}
								</p>
							</div>
						</div>
					</div>
				</div>

				<Separator />

				{/* Services Summary */}
				<div className="space-y-3">
					<Label className="font-semibold text-base text-slate-800 tracking-tighter">
						SERVICES SUMMARY:
					</Label>

					<div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
						{booking?.services.map((service: any, idx: number) => (
							<div
								key={idx}
								className={cn(
									"p-4 flex items-center justify-between hover:bg-secondary/5 transition-colors",
									idx !== booking?.services.length - 1 &&
										"border-b border-gray-200"
								)}
							>
								<div className="flex-1">
									<p className="text-sm font-semibold text-foreground">
										{service.service_id.name}
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										{formatToPeso(String(service.price_per_unit))} ×{" "}
										{service.quantity}
									</p>
								</div>
								<div className="text-right">
									<p className="text-base font-bold text-secondary-foreground">
										{formatToPeso(String(service.total_price))}
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										{formatDurationByMinutes(service.duration_minutes)}
									</p>
								</div>
							</div>
						))}

						<div className="bg-secondary/10 p-4 flex items-center justify-between">
							<Label className="font-bold text-base text-slate-800 tracking-tight">
								TOTAL:
							</Label>
							<p className="text-xl font-extrabold text-secondary-foreground">
								{formatToPeso(String(total))}
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default BookingRequestDetails;
