import React from "react";
import { Button } from "@/core/components/base/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/core/components/base/dialog";
import { cn } from "@/core/lib/utils";
import { BOOKING_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { Calendar, Check, CheckCircle2, Play, X } from "lucide-react";
import { Spinner } from "@/core/components/base/spinner";

type BookingActionType =
	| "Confirm"
	| "Reschedule"
	| "Cancel"
	| "Start"
	| "Complete";

interface BookingActionModalProps {
	actionType: BookingActionType;
	onAction: () => void;
	isLoading?: boolean;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	disabled?: boolean;
}

export const BookingActionModal = ({
	actionType,
	onAction,
	isLoading = false,
	open,
	onOpenChange,
	disabled,
}: BookingActionModalProps) => {
	const config = {
		Confirm: {
			label: "Confirm Booking",
			icon: <Check className="size-4" />,
			color: BOOKING_STATUS_COLORS["Confirmed"],
			variant: "default" as const,
			dialogTitle: "Confirm Booking",
			dialogDesc:
				"Once confirmed, this booking will be marked as approved and visible to the customer. Do you want to proceed?",
			actionLabel: "Confirm Booking",
			cancelLabel: "Go Back",
		},
		Reschedule: {
			label: "Reschedule",
			icon: <Calendar className="size-4" />,
			color: BOOKING_STATUS_COLORS["Rescheduled"],
			variant: "default" as const,
			dialogTitle: "Reschedule Booking",
			dialogDesc:
				"Rescheduling will change the current booking date and time. Make sure to notify the customer about this update.",
			actionLabel: "Confirm Reschedule",
			cancelLabel: "Keep Schedule",
		},
		Cancel: {
			label: "Cancel",
			icon: <X className="size-4" />,
			color: BOOKING_STATUS_COLORS["Cancelled"],
			variant: "destructive" as const,
			dialogTitle: "Cancel Booking",
			dialogDesc:
				"This booking will be cancelled and the customer will be notified. This action cannot be undone. Are you sure?",
			actionLabel: "Yes, Cancel Booking",
			cancelLabel: "Keep Booking",
		},
		Start: {
			label: "Start Booking",
			icon: <Play className="size-4" />,
			color: BOOKING_STATUS_COLORS["Ongoing"],
			variant: "default" as const,
			dialogTitle: "Start Booking",
			dialogDesc:
				"Starting the booking will set its status to ongoing. Confirm only when the session is about to begin.",
			actionLabel: "Start Now",
			cancelLabel: "Not Yet",
		},
		Complete: {
			label: "Complete Booking",
			icon: <CheckCircle2 className="size-4" />,
			color: BOOKING_STATUS_COLORS["Completed"],
			variant: "default" as const,
			dialogTitle: "Complete Booking",
			dialogDesc:
				"Once completed, this booking will be marked as finished and recorded in the system. Do you want to proceed?",
			actionLabel: "Mark as Completed",
			cancelLabel: "Cancel",
		},
	}[actionType];

	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<Button
				// isLoading ||
				disabled={disabled}
				variant={config.variant}
				size="sm"
				onClick={() => onOpenChange(true)}
				className={cn(
					`gap-2 hover:opacity-90 transition-all text-white hover:bg-[${config.color}]`,
					config.color
				)}
			>
				{config.icon}
				{config.label}
			</Button>
			<DialogContent className="max-w-[375px] sm:max-w-[425px]  px-0 mx-0">
				<DialogHeader className="text-center ">
					<DialogTitle className="border-y-[1px] border-dashed border-primary py-2">
						{config.dialogTitle}
					</DialogTitle>
					<DialogDescription className="px-6">
						{config.dialogDesc}
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="flex flex-nowrap px-6">
					<Button
						type="submit"
						onClick={onAction}
						disabled={isLoading}
						className="bg-primary py-6 w-full"
					>
						{isLoading ? (
							<p className="flex flex-row gap-1">
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
	);
};
