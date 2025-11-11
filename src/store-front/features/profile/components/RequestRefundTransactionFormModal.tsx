import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Textarea } from "@/core/components/base/textarea";
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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/core/components/base/form";
import { UploadCloud, X } from "lucide-react";
import { PricingInput } from "@/core/components/custom/CustomInput";

interface RequestTransactionFormModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: () => void;
	form: UseFormReturn<
		{
			refund_amount: number;
			transaction_id: string;
			booking_id: string;
			refund_reason?: string | undefined;
		},
		any,
		{
			refund_amount: number;
			transaction_id: string;
			booking_id: string;
			refund_reason?: string | undefined;
		}
	>;
}

export const RequestTransactionFormModal = ({
	open,
	onOpenChange,
	onSubmit,
	form: refundForm,
}: RequestTransactionFormModalProps) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Process Refund</DialogTitle>
				</DialogHeader>

				<Form {...refundForm}>
					<form className="flex flex-col gap-4">
						<FormField
							control={refundForm.control}
							name="refund_amount"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel className="font-semibold">Refund Amount</FormLabel>
									<FormControl>
										{/* <Input
											type="number"
											placeholder="Enter refund amount"
											step="0.01"
											min="0"
											{...field}
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value) || 0)
											}
											className="rounded-lg border-border"
										/> */}

										<PricingInput
											prefix="₱"
											value={!field.value ? "" : String(field.value)}
											onChange={(e) => {
												const raw = e.target.value.replace(/[^\d.]/g, "");
												const num = raw === "" ? 0 : parseFloat(raw);
												field.onChange(num);
											}}
										/>
									</FormControl>

									<FormMessage className="ml-1" />
								</FormItem>
							)}
						/>

						<FormField
							control={refundForm.control}
							name="refund_reason"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel className="font-semibold">Refund Reason</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter reason for refund"
											className="rounded-lg border-border min-h-20 resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage className="ml-1" />
								</FormItem>
							)}
						/>

						<DialogFooter className="flex flex-row gap-2 pt-2">
							<Button
								type="button"
								className="w-full"
								disabled={
									!refundForm.getValues("refund_amount") ||
									!refundForm.getValues("refund_reason")
								}
								onClick={onSubmit}
							>
								Process Refund
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
