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
import { TRANSACTION_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { Check, X, Undo2 } from "lucide-react";

type TransactionActionType = "Approve" | "Reject" | "Refund";

interface TransactionActionModalProps {
	actionType: TransactionActionType;
	onAction: () => void;
	isLoading: boolean;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	disabled?: boolean;
}

export const TransactionActionModal = ({
	actionType,
	onAction,
	isLoading,
	open,
	onOpenChange,
	disabled,
}: TransactionActionModalProps) => {
	const config = {
		Approve: {
			label: "Approve Payment",
			icon: <Check className="size-4" />,
			color: TRANSACTION_STATUS_COLORS["Completed"],
			variant: "default" as const,
			dialogTitle: "Approve Payment",
			dialogDesc:
				"Once approved, this payment will be marked as completed and the customer will be notified. Do you want to proceed?",
			actionLabel: "Approve Payment",
			cancelLabel: "Go Back",
		},
		Reject: {
			label: "Reject",
			icon: <X className="size-4" />,
			color: TRANSACTION_STATUS_COLORS["Failed"],
			variant: "destructive" as const,
			dialogTitle: "Reject Payment",
			dialogDesc:
				"This payment will be rejected and marked as failed. The customer will be notified and can resubmit their payment. Are you sure?",
			actionLabel: "Yes, Reject Payment",
			cancelLabel: "Keep Pending",
		},
		Refund: {
			label: "Refund",
			icon: <Undo2 className="size-4" />,
			color: TRANSACTION_STATUS_COLORS["Refunded"],
			variant: "default" as const,
			dialogTitle: "Refund Payment",
			dialogDesc:
				"This payment will be refunded to the customer. Make sure to provide a reason for the refund. Do you want to proceed?",
			actionLabel: "Process Refund",
			cancelLabel: "Cancel",
		},
	}[actionType];

	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<Button
				disabled={isLoading || disabled}
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
			<DialogContent className="max-w-[375px] sm:max-w-[425px] px-0 mx-0">
				<DialogHeader className="text-center">
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
						{isLoading ? "Processing..." : config.actionLabel}
					</Button>
					<DialogClose asChild>
						<Button
							disabled={isLoading}
							className="bg-secondary py-6 px-8 hover:bg-secondary hover:opacity-90"
						>
							{config.cancelLabel}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
