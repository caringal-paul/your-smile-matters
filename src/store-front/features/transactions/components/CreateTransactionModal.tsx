import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {
	Form,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/core/components/base/form";

import {
	transactionCreateSchema,
	TransactionSfCreate,
} from "../utils/schema/transaction.sf.schema";
import { PAYMENT_METHOD_OPTIONS } from "@/core/constants/options.constants";
import { UploadCloud, X } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";
import { Label } from "@/core/components/base/label";
import { PricingInput } from "@/core/components/custom/CustomInput";
import { Textarea } from "@/core/components/base/textarea";
import { useCreateTransactionMutation } from "../queries/createTransaction.sf.mutation";
import { Spinner } from "@/core/components/base/spinner";
import { useUploadImagesMutation } from "@/core/queries/uploadImages.mutation";
import { useState } from "react";

type CreateTransactionModalProps = {
	bookingId: string;
	disabled?: boolean;
	open: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateTransactionModal = ({
	bookingId,
	disabled = false,
	open,
	setIsModalOpen,
}: CreateTransactionModalProps) => {
	const MAX_IMAGES = 3;

	const { mutateAsync: createTransaction, isPending: isTransactionSending } =
		useCreateTransactionMutation();

	const uploadImagesMutation = useUploadImagesMutation();
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const form = useForm<TransactionSfCreate>({
		resolver: zodResolver(transactionCreateSchema),
		defaultValues: {
			amount: 0,
			payment_method: "GCash",
			payment_proof_images: [],
			external_reference: "",
			notes: "",
		},
	});

	const proofImages = form.watch("payment_proof_images");
	const hasImages = (proofImages ?? []).length > 0;
	const isFull = (proofImages ?? []).length >= MAX_IMAGES;

	const onSubmit = async (data: TransactionSfCreate) => {
		try {
			let uploadedImagePaths: string[] = [];

			// Upload only if user selected files
			if (selectedFiles.length > 0) {
				const imageFormData = new FormData();

				selectedFiles.forEach((file) => {
					imageFormData.append("images", file);
				});

				const customFilename = `${bookingId}_transaction_proof`;
				imageFormData.append("custom_filename", customFilename);

				const uploadRes = await uploadImagesMutation.mutateAsync({
					formData: imageFormData,
				});

				uploadedImagePaths =
					uploadRes?.map((res) => {
						return `http://localhost:3000${res.path}`;
					}) || [];

				if (Array.isArray(uploadRes) && uploadRes.length > 0) {
					form.setValue("payment_proof_images", uploadedImagePaths);
				}
			}

			await createTransaction({
				id: bookingId,
				payload: {
					...data,
					payment_proof_images: uploadedImagePaths,
				},
			});

			form.reset();
			setSelectedFiles([]);
			setIsModalOpen(false);
		} catch (err) {
			console.error(err);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		const fileArray = Array.from(files);
		const remainingSlots = MAX_IMAGES - selectedFiles.length;
		const filesToAdd = fileArray.slice(0, remainingSlots);

		// Add the actual File objects
		setSelectedFiles((prev) => [...prev, ...filesToAdd]);

		// Add preview URLs to the form field
		const newPreviewUrls = filesToAdd.map((file) => URL.createObjectURL(file));
		form.setValue("payment_proof_images", [
			...(form.getValues("payment_proof_images") || []),
			...newPreviewUrls,
		]);

		e.target.value = "";
	};

	const removeImage = (index: number) => {
		setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

		const newPhotos = (proofImages ?? []).filter((_, i) => i !== index);
		form.setValue("payment_proof_images", newPhotos);
	};

	return (
		<Dialog open={open} onOpenChange={setIsModalOpen}>
			<DialogTrigger asChild>
				<Button
					className="w-full px-4 py-2 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg transition-colors"
					disabled={disabled || isTransactionSending}
				>
					{isTransactionSending ? (
						<>
							<Spinner /> Sending Payment
						</>
					) : (
						"Complete Payment"
					)}
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[80vw]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogHeader className="space-y-1">
							<DialogTitle>Create Transaction</DialogTitle>
							<DialogDescription>
								Enter the payment details below to complete the transaction.
							</DialogDescription>
						</DialogHeader>

						<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 py-2">
							<div className="col-span-1 flex flex-col gap-2">
								<FormField
									control={form.control}
									name="amount"
									render={({ field }) => (
										<FormItem>
											<FormLabel
												htmlFor="amount"
												className="text-xs 2xl:text-sm font-semibold"
											>
												Amount*
											</FormLabel>
											<PricingInput
												placeholder="Enter amount to be transacted"
												prefix="₱"
												value={!field.value ? "" : String(field.value)}
												onChange={(e) => {
													const raw = e.target.value.replace(/[^\d.]/g, "");
													const num = raw === "" ? 0 : parseFloat(raw);
													field.onChange(num);
												}}
											/>
											<FormDescription className="text-3xs 2xl:text-2xs font-light text-gray-400 italic ml-1">
												Amount should match the uploaded image amount. Failure
												to comply might result in rejection of the transaction
												and booking.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Payment Method */}
								<FormField
									control={form.control}
									name="payment_method"
									render={({ field }) => (
										<FormItem>
											<FormLabel
												htmlFor="payment_method"
												className="text-xs 2xl:text-sm font-semibold"
											>
												Payment Method*
											</FormLabel>

											<Select
												value={field.value}
												onValueChange={(value) => {
													field.onChange(value);

													if (value === "Cash") {
														form.setValue("external_reference", "");
													}
												}}
											>
												<SelectTrigger className="h-[33px] shadow-none">
													<SelectValue placeholder="Choose mop" />
												</SelectTrigger>
												<FormDescription className="text-3xs 2xl:text-2xs font-light text-gray-400 italic ml-1">
													Only GCash MOP allows External Reference field.
													Changing to 'Cash' will clear and disable the External
													Reference field.
												</FormDescription>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Available Services</SelectLabel>
														{PAYMENT_METHOD_OPTIONS.map((method) => (
															<SelectItem
																key={method.value}
																value={method.value}
															>
																<div className="flex items-center justify-between w-full gap-2">
																	<Label className="text-xs">
																		{method.label}
																	</Label>
																</div>
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>

											<FormMessage />
										</FormItem>
									)}
								/>

								{/* External Reference */}
								<FormField
									control={form.control}
									name="external_reference"
									render={({ field }) => (
										<FormItem>
											<FormLabel
												htmlFor="external_reference"
												className="text-xs 2xl:text-sm font-semibold"
											>
												External Reference
											</FormLabel>
											<input
												id="external_reference"
												type="text"
												disabled={form.watch("payment_method") === "Cash"}
												className={
													"flex h-[32px] py-1 w-full rounded-md border-border border-[1px] font-normal px-3 tracking-tight leading-none xs:text-2xs text-base placeholder:text-2xs placeholder:font-normal disabled:bg-muted  disabled:hover:cursor-default disabled:text-foreground disabled:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground"
												}
												{...field}
												placeholder="Ref No. (ex. GC154452971)"
											/>
											<FormDescription className="text-3xs 2xl:text-2xs font-light text-gray-400 italic ml-1">
												Providing External Reference will help us verify your
												payment faster.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Notes */}
								<FormField
									control={form.control}
									name="notes"
									render={({ field }) => (
										<FormItem>
											<FormLabel
												htmlFor="notes"
												className="text-xs 2xl:text-sm font-semibold"
											>
												Notes
											</FormLabel>
											<Textarea
												id="notes"
												placeholder="Additional details about the transaction"
												{...field}
												className="max-h-[20em] 2xl:max-h-[30em] h-[20em] 2xl:h-[30em]  min-h-[20em] 2xl:min-h-[30em]"
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="col-span-1 border-l-border border-l-[1px] pl-4">
								<FormField
									control={form.control}
									name="payment_proof_images"
									render={({ field }) => (
										<FormItem className="lg:col-span-2 items-start h-full flex flex-col">
											<FormLabel
												htmlFor="payment_proof_images"
												className="text-xs 2xl:text-sm font-semibold"
											>
												Proof of Payment*
											</FormLabel>
											<div className="w-full flex-1 flex flex-col">
												{!hasImages && (
													<div
														className="border-2 border-dashed border-gray-300 rounded-lg p-14 2xl:p-20 text-center hover:border-gray-400 transition-colors flex-1 flex items-center justify-center hover:cursor-pointer"
														onClick={() => {
															if (!isFull) {
																document
																	.getElementById("payment_proof_images")
																	?.click();
															}
														}}
													>
														<input
															id="payment_proof_images"
															type="file"
															multiple
															accept="image/*"
															className="hidden"
															onChange={handleImageChange}
															disabled={isFull}
														/>
														<label
															htmlFor="payment_proof_images"
															className={`cursor-pointer flex flex-col items-center justify-center ${
																isFull ? "opacity-50 cursor-not-allowed" : ""
															}`}
														>
															<UploadCloud className="size-16 text-gray-400 mb-4" />
															<p className="text-sm text-gray-600 mb-1">
																Click to upload or drag and drop
															</p>
															<p className="text-xs text-gray-500">
																PNG, JPG, GIF up to 10MB (Max {MAX_IMAGES}{" "}
																images)
															</p>
														</label>
													</div>
												)}

												{/* Image Grid - Shown when images exist */}
												{hasImages && (
													<div className="space-y-4 flex flex-col flex-1">
														<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
															{(proofImages ?? []).map((photo, index) => (
																<div key={index} className="relative group">
																	<img
																		src={photo || "/sf/ysm-card-fallback.png"}
																		alt={`Preview ${index + 1}`}
																		onError={(e) => {
																			e.currentTarget.src =
																				"/sf/ysm-card-fallback.png";
																		}}
																		className="w-full h-32 object-cover rounded-lg border border-gray-200"
																	/>
																	<button
																		type="button"
																		onClick={() => removeImage(index)}
																		className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
																	>
																		<X className="w-4 h-4" />
																	</button>
																</div>
															))}
														</div>

														{/* Upload more button - Only shown if not at max */}
														{!isFull && (
															<div
																className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors hover:cursor-pointer"
																onClick={() => {
																	if (!isFull) {
																		document
																			.getElementById("payment_proof_images")
																			?.click();
																	}
																}}
															>
																<input
																	id="payment_proof_images"
																	type="file"
																	multiple
																	accept="image/*"
																	className="hidden"
																	onChange={handleImageChange}
																	disabled={isFull}
																/>
																<label
																	htmlFor="photo_gallery"
																	className={`cursor-pointer flex flex-col items-center justify-center ${
																		isFull
																			? "opacity-50 cursor-not-allowed"
																			: ""
																	}`}
																>
																	<UploadCloud className="size-16 text-gray-400 mb-4" />
																	<p className="text-sm text-gray-600 mb-1">
																		Click to upload or drag and drop
																	</p>
																	<p className="text-xs text-gray-500">
																		PNG, JPG, GIF up to 10MB (Max {MAX_IMAGES}{" "}
																		images)
																	</p>
																</label>
															</div>
														)}

														{/* Max reached message */}
														{isFull && (
															<div className="bg-secondary/20 border border-secondary/40 rounded-lg p-3 text-center">
																<p className="text-sm text-secondary font-medium">
																	Maximum {MAX_IMAGES} images uploaded!
																</p>
															</div>
														)}
													</div>
												)}
											</div>
											<FormMessage className="ml-1" />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<DialogFooter className="pt-4 border-t-[1px] border-border items-end flex">
							<DialogClose asChild>
								<Button type="button" variant="outline">
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit">Submit Payment</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateTransactionModal;
