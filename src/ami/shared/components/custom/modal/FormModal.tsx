import {
	Dialog,
	DialogContent,
} from "../../../../../core/components/base/dialog";
import { PropsWithChildren } from "react";

type ConfirmModalProps = PropsWithChildren & {
	isFormModalOpen: boolean;
	toggleFormModal: React.Dispatch<React.SetStateAction<boolean>>;
	submitButtonLabel: string;
	cancelButtonLabel: string;
};

const FormModal = ({
	isFormModalOpen,
	toggleFormModal,
	children,
}: ConfirmModalProps) => {
	return (
		<Dialog open={isFormModalOpen} onOpenChange={toggleFormModal}>
			<DialogContent className="max-w-[375px] sm:max-w-[475px] lg:max-w-[600px] px-[8px] md:px-[12px] xl:px-[14px] py-[4px]">
				<div className="h-full">{children}</div>
			</DialogContent>
		</Dialog>
	);
};

export default FormModal;
