import { Button } from "@/core/components/base/button";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/core/components/base/form";
import { UploadCloud, X } from "lucide-react";
import { PricingInput } from "@/core/components/custom/CustomInput";
interface TransactionRefundFormModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: () => void;
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	removeImage: (index: number) => void;
	form: UseFormReturn<
		{
			refund_amount: number;
			refund_reason: string;
			notes?: string;
			payment_proof_images: string[];
		},
		any,
		{
			refund_amount: number;
			refund_reason: string;
			notes?: string;
			payment_proof_images: string[];
		}
	>;
}

export const TransactionRefundFormModal = ({
	open,
	onOpenChange,
	onSubmit,
	handleImageChange,
	removeImage,
	form: refundForm,
}: TransactionRefundFormModalProps) => {
	const MAX_IMAGES = 4;

	const proofImages = refundForm.watch("payment_proof_images");
	const hasImages = (proofImages ?? []).length > 0;
	const isFull = (proofImages ?? []).length >= MAX_IMAGES;

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

						<FormField
							control={refundForm.control}
							name="payment_proof_images"
							render={({ field }) => (
								<FormItem className="flex flex-col items-start h-full">
									<FormLabel className="text-xs font-semibold">
										Proof of Refund Payment*
									</FormLabel>
									<div className="w-full flex-1 flex flex-col">
										{/* Upload Area - Full space when no images */}
										{!hasImages && (
											<div
												className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors flex items-center justify-center w-full hover:cursor-pointer"
												onClick={() => {
													if (!isFull) {
														document
															.getElementById("payment_proof_images_refund")
															?.click();
													}
												}}
											>
												<input
													id="payment_proof_images_refund"
													type="file"
													multiple
													accept="image/*"
													className="hidden"
													onChange={handleImageChange}
													disabled={isFull}
												/>
												<label
													htmlFor="payment_proof_images_refund"
													className={`cursor-pointer flex flex-col items-center justify-center ${
														isFull ? "opacity-50 cursor-not-allowed" : ""
													}`}
												>
													<UploadCloud className="size-12 text-gray-400 mb-2" />
													<p className="text-sm text-gray-600 mb-1">
														Click to upload or drag and drop
													</p>
													<p className="text-xs text-gray-500">
														PNG, JPG, GIF up to 10MB (Max {MAX_IMAGES} images)
													</p>
												</label>
											</div>
										)}

										{/* Image Grid - Shown when images exist */}
										{hasImages && (
											<div className="space-y-3 w-full">
												<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
													{proofImages.map((photo, index) => (
														<div key={index} className="relative group">
															<img
																src={photo}
																alt={`Refund proof ${index + 1}`}
																className="w-full h-24 object-cover rounded-lg border border-gray-200"
															/>
															<button
																type="button"
																onClick={() => removeImage(index)}
																className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
															>
																<X className="w-3 h-3" />
															</button>
														</div>
													))}
												</div>

												{/* Upload more button - Only shown if not at max */}
												{!isFull && (
													<div
														className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors hover:cursor-pointer w-full"
														onClick={() => {
															if (!isFull) {
																document
																	.getElementById("payment_proof_images_refund")
																	?.click();
															}
														}}
													>
														<input
															id="payment_proof_images_refund"
															type="file"
															multiple
															accept="image/*"
															className="hidden"
															onChange={handleImageChange}
															disabled={isFull}
														/>
														<label
															htmlFor="payment_proof_images_refund"
															className={`cursor-pointer flex flex-col items-center justify-center ${
																isFull ? "opacity-50 cursor-not-allowed" : ""
															}`}
														>
															<UploadCloud className="size-10 text-gray-400 mb-1" />
															<p className="text-xs text-gray-600">
																Add more images
															</p>
														</label>
													</div>
												)}

												{/* Max reached message */}
												{isFull && (
													<div className="bg-secondary/20 border border-secondary/40 rounded-lg p-2 text-center">
														<p className="text-xs text-secondary font-medium">
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

						<FormField
							control={refundForm.control}
							name="notes"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel className="font-semibold">
										Additional Notes (Optional)
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Add any additional notes"
											className="rounded-lg border-border min-h-16 resize-none"
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
									!refundForm.getValues("refund_reason") ||
									proofImages.length === 0
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
