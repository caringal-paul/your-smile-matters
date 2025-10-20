// BookingCancelFormModal.tsx
import { Button } from "@/core/components/base/button";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/core/components/base/form";
import { Textarea } from "@/core/components/base/textarea";
import { rangeContainsDayOfWeek } from "react-day-picker";

interface BookingCancelFormModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: () => void;
	form: UseFormReturn<
		{
			cancelled_reason?: string;
		},
		any,
		{
			cancelled_reason?: string;
		}
	>;
}

export const BookingCancelFormModal = ({
	open,
	onOpenChange,
	onSubmit,
	form: cancelForm,
}: BookingCancelFormModalProps) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Cancel Booking</DialogTitle>
				</DialogHeader>

				<Form {...cancelForm}>
					<form className="flex flex-col gap-3">
						<FormField
							control={cancelForm.control}
							name="cancelled_reason"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel className="2xl:text-xs font-semibold">
										Reason for Cancellation
									</FormLabel>
									<Textarea
										className="max-h-[18em] h-[18em] font-light"
										placeholder="Please state the reason for cancelling this booking."
										{...field}
									/>
									<FormMessage className="ml-1" />
								</FormItem>
							)}
						/>

						<DialogFooter className="flex flex-row gap-1">
							<Button
								type="button"
								className="w-full"
								disabled={
									String(cancelForm.getValues("cancelled_reason")).length > 200
								}
								onClick={onSubmit}
							>
								Continue
							</Button>
							<Button
								type="button"
								className="w-1/3"
								variant="outline"
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
