import { Button } from "@/core/components/base/button";
import {
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/core/components/base/dialog";
import { Label } from "@/core/components/base/label";
import { useBookingFormStore } from "@/store-front/store/useBookingFormStore";
import { Dialog } from "@radix-ui/react-dialog";
import { Save, X } from "lucide-react";
import React, { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

type CloseBookingFormConfirmationModal = {
	open: boolean;
	isOpen: React.Dispatch<SetStateAction<boolean>>;
	isForLogin?: boolean;
};

const CloseBookingFormConfirmationModal = ({
	isOpen,
	open,
	isForLogin = false,
}: CloseBookingFormConfirmationModal) => {
	const navigate = useNavigate();
	const { saveDraft, clearDraft } = useBookingFormStore();

	return (
		<Dialog open={open} onOpenChange={isOpen}>
			<DialogContent className=" sm:max-w-sm xl:max-w-xl">
				<DialogHeader className="items-start justify-start relative">
					<Label className="text-2xl font-bold">Save Draft?</Label>
					<DialogClose className="absolute right-0 -top-4 2xl:-top-3 hover:scale-125 transition-all">
						<X />
					</DialogClose>
				</DialogHeader>

				<div className="py-0">
					<p className="text-sm 2xl:text-base text-muted-foreground tracking-tight">
						Do you want to save your changes as a <strong>draft</strong> before
						leaving? Your progress will be <strong>preserved</strong> and you
						can continue editing later.
					</p>
				</div>

				<DialogFooter className="flex flex-col sm:flex-row gap-0 2xl:gap-2">
					<Button
						onClick={() => {
							saveDraft();
							isOpen(false);

							if (isForLogin) {
								localStorage.setItem(
									"redirectToPath",
									window.location.pathname
								);
								navigate("/auth/login");
							}
						}}
						className="text-sm 2xl:text-base w-2/3"
					>
						Save Draft
					</Button>
					<Button
						onClick={() => {
							clearDraft();
							isOpen(false);

							if (isForLogin) {
								localStorage.setItem(
									"redirectToPath",
									window.location.pathname
								);
								navigate("/auth/login");
							}
						}}
						className="text-sm 2xl:text-base w-fit px-4 border-border border-2 bg-transparent text-foreground hover:bg-accent"
					>
						Discard Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CloseBookingFormConfirmationModal;
