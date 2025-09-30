import { useForm } from "react-hook-form";
import { useEffect, useRef, useState, useCallback } from "react";
import {
	BookingFormData,
	useBookingFormStore,
} from "@/store-front/store/useBookingFormStore";
import {
	Dialog,
	DialogClose,
	DialogContent,
} from "@/core/components/base/dialog";

import { Tabs, TabsContent } from "@/core/components/base/tabs";

import StepOneForm from "./StepOneForm";
import StepTwoForm from "./StepTwoForm";
import StepThreeForm from "./StepThreeForm";
import StepFourForm from "./StepFourForm";
import StepFiveForm from "./StepFiveForm";
import BookingFormStepsHeader from "./BookingFormStepsHeader";
import { Loader, Loader2, X } from "lucide-react";

const BookingFormModal = () => {
	const { modalOpen, closeModal, formData, clearForm, loading } =
		useBookingFormStore();

	const [currentTab, setCurrentTab] = useState("service");

	const manualClose = useRef(false);

	const { handleSubmit, reset } = useForm<BookingFormData>({
		defaultValues: formData,
	});

	// Reset formData on modal open
	useEffect(() => {
		if (modalOpen) reset(formData);
	}, [modalOpen, formData, reset]);

	const onSubmit = (data: BookingFormData) => {
		clearForm();
		closeModal();
	};

	const handleClose = () => {
		clearForm();
		closeModal();
		setCurrentTab("service");
	};

	return (
		<Dialog
			open={modalOpen}
			onOpenChange={(isOpen) => {
				if (!isOpen && !manualClose.current) {
					handleClose();
				}
				manualClose.current = false;
			}}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				{loading ? (
					<DialogContent className="w-fit h-fit">
						<Loader2 className="animate-spin text-primary" size={48} />
					</DialogContent>
				) : (
					<DialogContent
						className="max-w-[80%] 2xl:max-w-[70%] max-h-[90%]"
						onInteractOutside={(e) => {
							e.preventDefault();
						}}
					>
						<DialogClose className="absolute top-4 right-4 z-50">
							<X />
						</DialogClose>

						<Tabs
							value={currentTab} // controlled value
							onValueChange={(val) => setCurrentTab(val)} // gets the current value
							className="space-y-4"
						>
							<BookingFormStepsHeader currentTab={currentTab} />

							<TabsContent value="service">
								<StepOneForm />
							</TabsContent>

							<TabsContent value="time">
								<StepTwoForm />
							</TabsContent>

							<TabsContent value="photographer">
								<StepThreeForm />
							</TabsContent>

							<TabsContent value="summary">
								<StepFourForm />
							</TabsContent>

							<TabsContent value="status">
								<StepFiveForm />
							</TabsContent>
						</Tabs>
					</DialogContent>
				)}
			</form>
		</Dialog>
	);
};

export default BookingFormModal;
