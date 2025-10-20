import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../base/dialog";
import { Label } from "../base/label";
import { Button } from "../base/button";

type ConfirmModalProps = {
	onConfirm: () => void;
	onCancel: () => void;
	title: string;
	description?: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
};

const ConfirmModal = ({
	isOpen,
	message,
	onCancel,
	onConfirm,
	onOpenChange,
	title,
	description,
	cancelText = "Cancel",
	confirmText = "Confirm",
}: ConfirmModalProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4">
					<div className="grid gap-3">
						<Label htmlFor="name-1">{message}</Label>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">{cancelText}</Button>
					</DialogClose>
					<Button type="submit">{confirmText}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmModal;
