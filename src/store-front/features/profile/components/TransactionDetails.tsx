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
	Barcode,
	Calendar,
	Clock,
	CreditCard,
	Download,
	MapPin,
} from "lucide-react";
import { Separator } from "@/core/components/base/separator";
import { cn } from "@/core/lib/utils";
import { TRANSACTION_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { TransactionStatus } from "@/ami/shared/types/status.types";
import { Label } from "@/core/components/base/label";
import {
	formatToNormalDate,
	formatToNormalTime,
} from "@/ami/shared/helpers/formatDate";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { Button } from "@/core/components/base/button";
import { useGetTransactionDetailsByIdQuery } from "../../transactions/queries/getTransactionDetailsById.sf.query";
import { useState } from "react";
import {
	requestRefundSchema,
	RequestRefundTransactionSchema,
} from "../utils/schema/request-refund.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RequestTransactionFormModal } from "./RequestRefundTransactionFormModal";
import { useSendRefundTransactionForApproval } from "../queries/sendRefundTransactionForApproval.sf.mutation";

const TransactionDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [isRefundFormOpen, setIsRefundFormOpen] = useState(false);

	const { data: transaction, isPending: isTransactionFetching } =
		useGetTransactionDetailsByIdQuery(id!);

	const {
		mutateAsync: sendRefundTransactionForApproval,
		isPending: isSendingRefundRequestForApproval,
	} = useSendRefundTransactionForApproval();

	const refundForm = useForm<RequestRefundTransactionSchema>({
		resolver: zodResolver(requestRefundSchema),
		mode: "onChange",
		defaultValues: {
			booking_id: "",
			refund_amount: 0,
			refund_reason: "",
			transaction_id: "",
		},
	});

	const handleSubmitRefundTransaction = async () => {
		await sendRefundTransactionForApproval({
			booking_id: transaction!.booking_id._id,
			transaction_id: transaction!._id,
			refund_amount: refundForm.getValues().refund_amount,
			refund_reason: refundForm.getValues().refund_reason,
		}).then(() => {
			setIsRefundFormOpen(false);
			refundForm.reset();
		});
	};

	if (isTransactionFetching && !transaction) {
		return <div>Loading...</div>;
	}

	const handleDownloadProof = (imageUrl: string, index: number) => {
		const link = document.createElement("a");
		link.href = imageUrl;
		link.download = `payment-proof-${index + 1}.png`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<Card className="h-full w-full flex flex-col">
			<CardHeader className="pb-3 border-gray-300 border-b-[1px] drop-shadow-sm shadow-sm">
				<div className="flex items-start justify-between">
					<div>
						<div className="flex flex-row gap-4 items-center">
							<CardTitle className="text-3xl">Transaction Details</CardTitle>
							<Button
								onClick={() => setIsRefundFormOpen(true)}
								className={`rounded-full h-8 py-0 px-4 text-xs font-light tracking-tight shadow-lg border-border border hover:${TRANSACTION_STATUS_COLORS["Refunded"]} ${TRANSACTION_STATUS_COLORS["Refunded"]}`}
							>
								Request for Refund
							</Button>
						</div>
						<CardDescription className="text-lg">
							Ref:{" "}
							<span className="text-primary font-semibold">
								{transaction?.transaction_reference}
							</span>
						</CardDescription>
					</div>
					<Badge
						className={cn(
							"px-3 py-1",
							TRANSACTION_STATUS_COLORS[
								transaction?.status as TransactionStatus
							]
						)}
					>
						<span className="text-base">{transaction?.status}</span>
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="overflow-auto px-8 space-y-4">
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
								Name: {transaction?.customer_id.first_name}{" "}
								{transaction?.customer_id.last_name}
							</Label>
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								Email: {transaction?.customer_id.email}
							</Label>
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								Mobile Number: {transaction?.customer_id.mobile_number}
							</Label>
						</div>
					</div>

					<div className="space-y-2">
						<Label className="font-semibold text-base text-slate-800 tracking-tighter">
							BOOKING REFERENCE:
						</Label>
						<div className="flex flex-col space-y-1">
							<Button
								variant="link"
								size="link"
								className="text-sm justify-start px-0"
								onClick={() =>
									navigate(
										`/my-bookings/booking/${transaction?.booking_id._id}/details`
									)
								}
							>
								{transaction?.booking_id.booking_reference}
							</Button>
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								Date:{" "}
								{formatToNormalDate(transaction?.booking_id.booking_date ?? "")}
							</Label>
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								Location: {transaction?.booking_id.location}
							</Label>
						</div>
					</div>
				</div>

				<Separator />

				<div className="space-y-3">
					<Label className="font-semibold text-base text-slate-800 tracking-tighter">
						TRANSACTION INFORMATION:
					</Label>

					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<Calendar className="w-4 h-4 text-primary" />
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								<span className="font-medium">Transaction Date:</span>{" "}
								{formatToNormalDate(transaction?.transaction_date ?? "")}
							</Label>
						</div>

						<div className="flex items-center gap-3">
							<Clock className="w-4 h-4 text-primary" />
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								<span className="font-medium">Processed At:</span>{" "}
								{transaction?.processed_at
									? formatToNormalTime(transaction.processed_at)
									: "N/A"}
							</Label>
						</div>

						<div className="flex items-center gap-3">
							<CreditCard className="w-4 h-4 text-primary" />
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								<span className="font-medium">Payment Method:</span>{" "}
								{transaction?.payment_method}
							</Label>
						</div>

						<div className="flex items-center gap-3">
							<Barcode className="w-4 h-4 text-primary mt-[1px]" />
							<Label
								variant="sf"
								size="sf-normal"
								className="font-light text-foreground"
							>
								<span className="font-medium">Type:</span>{" "}
								{transaction?.transaction_type}
							</Label>
						</div>

						{transaction?.updated_by &&
							transaction.updated_by._id !== transaction?.customer_id._id && (
								<div className="flex flex-col gap-2 pt-2">
									<Label className="font-semibold text-base text-slate-800 tracking-tighter">
										PROCESSED BY:
									</Label>
									<div className="flex flex-col space-y-1 bg-secondary/10 border border-secondary/30 rounded-lg p-3">
										<Label
											variant="sf"
											size="sf-normal"
											className="font-light text-foreground"
										>
											Name: {transaction.updated_by.first_name}{" "}
											{transaction.updated_by.last_name}
										</Label>
										<Label
											variant="sf"
											size="sf-normal"
											className="font-light text-foreground"
										>
											Email: {transaction.updated_by.email}
										</Label>
										<Label
											variant="sf"
											size="sf-normal"
											className="font-light text-foreground"
										>
											Mobile: {transaction.updated_by.mobile_number}
										</Label>
										{/* <Label
											variant="sf"
											size="sf-normal"
											className="font-light text-foreground"
										>
											Role: {transaction.updated_by.role_id}
										</Label> */}
									</div>
								</div>
							)}
					</div>
				</div>

				<Separator />

				<div className="space-y-3">
					<Label className="font-semibold text-base text-slate-800 tracking-tighter">
						PAYMENT AMOUNT:
					</Label>

					<div className="bg-white border-[1px] border-border rounded-lg p-6 space-y-4 font-mono text-sm">
						<div className="border-t-2 border-dashed border-gray-400"></div>

						<div className="flex justify-between items-start">
							<span className="text-foreground">
								{transaction?.transaction_type == "Refund"
									? "Amount Received"
									: "Amount Paid"}
							</span>
							<span className="font-medium text-lg">
								{formatToPeso(String(transaction?.amount))}
							</span>
						</div>

						{transaction?.notes && (
							<>
								<div className="border-t-2 border-dashed border-gray-400"></div>
								<div className="flex flex-col gap-2">
									<span className="text-xs text-gray-600 font-semibold">
										NOTES:
									</span>
									<span className="text-sm text-gray-700 font-light">
										{transaction.notes}
									</span>
								</div>
							</>
						)}

						<div className="border-t-2 border-dashed border-gray-400"></div>

						<div className="text-center text-xs text-secondary-foreground mt-4">
							Transaction ID: {transaction?.transaction_reference}
						</div>
					</div>
				</div>

				<Separator />

				{transaction?.payment_proof_images &&
					transaction.payment_proof_images.length > 0 && (
						<>
							<div className="space-y-3">
								<Label className="font-semibold text-base text-slate-800 tracking-tighter">
									PAYMENT PROOF:
								</Label>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{transaction.payment_proof_images.map(
										(image: string, idx: number) => (
											<div
												key={idx}
												className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
											>
												<div className="bg-gray-100 p-4 flex items-center justify-center min-h-[200px]">
													<img
														src={image}
														alt={`Payment proof ${idx + 1}`}
														className="max-w-full max-h-[300px] object-contain rounded"
													/>
												</div>
												<div className="p-3 bg-white border-t border-gray-300 flex justify-between items-center">
													<span className="text-sm text-gray-700 font-medium">
														Proof #{idx + 1}
													</span>
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleDownloadProof(image, idx)}
														className="gap-2"
													>
														<Download className="w-4 h-4" />
														Download
													</Button>
												</div>
											</div>
										)
									)}
								</div>
							</div>

							<Separator />
						</>
					)}

				{transaction?.failure_reason && (
					<>
						<div className="space-y-3">
							<Label className="font-semibold text-base text-slate-800 tracking-tighter">
								FAILURE REASON:
							</Label>

							<div className="bg-red-50 border border-red-200 rounded-lg p-4">
								<p className="text-sm text-red-700 font-light">
									{transaction.failure_reason}
								</p>
							</div>
						</div>

						<Separator />
					</>
				)}

				{transaction?.refund_reason && (
					<>
						<div className="space-y-3">
							<Label className="font-semibold text-base text-slate-800 tracking-tighter">
								REFUND REASON:
							</Label>

							<div className="bg-secondary/20 border border-secondary/70 rounded-lg p-4">
								<p className="text-sm text-secondary-foreground font-light">
									{transaction.refund_reason}
								</p>
							</div>
						</div>

						<Separator />
					</>
				)}

				<div className="space-y-3">
					<Label className="font-semibold text-base text-slate-800 tracking-tighter">
						TRANSACTION SUMMARY:
					</Label>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="border border-gray-300 rounded-lg p-4 space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-700">Status:</span>
								<Badge
									className={cn(
										"px-2 py-1 rounded text-xs font-semibold",
										TRANSACTION_STATUS_COLORS[
											transaction?.status as TransactionStatus
										]
									)}
								>
									{transaction?.status}
								</Badge>
							</div>

							<Separator />

							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-700">Type:</span>
								<span className="text-sm font-medium text-gray-800">
									{transaction?.transaction_type}
								</span>
							</div>

							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-700">Method:</span>
								<span className="text-sm font-medium text-gray-800">
									{transaction?.payment_method}
								</span>
							</div>
						</div>

						<div className="border border-gray-300 rounded-lg p-4 space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-700">Created At:</span>
								<span className="text-sm font-light text-gray-800">
									{formatToNormalDate(transaction?.created_at ?? "")}
								</span>
							</div>

							<Separator />

							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-700">Updated At:</span>
								<span className="text-sm font-light text-gray-800">
									{formatToNormalDate(transaction?.updated_at ?? "")}
								</span>
							</div>

							{transaction?.processed_at && (
								<div className="flex justify-between items-center">
									<span className="text-sm text-gray-700">Processed At:</span>
									<span className="text-sm font-light text-gray-800">
										{formatToNormalDate(transaction.processed_at)}
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</CardContent>

			<RequestTransactionFormModal
				open={isRefundFormOpen}
				onOpenChange={setIsRefundFormOpen}
				onSubmit={handleSubmitRefundTransaction}
				form={refundForm}
			/>
		</Card>
	);
};

export default TransactionDetails;
