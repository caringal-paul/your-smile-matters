import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../../../../core/components/base/dialog";
import { Button } from "../../../../../core/components/base/button";

type ConfirmModalProps = {
	isConfirmModalOpen: boolean;
	toggleConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
	confirmButtonLabel: string;
	dismissButtonLabel: string;
	title: string;
	description: string;
};

const ConfirmModal = ({
	isConfirmModalOpen,
	toggleConfirmModal,
	confirmButtonLabel,
	dismissButtonLabel,
	title,
	description,
}: ConfirmModalProps) => {
	return (
		<Dialog open={isConfirmModalOpen} onOpenChange={toggleConfirmModal}>
			<DialogContent className="max-w-[375px] sm:max-w-[425px]">
				<DialogHeader className="text-center">
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex flex-nowrap">
					<Button
						type="submit"
						variant="confirm"
						size="confirm"
						onClick={() => toggleConfirmModal(false)}
					>
						{confirmButtonLabel}
					</Button>
					<DialogClose asChild>
						<Button size="dismiss" variant="dismiss">
							{dismissButtonLabel}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmModal;
