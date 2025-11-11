import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, X, Clock, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/core/components/base/button";
import {
	Dialog,
	DialogContent,
	DialogClose,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/core/components/base/dialog";
import { cn } from "@/core/lib/utils";
import FormCard from "@/ami/shared/components/card/FormCard";
import { Badge } from "@/core/components/base/badge";
import { REQUEST_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { RequestStatus } from "@/ami/shared/types/status.types";
import { Label } from "@/core/components/base/label";
import { Spinner } from "@/core/components/base/spinner";
import {
	formatToNormalDate,
	formatToNormalTime,
} from "@/ami/shared/helpers/formatDate";
import {
	approveBookingRequestSchema,
	ApproveBookingRequestSchema,
} from "../utils/schemas/approve-booking-request.ami.schema";
import {
	rejectBookingRequestSchema,
	RejectBookingRequestSchema,
} from "../utils/schemas/reject-booking-request.ami.schema";
import {
	RequestApprovalFormModal,
	RequestRejectionFormModal,
} from "./BookingForApprovalFormModals";
import { useGetBookingForApprovalById } from "../queries/getBookingForApprovalById.ami.query";
import { useApproveRescheduleBookingMutation } from "../queries/approveRescheduleBooking.ami.mutation";
import { useApproveCancelBookingMutation } from "../queries/approveCancelBooking.ami.mutation";
import { useRejectBookingRequestMutation } from "../queries/rejectBookingRequest.ami.mutation";

// Types
interface BookingInfo {
	booking_reference: string;
	booking_date: string;
	start_time: string;
	end_time: string;
	location: string;
	status: RequestStatus;
}

interface CustomerInfo {
	customer_no: string;
	first_name: string;
	last_name: string;
	email: string;
	mobile_number: string;
}

interface PhotographerInfo {
	name: string;
	email: string;
	mobile_number: string;
}

interface CustomerRequest {
	_id: string;
	request_reference: string;
	request_type: "Reschedule" | "Cancellation";
	status: RequestStatus;
	booking_id: BookingInfo;
	customer_id: CustomerInfo;
	new_booking_date?: string;
	new_start_time?: string;
	new_end_time?: string;
	new_photographer_id?: PhotographerInfo;
	reschedule_reason?: string | null;
	cancellation_reason?: string | null;
	reviewed_by?: string | null;
	reviewed_at?: string | null;
	admin_notes?: string | null;
	rejection_reason?: string | null;
	created_at: string;
	updated_at: string;
}

type ActionType = "Approve" | "Reject";

interface RequestActionModalProps {
	actionType: ActionType;
	isLoading: boolean;
	onAction: () => void;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	disabled?: boolean;
}

// Refactored RequestActionModal - consistent with BookingActionModal
const RequestActionModal: React.FC<RequestActionModalProps> = ({
	actionType,
	isLoading,
	onAction,
	open,
	onOpenChange,
	disabled = false,
}) => {
	const config = {
		Approve: {
			label: "Approve",
			icon: <CheckCircle2 className="size-4" />,
			iconLarge: <CheckCircle2 className="size-5" />,

			bgColor: "bg-green-500 hover:bg-green-400",
			iconColor: "text-green-600",
			dialogTitle: "Approve Request",
			dialogDesc:
				"Are you sure you want to approve this customer request? This action will update the booking accordingly.",
			actionLabel: "Approve Request",
			cancelLabel: "Cancel",
		},
		Reject: {
			label: "Reject",
			icon: <X className="size-4" />,
			iconLarge: <X className="size-5" />,

			bgColor: "bg-red-500 hover:bg-red-400",
			iconColor: "text-red-600",
			dialogTitle: "Reject Request",
			dialogDesc:
				"Are you sure you want to reject this customer request? The customer will be notified of this decision.",
			actionLabel: "Reject Request",
			cancelLabel: "Cancel",
		},
	}[actionType];

	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<Button
					disabled={disabled || isLoading}
					size="sm"
					onClick={() => onOpenChange(true)}
					className={cn(
						"gap-2 hover:opacity-90 transition-all text-white",
						config.bgColor
					)}
				>
					{config.label}
				</Button>

				<DialogContent className="max-w-[375px] sm:max-w-[425px] px-0 mx-0">
					<DialogHeader className="text-center">
						<DialogTitle className="border-y-[1px] border-dashed border-primary py-2 flex flex-row items-center justify-center gap-3">
							{config.dialogTitle}
						</DialogTitle>
						<DialogDescription className="px-6">
							{config.dialogDesc}
						</DialogDescription>
					</DialogHeader>

					<DialogFooter className="flex flex-nowrap px-6">
						<Button
							type="button"
							onClick={onAction}
							disabled={isLoading}
							className="bg-primary py-6 w-full"
						>
							{isLoading ? (
								<p className="flex flex-row gap-1 items-center">
									<Spinner /> Please wait...
								</p>
							) : (
								config.actionLabel
							)}
						</Button>
						<DialogClose asChild>
							<Button
								className="bg-secondary py-6 px-8 hover:bg-secondary hover:opacity-90"
								disabled={isLoading}
							>
								{config.cancelLabel}
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

const ViewBookingForApproval: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { data: request, isLoading } = useGetBookingForApprovalById(id!);

	const [openModal, setOpenModal] = useState<ActionType | null>(null);
	const [isApprovalFormOpen, setIsApprovalFormOpen] = useState(false);
	const [isRejectionFormOpen, setIsRejectionFormOpen] = useState(false);

	const {
		mutateAsync: approveRescheduleMutation,
		isPending: isApprovingReschedule,
	} = useApproveRescheduleBookingMutation();
	const { mutateAsync: approveCancelMutation, isPending: isApprovingCancel } =
		useApproveCancelBookingMutation();
	const { mutateAsync: rejectMutation, isPending: isRejecting } =
		useRejectBookingRequestMutation();

	const approvalForm = useForm<ApproveBookingRequestSchema>({
		resolver: zodResolver(approveBookingRequestSchema),
		mode: "onChange",
		defaultValues: {
			admin_notes: "",
		},
	});

	const rejectionForm = useForm<RejectBookingRequestSchema>({
		resolver: zodResolver(rejectBookingRequestSchema),
		mode: "onChange",
		defaultValues: {
			rejection_reason: "",
			admin_notes: "",
		},
	});

	const handleConfirmApprovalForm = () => {
		setIsApprovalFormOpen(false);
		setOpenModal("Approve");
	};

	const handleConfirmRejectionForm = () => {
		setIsRejectionFormOpen(false);
		setOpenModal("Reject");
	};

	const handleApprove = async () => {
		if (request?.request_type === "Reschedule") {
			await approveRescheduleMutation({
				id: String(id),
				payload: approvalForm.getValues(),
			});
		} else {
			await approveCancelMutation({
				id: String(id),
				payload: approvalForm.getValues(),
			});
		}
		setOpenModal(null);
	};

	const handleReject = async () => {
		await rejectMutation({
			id: String(id),
			payload: rejectionForm.getValues(),
		});
		setOpenModal(null);
	};

	const buttonControls = useMemo(() => {
		if (!request) return null;

		switch (request.status) {
			case "Pending":
				return (
					<div className="flex flex-row gap-2">
						<RequestActionModal
							actionType="Approve"
							isLoading={isApprovingReschedule || isApprovingCancel}
							onAction={handleApprove}
							open={openModal === "Approve"}
							onOpenChange={(open) => {
								if (open) {
									setIsApprovalFormOpen(true);
								} else {
									setOpenModal(null);
								}
							}}
						/>
						<RequestActionModal
							actionType="Reject"
							isLoading={isRejecting}
							onAction={handleReject}
							open={openModal === "Reject"}
							onOpenChange={(open) => {
								if (open) {
									setIsRejectionFormOpen(true);
								} else {
									setOpenModal(null);
								}
							}}
						/>
					</div>
				);

			case "Approved":
				return (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<CheckCircle2 className="size-4 text-green-600" />
						<span>Request approved</span>
					</div>
				);

			case "Rejected":
				return (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<X className="size-4 text-red-600" />
						<span>Request rejected</span>
					</div>
				);

			default:
				return null;
		}
	}, [
		request?.status,
		openModal,
		isApprovingCancel,
		isApprovingReschedule,
		isRejecting,
	]);

	if (isLoading) {
		return <div className="p-8 text-center">Loading...</div>;
	}

	if (!request) {
		return <div className="p-8 text-center">Request Not Found</div>;
	}

	const isRescheduleRequest = request.request_type === "Reschedule";
	const isCancellationRequest = request.request_type === "Cancellation";

	return (
		<>
			<div className="pb-8 grid grid-cols-1 xl:grid-cols-3 gap-4">
				{/* Header Card */}
				<FormCard className="col-span-1 xl:col-span-3 w-full h-full">
					<FormCard.Title className="flex flex-row items-center justify-between gap-2">
						<span className="flex flex-row gap-2 items-center">
							<FileText className="size-5 text-primary" />
							Request No:
							<strong className="text-primary font-bold">
								{request.request_reference}
							</strong>
							<Badge
								className={cn(
									"ml-2 text-2xs 2xl:text-xs",
									REQUEST_STATUS_COLORS[request.status as RequestStatus]
								)}
							>
								{request.status}
							</Badge>
							<Badge
								className={cn(
									"text-2xs 2xl:text-xs",
									REQUEST_STATUS_COLORS[request.request_type as RequestStatus]
								)}
							>
								{request.request_type}
							</Badge>
						</span>

						{buttonControls}
					</FormCard.Title>

					<div className="flex flex-col w-full gap-4 p-4">
						<FormCard.Field>
							<FormCard.Label>Associated Booking:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{request.booking_id?.booking_reference || "-"}
							</Label>
						</FormCard.Field>

						<FormCard.Field>
							<FormCard.Label>Request Type:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{request.request_type}
							</Label>
						</FormCard.Field>

						<FormCard.Field>
							<FormCard.Label>Request Date:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{formatToNormalDate(String(request.created_at))}
							</Label>
						</FormCard.Field>

						{request.reviewed_at && (
							<FormCard.Field>
								<FormCard.Label>Reviewed Date:</FormCard.Label>
								<Label className="font-normal text-2xs">
									{formatToNormalDate(request.reviewed_at)}
								</Label>
							</FormCard.Field>
						)}
					</div>
				</FormCard>

				{/* Current Booking Details */}
				<FormCard className="col-span-1 xl:col-span-3 w-full h-full">
					<FormCard.Title className="flex flex-row items-center gap-2">
						<Clock className="size-5 text-muted-foreground" />
						Current Booking Details
					</FormCard.Title>
					<div className="flex flex-col w-full gap-4 p-4">
						<FormCard.Field>
							<FormCard.Label>Current Date:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{formatToNormalDate(request.booking_id?.booking_date)} @{" "}
								{formatToNormalTime(request.booking_id?.start_time)} -{" "}
								{formatToNormalTime(request.booking_id?.end_time)}
							</Label>
						</FormCard.Field>

						<FormCard.Field>
							<FormCard.Label>Location:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{request.booking_id?.location || "-"}
							</Label>
						</FormCard.Field>

						<FormCard.Field>
							<FormCard.Label>Booking Status:</FormCard.Label>
							<Badge
								className={cn(
									"text-2xs w-fit",
									REQUEST_STATUS_COLORS[
										request.booking_id?.status as RequestStatus
									]
								)}
							>
								{request.booking_id?.status}
							</Badge>
						</FormCard.Field>
					</div>
				</FormCard>

				{/* Reschedule Request Details */}
				{isRescheduleRequest && (
					<FormCard className="col-span-1 xl:col-span-3 w-full h-full bg-blue-50/30">
						<FormCard.Title className="flex flex-row items-center gap-2">
							<AlertCircle className="size-5 text-blue-600" />
							Requested Changes (Reschedule)
						</FormCard.Title>
						<div className="flex flex-col w-full gap-4 p-4">
							<FormCard.Field>
								<FormCard.Label>New Date & Time:</FormCard.Label>
								<Label className="font-medium text-sm text-blue-700">
									{formatToNormalDate(String(request.new_booking_date))} @{" "}
									{formatToNormalTime(String(request.new_start_time))} -{" "}
									{formatToNormalTime(String(request.new_end_time))}
								</Label>
							</FormCard.Field>

							{request.new_photographer_id && (
								<FormCard.Field>
									<FormCard.Label>Requested Photographer:</FormCard.Label>
									<Label className="font-normal text-2xs">
										{request.new_photographer_id.name}
									</Label>
								</FormCard.Field>
							)}

							<FormCard.Field>
								<FormCard.Label>Reason for Reschedule:</FormCard.Label>
								<Label className="font-normal text-2xs max-w-[70em]">
									{request.reschedule_reason || "-"}
								</Label>
							</FormCard.Field>
						</div>
					</FormCard>
				)}

				{/* Cancellation Request Details */}
				{isCancellationRequest && (
					<FormCard className="col-span-1 xl:col-span-3 w-full h-full bg-red-50/30">
						<FormCard.Title className="flex flex-row items-center gap-2">
							<AlertCircle className="size-5 text-red-600" />
							Cancellation Request Details
						</FormCard.Title>
						<div className="flex flex-col w-full gap-4 p-4">
							<FormCard.Field>
								<FormCard.Label>Reason for Cancellation:</FormCard.Label>
								<Label className="font-normal text-2xs max-w-[70em]">
									{request.cancellation_reason || "-"}
								</Label>
							</FormCard.Field>
						</div>
					</FormCard>
				)}

				{/* Customer Details */}
				<FormCard className="col-span-1 w-full h-full">
					<FormCard.Title>Customer Details</FormCard.Title>
					<div className="flex flex-col w-full gap-4">
						<FormCard.Field>
							<FormCard.Label>Customer No:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{request.customer_id?.customer_no}
							</Label>
						</FormCard.Field>

						<FormCard.Field>
							<FormCard.Label>Name:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{request.customer_id?.first_name}{" "}
								{request.customer_id?.last_name}
							</Label>
						</FormCard.Field>

						<FormCard.Field>
							<FormCard.Label>Email:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{request.customer_id?.email || "-"}
							</Label>
						</FormCard.Field>

						<FormCard.Field>
							<FormCard.Label>Mobile Number:</FormCard.Label>
							<Label className="font-normal text-2xs">
								{request.customer_id?.mobile_number || "-"}
							</Label>
						</FormCard.Field>
					</div>
				</FormCard>

				{/* Admin Review Details */}
				<FormCard className="col-span-1 xl:col-span-2 w-full h-full">
					<FormCard.Title>Admin Review Details</FormCard.Title>
					<div className="flex flex-col w-full gap-4">
						{request.admin_notes && (
							<FormCard.Field>
								<FormCard.Label>Admin Notes:</FormCard.Label>
								<Label className="font-normal text-2xs max-w-[70em]">
									{request.admin_notes}
								</Label>
							</FormCard.Field>
						)}

						{request.rejection_reason && (
							<FormCard.Field>
								<FormCard.Label>Rejection Reason:</FormCard.Label>
								<Label className="font-normal text-2xs text-red-600 max-w-[70em]">
									{request.rejection_reason}
								</Label>
							</FormCard.Field>
						)}

						{request.reviewed_by && (
							<FormCard.Field>
								<FormCard.Label>Reviewed By:</FormCard.Label>
								<Label className="font-normal text-2xs">
									{request.reviewed_by.first_name}{" "}
									{request.reviewed_by.last_name}
								</Label>
							</FormCard.Field>
						)}

						{!request.admin_notes &&
							!request.rejection_reason &&
							!request.reviewed_by && (
								<div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
									<Clock className="size-4" />
									<span>No review details yet</span>
								</div>
							)}
					</div>
				</FormCard>
			</div>

			{/* Form Modals */}
			<RequestApprovalFormModal
				open={isApprovalFormOpen}
				onOpenChange={setIsApprovalFormOpen}
				onSubmit={handleConfirmApprovalForm}
				form={approvalForm}
			/>
			<RequestRejectionFormModal
				open={isRejectionFormOpen}
				onOpenChange={setIsRejectionFormOpen}
				onSubmit={handleConfirmRejectionForm}
				form={rejectionForm}
			/>
		</>
	);
};

export default ViewBookingForApproval;
