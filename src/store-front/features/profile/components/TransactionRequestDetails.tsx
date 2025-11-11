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
	DollarSign,
	FileText,
	CheckCircle,
	XCircle,
	AlertCircle,
	CreditCard,
	Calendar,
	Receipt,
	ArrowLeftRight,
} from "lucide-react";
import { Separator } from "@/core/components/base/separator";
import { cn } from "@/core/lib/utils";
import { TRANSACTION_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { TransactionStatus } from "@/ami/shared/types/status.types";
import { Label } from "@/core/components/base/label";
import { formatToNormalDate } from "@/ami/shared/helpers/formatDate";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { Button } from "@/core/components/base/button";
import { useGetTransactionRequestByIdQuery } from "../queries/getTransactionRequestById.sf.query";

// Request Status Colors
const REQUEST_STATUS_COLORS = {
	Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
	Approved: "bg-green-100 text-green-800 border-green-300",
	Rejected: "bg-red-100 text-red-800 border-red-300",
};

const TransactionRequestDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { data: request, isPending: isRequestFetching } =
		useGetTransactionRequestByIdQuery(id!);

	const transaction = request?.transaction_id;
	const booking = request?.booking_id;

	if (isRequestFetching && !request) {
		return <div>Loading...</div>;
	}

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
							<CardTitle className="text-3xl mr-2">Refund Request</CardTitle>
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
				{/* Request Status Section */}
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
										{request?.status === "Approved" && "Refund Approved"}
										{request?.status === "Rejected" && "Refund Rejected"}
									</Label>
									<p className="text-sm text-muted-foreground mt-1 font-light">
										{request?.status === "Pending" &&
											"Your refund request is currently under review by our team."}
										{request?.status === "Approved" &&
											"Your refund request has been approved and is being processed."}
										{request?.status === "Rejected" &&
											"Your refund request has been rejected."}
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

				{/* Refund Amount Section */}
				<div className="space-y-3">
					<Label className="font-semibold text-base text-slate-800 tracking-tighter">
						REFUND DETAILS:
					</Label>

					<div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/30 rounded-lg p-6">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
									<DollarSign className="w-6 h-6 text-primary" />
								</div>
								<div>
									<Label className="text-sm text-muted-foreground uppercase tracking-wider">
										Refund Amount
									</Label>
									<p className="text-3xl font-bold text-primary mt-1">
										{formatToPeso(String(request?.refund_amount))}
									</p>
								</div>
							</div>
							<div className="text-right">
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Request Type
								</Label>
								<p className="text-base font-semibold text-foreground mt-1">
									{request?.request_type}
								</p>
							</div>
						</div>

						<Separator className="my-4 bg-primary/20" />

						<div>
							<Label className="font-medium text-sm text-slate-700 mb-2 block">
								Reason for Refund:
							</Label>
							<div className="bg-white/60 border border-primary/20 rounded p-3">
								<p className="text-sm text-foreground font-light leading-relaxed">
									{request?.refund_reason || "N/A"}
								</p>
							</div>
						</div>
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

				{/* Original Transaction Section */}
				<div className="space-y-3">
					<Label className="font-semibold text-base text-slate-800 tracking-tighter">
						ORIGINAL TRANSACTION:
					</Label>

					<div className="bg-white border border-gray-300 rounded-lg p-4 space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Transaction Reference
								</Label>
								<p className="text-lg font-semibold text-primary">
									{transaction?.transaction_reference}
								</p>
							</div>
							<Badge
								className={cn(
									"px-3 py-1",
									TRANSACTION_STATUS_COLORS[
										transaction?.status as TransactionStatus
									]
								)}
							>
								<span className="text-sm">{transaction?.status}</span>
							</Badge>
						</div>

						<Separator />

						<div className="grid md:grid-cols-2 gap-4">
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<DollarSign className="w-4 h-4 text-muted-foreground" />
									<div>
										<Label className="text-xs text-muted-foreground uppercase tracking-wider">
											Amount Paid
										</Label>
										<p className="text-base font-bold text-foreground">
											{formatToPeso(String(transaction?.amount))}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Calendar className="w-4 h-4 text-muted-foreground" />
									<div>
										<Label className="text-xs text-muted-foreground uppercase tracking-wider">
											Transaction Date
										</Label>
										<p className="text-sm font-medium text-foreground">
											{formatToNormalDate(transaction?.transaction_date ?? "")}
										</p>
									</div>
								</div>
							</div>

							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<CreditCard className="w-4 h-4 text-muted-foreground" />
									<div>
										<Label className="text-xs text-muted-foreground uppercase tracking-wider">
											Payment Method
										</Label>
										<p className="text-sm font-medium text-foreground">
											{transaction?.payment_method}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
									<div>
										<Label className="text-xs text-muted-foreground uppercase tracking-wider">
											Transaction Type
										</Label>
										<p className="text-sm font-medium text-foreground">
											{transaction?.transaction_type}
										</p>
									</div>
								</div>
							</div>
						</div>

						<Separator />

						<div className="flex items-center justify-between">
							<div>
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Processed On
								</Label>
								<p className="text-sm font-medium text-foreground">
									{transaction?.processed_at
										? formatToNormalDate(transaction.processed_at)
										: "N/A"}
								</p>
							</div>
							<Button
								variant="outline"
								size="sm"
								onClick={() =>
									navigate(
										`/profile/my-transactions/transaction/${transaction?._id}/details`
									)
								}
							>
								View Transaction Details
							</Button>
						</div>
					</div>
				</div>

				<Separator />

				{/* Related Booking Section */}
				<div className="space-y-3">
					<Label className="font-semibold text-base text-slate-800 tracking-tighter">
						RELATED BOOKING:
					</Label>

					<div className="bg-white border border-gray-300 rounded-lg p-4 space-y-3">
						<div className="flex items-center justify-between">
							<div>
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Booking Reference
								</Label>
								<p className="text-base font-semibold text-primary">
									{booking?.booking_reference}
								</p>
							</div>
							<Badge
								className={cn(
									"px-2 py-1",
									booking?.status === "Completed"
										? "bg-green-100 text-green-800 border-green-300"
										: "bg-gray-100 text-gray-800 border-gray-300"
								)}
							>
								<span className="text-xs">{booking?.status}</span>
							</Badge>
						</div>

						<Separator />

						<div className="grid grid-cols-2 gap-3 text-sm">
							<div>
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Package
								</Label>
								<p className="font-medium text-foreground mt-1">
									{booking?.package_id?.name || "N/A"}
								</p>
							</div>
							<div>
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Total Amount
								</Label>
								<p className="font-bold text-foreground mt-1">
									{formatToPeso(String(booking?.total_amount))}
								</p>
							</div>
							<div>
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Booking Date
								</Label>
								<p className="font-medium text-foreground mt-1">
									{formatToNormalDate(booking?.booking_date ?? "")}
								</p>
							</div>
							<div>
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Photographer
								</Label>
								<p className="font-medium text-foreground mt-1">
									{booking?.photographer_id?.name}
								</p>
							</div>
						</div>

						<Separator />

						<Button
							variant="outline"
							size="sm"
							className="w-full"
							onClick={() => navigate(`/profile/my-bookings/${booking?._id}`)}
						>
							<Receipt className="w-4 h-4 mr-2" />
							View Full Booking Details
						</Button>
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
									{request?.customer_id?.first_name}{" "}
									{request?.customer_id?.last_name}
								</p>
							</div>
							<div className="space-y-2">
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Email
								</Label>
								<p className="text-sm font-medium text-foreground">
									{request?.customer_id?.email}
								</p>
							</div>
							<div className="space-y-2">
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Mobile Number
								</Label>
								<p className="text-sm font-medium text-foreground">
									{request?.customer_id?.mobile_number}
								</p>
							</div>
							<div className="space-y-2">
								<Label className="text-xs text-muted-foreground uppercase tracking-wider">
									Customer No.
								</Label>
								<p className="text-sm font-medium text-foreground">
									{request?.customer_id?.customer_no}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Refund Processing Info */}
				{request?.status === "Approved" && (
					<>
						<Separator />
						<div className="bg-green-50 border border-green-200 rounded-lg p-4">
							<div className="flex items-start gap-3">
								<CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
								<div className="flex-1">
									<Label className="font-semibold text-sm text-green-800 mb-1 block">
										Refund Approved
									</Label>
									<p className="text-sm text-green-700 font-light leading-relaxed">
										Your refund of{" "}
										<span className="font-semibold">
											{formatToPeso(String(request.refund_amount))}
										</span>{" "}
										has been approved and will be processed back to your
										original payment method within 5-10 business days.
									</p>
								</div>
							</div>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
};

export default TransactionRequestDetails;
