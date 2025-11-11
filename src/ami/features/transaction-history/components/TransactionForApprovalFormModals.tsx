import { UseFormReturn } from "react-hook-form";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/core/components/base/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/core/components/base/form";
import { Button } from "@/core/components/base/button";
import { Textarea } from "@/core/components/base/textarea";
import { ApproveTransactionRequestSchema } from "../utils/schema/approve-transaction-request.ami.schema";
import { RejectTransactionRequestSchema } from "../utils/schema/reject-reject-request.ami.schema";

// ============================================
// Approval Form Modal
// ============================================

type RequestApprovalFormModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: () => void;
	form: UseFormReturn<ApproveTransactionRequestSchema>;
};

export const RequestApprovalFormModal = ({
	open,
	onOpenChange,
	onSubmit,
	form,
}: RequestApprovalFormModalProps) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Approve Request</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form className="flex flex-col gap-3">
						<FormField
							control={form.control}
							name="admin_notes"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel className="2xl:text-xs font-semibold">
										Admin Notes (Optional)
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Add any notes for this approval..."
											rows={4}
											className="resize-none"
										/>
									</FormControl>
									<FormMessage className="ml-1" />
								</FormItem>
							)}
						/>

						<DialogFooter className="flex flex-row gap-1">
							<Button type="button" className="w-full" onClick={onSubmit}>
								Continue
							</Button>
							<Button
								type="button"
								variant="outline"
								className="w-1/3"
								onClick={() => onOpenChange(false)}
							>
								Cancel
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

// ============================================
// Rejection Form Modal
// ============================================

type RequestRejectionFormModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: () => void;
	form: UseFormReturn<RejectTransactionRequestSchema>;
};

export const RequestRejectionFormModal = ({
	open,
	onOpenChange,
	onSubmit,
	form,
}: RequestRejectionFormModalProps) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Reject Request</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form className="flex flex-col gap-3">
						<FormField
							control={form.control}
							name="rejection_reason"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel className="2xl:text-xs font-semibold">
										Rejection Reason
										<span className="text-red-500 ml-1">*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Please provide a reason for rejection..."
											rows={4}
											className="resize-none"
										/>
									</FormControl>
									<FormMessage className="ml-1" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="admin_notes"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel className="2xl:text-xs font-semibold">
										Admin Notes (Optional)
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Add any additional notes..."
											rows={3}
											className="resize-none"
										/>
									</FormControl>
									<FormMessage className="ml-1" />
								</FormItem>
							)}
						/>

						<DialogFooter className="flex flex-row gap-1">
							<Button
								type="button"
								className="w-full"
								disabled={!form.getValues("rejection_reason")}
								onClick={onSubmit}
							>
								Continue
							</Button>
							<Button
								type="button"
								variant="outline"
								className="w-1/3"
								onClick={() => onOpenChange(false)}
							>
								Cancel
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
