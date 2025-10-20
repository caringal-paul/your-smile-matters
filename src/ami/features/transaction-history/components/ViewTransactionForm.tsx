// Components
import { Label } from "@/core/components/base/label";
import { useNavigate, useParams } from "react-router-dom";
import FormCard from "@/ami/shared/components/card/FormCard";
import {
	formatDateToTextMonth,
	formatToNormalDate,
	formatToNormalTime,
} from "@/ami/shared/helpers/formatDate";

import {
	Check,
	X,
	Calendar,
	Play,
	CheckCircle2,
	Undo2,
	CreditCard,
	Receipt,
	AlertCircle,
} from "lucide-react";

import { Badge } from "@/core/components/base/badge";
import { useGetTransactionByIdQuery } from "../queries/getTransactionById.ami.query";
import { cn } from "@/core/lib/utils";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import parse from "html-react-parser";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/core/components/base/item";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/core/components/base/dialog";
import {
	BookingStatus,
	TransactionStatus,
} from "@/ami/shared/types/status.types";
import { useMemo, useState } from "react";
import { Button } from "@/core/components/base/button";
import { toast } from "sonner";
import {
	BOOKING_STATUS_COLORS,
	TRANSACTION_STATUS_COLORS,
} from "@/ami/shared/constants/status-colors.constants";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/core/components/base/tooltip";
import { TransactionType } from "@/core/models/transaction.model";
import { TransactionActionModal } from "./TransactionModalForms";
import {
	refundSchema,
	RefundTransactionSchema,
} from "../utils/schema/refund.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionRefundFormModal } from "./RefundTransactionFormModal";
import { useRejectTransactionMutation } from "../queries/rejectTransaction.ami.query";
import { useRefundTransactionMutation } from "../queries/refundTransaction.ami.mutation";
import { Separator } from "@/core/components/base/separator";
import { useApproveTransactionMutation } from "../queries/approveTransaction.ami.query";

// Transaction status colors (add this to your constants if not exists)

const ViewTransactionForm = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);

	const { data: transaction, isLoading } = useGetTransactionByIdQuery(id!);

	const handleImageClick = (imageUrl: string) => {
		setSelectedImage(imageUrl);
		setIsImageModalOpen(true);
	};

	const closeImageModal = () => {
		setIsImageModalOpen(false);
		setSelectedImage(null);
	};

	if (isLoading) {
		return <>Loading</>;
	}

	if (!transaction) {
		return <>Transaction Not Found</>;
	}

	console.log(transaction);

	return (
		<div className="pb-8 grid grid-cols-1 xl:grid-cols-3 gap-4">
			<FormCard className="col-span-1 xl:col-span-3 w-full h-full">
				<FormCard.Title className="flex flex-row items-center justify-between gap-2">
					<span className="flex flex-row gap-2">
						Reference No:
						<strong className="text-primary font-bold">
							{transaction?.transaction_reference}
						</strong>
						<Badge
							className={cn(
								"ml-2 text-2xs 2xl:text-xs",
								TRANSACTION_STATUS_COLORS[transaction.status]
							)}
						>
							{transaction.status}
						</Badge>
					</span>

					<TransactionFormButtonControls
						status={transaction.status}
						transactionId={transaction._id}
						transactionType={transaction.transaction_type}
					/>
				</FormCard.Title>
				<div className="flex flex-col w-full gap-2 2xl:gap-4 lg:flex-row lg:min-h-fit">
					<div className="flex flex-col w-full gap-4 p-4 lg:w-2/3">
						<FormCard.Field>
							<FormCard.Label>Transaction Date:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{formatToNormalDate(transaction?.transaction_date)} @{" "}
								{formatToNormalTime(transaction?.transaction_date)}
							</Label>
						</FormCard.Field>

						<FormCard.Field>
							<FormCard.Label>Transaction Type:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{transaction.transaction_type || "-"}
							</Label>
						</FormCard.Field>

						<FormCard.Field>
							<FormCard.Label>Payment Method:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{transaction.payment_method || "-"}
							</Label>
						</FormCard.Field>

						{transaction.external_reference && (
							<FormCard.Field>
								<FormCard.Label>External Reference:</FormCard.Label>
								<Label className="font-normal text-2xs">
									{transaction.external_reference}
								</Label>
							</FormCard.Field>
						)}

						{transaction.notes && (
							<FormCard.Field>
								<FormCard.Label>Notes:</FormCard.Label>
								<Label className="font-normal text-2xs line-clamp-4 max-w-[40em]">
									{transaction.notes}
								</Label>
							</FormCard.Field>
						)}

						{transaction.refunded_at && (
							<FormCard.Field>
								<FormCard.Label>Refunded Date:</FormCard.Label>
								<Label className="font-normal text-2xs line-clamp-4 max-w-[40em]">
									{formatToNormalDate(transaction.refunded_at)}
								</Label>
							</FormCard.Field>
						)}

						{transaction.refund_reason && (
							<FormCard.Field>
								<FormCard.Label>Refund Reason:</FormCard.Label>
								<Label className="font-normal text-2xs line-clamp-4 max-w-[40em]">
									{transaction.refund_reason}
								</Label>
							</FormCard.Field>
						)}

						{transaction.failed_at && (
							<FormCard.Field>
								<FormCard.Label>Failed Date:</FormCard.Label>
								<Label className="font-normal text-2xs line-clamp-4 max-w-[40em]">
									{formatToNormalDate(transaction.failed_at)}
								</Label>
							</FormCard.Field>
						)}

						{transaction.status === "Failed" && transaction.failure_reason && (
							<FormCard.Field>
								<FormCard.Label>Failure Reason:</FormCard.Label>
								<Label className="font-normal text-2xs line-clamp-4 max-w-[40em]">
									{transaction.failure_reason}
								</Label>
							</FormCard.Field>
						)}

						{transaction.processed_at && (
							<FormCard.Field>
								<FormCard.Label>Processed Date:</FormCard.Label>
								<Label className="font-normal text-2xs line-clamp-4 max-w-[40em]">
									{formatToNormalDate(transaction.processed_at)}
								</Label>
							</FormCard.Field>
						)}

						<FormCard.Field>
							<FormCard.Label>Booking Total Price:</FormCard.Label>
							<Label className="text-secondary font-normal text-2xs">
								{formatToPeso(String(transaction.booking_id?.final_amount))}
							</Label>
						</FormCard.Field>

						<FormCard.Field className="items-start">
							<FormCard.Label>Amount transacted:</FormCard.Label>

							<Label
								className={`font-bold text-sm ${
									transaction.transaction_type === "Refund"
										? "text-destructive"
										: "text-primary"
								}`}
							>
								<div className="flex flex-col gap-1 w-fit">
									{transaction.refund_transaction_id &&
									typeof transaction.refund_transaction_id === "object" ? (
										<div className="grid grid-cols-2 gap-x-8">
											<span className="text-xs font-normal">Original:</span>

											<span className="text-xs font-normal">
												{formatToPeso(String(transaction.amount))}
											</span>

											<span className="text-xs font-normal">Refunded: </span>

											<span className="text-xs font-normal">
												-{" "}
												{formatToPeso(
													String(
														(transaction.refund_transaction_id as any).amount ||
															0
													)
												)}
											</span>
											<Separator className="col-span-2 my-1 bg-primary" />
											<span className="text-xs font-semibold">Total:</span>

											<span className="text-xs font-semibold">
												{formatToPeso(
													String(
														transaction.amount -
															((transaction.refund_transaction_id as any)
																.amount || 0)
													)
												)}
											</span>
										</div>
									) : (
										<span>{formatToPeso(String(transaction.amount))}</span>
									)}
								</div>
							</Label>
						</FormCard.Field>
					</div>
				</div>
			</FormCard>

			{/* BOOKING DETAILS */}
			<FormCard className="col-span-1 w-full h-full">
				<FormCard.Title className="flex flex-row items-center gap-2">
					Booking Details
				</FormCard.Title>
				<div className="flex flex-col w-full gap-4">
					<FormCard.Field>
						<FormCard.Label>Booking Reference:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{transaction.booking_id?.booking_reference || "-"}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Booking Status:</FormCard.Label>
						<Badge
							className={cn(
								"text-2xs",
								transaction.booking_id && transaction.booking_id.status
									? BOOKING_STATUS_COLORS[
											transaction.booking_id.status as BookingStatus
									  ]
									: ""
							)}
						>
							{transaction.booking_id?.status || "-"}
						</Badge>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Scheduled Date:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{transaction.booking_id && transaction.booking_id?.booking_date
								? formatToNormalDate(transaction.booking_id.booking_date)
								: "-"}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Location:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{transaction.booking_id?.location || "-"}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Final Amount:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{transaction.booking_id?.final_amount
								? formatToPeso(String(transaction.booking_id.final_amount))
								: "-"}
						</Label>
					</FormCard.Field>
				</div>
			</FormCard>

			{/* CUSTOMER DETAILS */}
			<FormCard className="col-span-1 w-full h-full">
				<FormCard.Title className="flex flex-row items-center gap-2">
					Customer Details
				</FormCard.Title>
				<div className="flex flex-col w-full gap-4">
					<FormCard.Field>
						<FormCard.Label>Customer No:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{transaction.customer_id?.customer_no}
						</Label>
					</FormCard.Field>

					<FormCard.Field>
						<FormCard.Label>Name:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{transaction.customer_id?.first_name}{" "}
							{transaction.customer_id?.last_name}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Email:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{transaction.customer_id?.email || "-"}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Mobile Number:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{transaction.customer_id?.mobile_number || "-"}
						</Label>
					</FormCard.Field>
				</div>
			</FormCard>

			{/* PAYMENT PROOF & RELATED TRANSACTIONS */}
			<FormCard className="col-span-1 w-full h-full">
				<FormCard.Title className="flex flex-row items-center gap-2">
					Payment Details
				</FormCard.Title>
				<div className="flex flex-col w-full gap-4">
					<FormCard.Field>
						<FormCard.Label>Payment Proof:</FormCard.Label>
						{transaction.payment_proof_images &&
						transaction.payment_proof_images.length > 0 ? (
							<div className="flex flex-wrap gap-2">
								{transaction.payment_proof_images.map((image, index) => (
									<div
										key={index}
										className="relative cursor-pointer group"
										onClick={() => handleImageClick(image)}
									>
										<img
											src={image}
											alt={`Payment proof ${index + 1}`}
											className="w-20 h-20 object-cover rounded border hover:opacity-80 transition-opacity"
										/>
										<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded flex items-center justify-center">
											<Receipt className="size-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
										</div>
									</div>
								))}
							</div>
						) : (
							<Label className="text-destructive font-bold text-xs 2xl:text-sm">
								No proof of payment uploaded yet. Contact customer!
							</Label>
						)}
					</FormCard.Field>

					{transaction.refund_transaction_id && (
						<FormCard.Field>
							<FormCard.Label>Refund Transaction Ref.:</FormCard.Label>

							<Tooltip delayDuration={200}>
								<TooltipTrigger asChild className="cursor-pointer">
									<Button
										variant="link"
										size="link"
										className="font-normal text-2xs"
										onClick={() => {
											navigate(
												`/admin/ami/transaction-history/transactions/view/transaction/${transaction.refund_transaction_id?._id}`
											);
										}}
									>
										{transaction.refund_transaction_id.transaction_reference}
									</Button>
								</TooltipTrigger>
								<TooltipContent
									className="text-white bg-admin-secondary text-3xs"
									side="right"
									sideOffset={5}
									align="end"
									alignOffset={10}
								>
									<p>View refund transaction details</p>
								</TooltipContent>
							</Tooltip>
						</FormCard.Field>
					)}

					{transaction.original_transaction_id && (
						<FormCard.Field>
							<FormCard.Label>Original Transaction:</FormCard.Label>

							<Tooltip delayDuration={200}>
								<TooltipTrigger asChild className="cursor-pointer">
									<Button
										variant="link"
										size="link"
										onClick={(e) => {
											e.stopPropagation();
											e.preventDefault();

											navigate(
												`/admin/ami/transaction-history/transactions/view/transaction/${transaction.original_transaction_id?._id}`
											);
										}}
									>
										{transaction.original_transaction_id.transaction_reference}
									</Button>
								</TooltipTrigger>
								<TooltipContent
									className="text-white bg-admin-secondary text-3xs"
									side="right"
									sideOffset={5}
									align="end"
									alignOffset={10}
								>
									<p>See Original Transaction</p>
								</TooltipContent>
							</Tooltip>
						</FormCard.Field>
					)}

					{transaction.original_transaction_id && (
						<FormCard.Field>
							<FormCard.Label>Original Transaction Status:</FormCard.Label>
							<Badge
								className={cn(
									"text-2xs",
									transaction.original_transaction_id.status &&
										transaction.original_transaction_id.status
										? TRANSACTION_STATUS_COLORS[
												transaction.original_transaction_id
													.status as TransactionStatus
										  ]
										: ""
								)}
							>
								{transaction.original_transaction_id.status || "-"}
							</Badge>
						</FormCard.Field>
					)}

					<FormCard.Field>
						<FormCard.Label>First Payment Date:</FormCard.Label>
						<Label className="font-normal text-2xs">
							{transaction.created_at
								? formatToNormalDate(transaction.created_at)
								: "-"}
						</Label>
					</FormCard.Field>

					{transaction.updated_at && (
						<FormCard.Field>
							<FormCard.Label>Last Updated:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{formatToNormalDate(transaction.updated_at)}
							</Label>
						</FormCard.Field>
					)}
				</div>
			</FormCard>

			<Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
				<DialogContent className="max-w-4xl max-h-[70vh] w-fit h-fit overflow-auto">
					<DialogHeader>
						<DialogTitle>Payment Proof</DialogTitle>
					</DialogHeader>
					<div className="flex justify-center items-center p-4">
						{selectedImage && (
							<img
								src={selectedImage}
								alt="Payment proof"
								className="max-w-full max-h-[70vh] object-contain rounded"
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

type TransactionFormButtonControlsProps = {
	status: TransactionStatus;
	transactionId: string;
	transactionType: TransactionType;
};

const TransactionFormButtonControls = ({
	status,
	transactionId: propTransactionId,
	transactionType,
}: TransactionFormButtonControlsProps) => {
	const params = useParams();
	const transactionId = propTransactionId || params.id;

	// Track which modal is open
	const [openModal, setOpenModal] = useState<string | null>(null);
	const [isRefundFormOpen, setIsRefundFormOpen] = useState(false);

	const { mutateAsync: approveTransaction, isPending: isApprovingTransaction } =
		useApproveTransactionMutation();
	const { mutateAsync: rejectTransaction, isPending: isRejectingTransaction } =
		useRejectTransactionMutation();
	const { mutateAsync: refundTransaction, isPending: isRefundingTransaction } =
		useRefundTransactionMutation();

	const refundForm = useForm<RefundTransactionSchema>({
		resolver: zodResolver(refundSchema),
		mode: "onChange",
		defaultValues: {
			refund_amount: 0,
			refund_reason: "",
			notes: "",
			payment_proof_images: [],
		},
	});

	const handleConfirmRefundForm = () => {
		setIsRefundFormOpen(false);
		setOpenModal("Refund");
	};

	// === Handlers ===
	const handleApprove = async () => {
		await approveTransaction(String(transactionId));
		setOpenModal(null);
	};

	const handleReject = async () => {
		await rejectTransaction(String(transactionId));
		setOpenModal(null);
	};

	const handleRefund = async () => {
		await refundTransaction({
			id: String(transactionId),
			payload: refundForm.getValues(),
		}).then(() => setOpenModal(null));
	};

	// === Memoized UI ===
	const buttonControls = useMemo(() => {
		const renderButtonGroup = (...modals: React.ReactNode[]) => (
			<div className="flex flex-row gap-2">{modals}</div>
		);

		switch (status) {
			case "Pending":
				return renderButtonGroup(
					<TransactionActionModal
						actionType="Approve"
						isLoading={isApprovingTransaction}
						onAction={handleApprove}
						open={openModal === "Approve"}
						onOpenChange={(open) => setOpenModal(open ? "Approve" : null)}
					/>,
					<TransactionActionModal
						actionType="Reject"
						isLoading={isRejectingTransaction}
						onAction={handleReject}
						open={openModal === "Reject"}
						onOpenChange={(open) => setOpenModal(open ? "Reject" : null)}
					/>
				);

			case "Completed":
				if (transactionType === "Refund") {
					return (
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Undo2 className="size-4 text-blue-500" />
							<span>Payment refunded</span>
						</div>
					);
				}

				return renderButtonGroup(
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<CheckCircle2 className="size-4 text-green-600" />
						<span>Payment completed</span>
					</div>,
					<TransactionActionModal
						actionType="Refund"
						isLoading={isRefundingTransaction}
						onAction={handleRefund}
						open={openModal === "Refund"}
						onOpenChange={() => {
							setIsRefundFormOpen(true);
							setOpenModal(null);
						}}
					/>
				);

			case "Failed":
				return (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<X className="size-4 text-destructive" />
						<span>Payment failed</span>
					</div>
				);

			case "Refunded":
				return (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Undo2 className="size-4  text-blue-500" />
						<span>Payment refunded</span>
					</div>
				);

			case "Cancelled":
				return (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<X className="size-4 text-destructive" />
						<span>Transaction cancelled</span>
					</div>
				);

			default:
				return null;
		}
	}, [status, openModal, transactionType]);

	return (
		<>
			{buttonControls}

			<TransactionRefundFormModal
				open={isRefundFormOpen}
				onOpenChange={setIsRefundFormOpen}
				onSubmit={handleConfirmRefundForm}
				form={refundForm}
			/>
		</>
	);
};

// type TransactionFormButtonControlsProps = {
// 	status: TransactionStatus;
// 	transactionId: string;
// 	transactionType: TransactionType;
// };

// const TransactionFormButtonControls = ({
// 	status,
// 	transactionId: propTransactionId,
// 	transactionType,
// }: TransactionFormButtonControlsProps) => {
// 	const params = useParams();
// 	const transactionId = propTransactionId || params.id;

// 	const { mutateAsync: approveTransaction, isPending: isApprovingTransaction } =
// 		useApproveTransactionMutation();
// 	const { mutateAsync: rejectTransaction, isPending: isRejectingTransaction } =
// 		useRejectTransactionMutation();

// 	const isMutating = false;

// 	const handleProcess = () => {
// 		if (window.confirm("Are you sure you want to process this transaction?")) {
// 			toast.info("Process functionality not implemented yet");
// 		}
// 	};

// 	const handleRefund = () => {
// 		const refund_reason = prompt("Please enter refund reason:");

// 		if (!refund_reason || refund_reason.trim().length < 5) {
// 			toast.error("Refund reason must be at least 5 characters");
// 			return;
// 		}

// 		// refundTransactionMutation({
// 		//     id: String(transactionId),
// 		//     refund_reason,
// 		// });
// 		toast.info("Refund functionality not implemented yet");
// 	};

// 	// Memoized UI based on status
// 	const buttonControls = useMemo(() => {
// 		// Pending Status: Can Process or Cancel
// 		if (status === "Pending") {
// 			return (
// 				<div className="flex flex-row gap-2">
// 					<Button
// 						onClick={handleProcess}
// 						disabled={isMutating}
// 						variant="default"
// 						size="sm"
// 						className="gap-2"
// 					>
// 						<CreditCard className="size-4" />
// 						Process Payment
// 					</Button>
// 				</div>
// 			);
// 		}

// 		// Completed Status: Can Refund
// 		if (status === "Completed" && transactionType != "Refund") {
// 			return (
// 				<div className="flex flex-row gap-2">
// 					<div className="flex items-center gap-2 text-sm text-muted-foreground">
// 						<CheckCircle2 className="size-4 text-green-600" />
// 						<span>Payment completed</span>
// 					</div>
// 					<Button
// 						onClick={handleRefund}
// 						disabled={isMutating}
// 						size="sm"
// 						className="gap-2"
// 					>
// 						<Undo2 className="size-4" />
// 						Refund
// 					</Button>
// 				</div>
// 			);
// 		}

// 		// Failed Status: No actions available
// 		if (status === "Failed") {
// 			return (
// 				<div className="flex flex-row gap-2">
// 					<div className="flex items-center gap-2 text-sm text-muted-foreground">
// 						<X className="size-4 text-destructive" />
// 						<span>Payment failed</span>
// 					</div>
// 				</div>
// 			);
// 		}

// 		// Refunded Status: No actions available
// 		if (status === "Refunded") {
// 			return (
// 				<div className="flex flex-row gap-2">
// 					<div className="flex items-center gap-2 text-sm text-muted-foreground">
// 						<Undo2 className="size-4 text-purple-600" />
// 						<span>Payment refunded</span>
// 					</div>
// 				</div>
// 			);
// 		}

// 		// Cancelled Status: No actions available
// 		if (status === "Cancelled") {
// 			return (
// 				<div className="flex flex-row gap-2">
// 					<div className="flex items-center gap-2 text-sm text-muted-foreground">
// 						<X className="size-4 text-destructive" />
// 						<span>Transaction cancelled</span>
// 					</div>
// 				</div>
// 			);
// 		}

// 		return null;
// 	}, [status, isMutating]);

// 	return buttonControls;
// };

export default ViewTransactionForm;
