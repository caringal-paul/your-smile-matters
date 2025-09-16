import { useLocation, useNavigate } from "react-router-dom";

import FormCard from "@/ami/shared/components/custom/card/FormCard";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";

import BackIcon from "@/ami/shared/assets/icons/BackIcon";
import { ChevronRight } from "lucide-react";

import { Form, FormField } from "@/core/components/base/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFieldArray, useForm } from "react-hook-form";
import {
	RiskRatingRiskTypesSchema,
	RiskTypes,
} from "../utils/schemas/risk-rating-risk-types.schema";
import { Input } from "@/core/components/base/input";
import { Separator } from "@/core/components/base/separator";
import TrashIcon from "@/ami/shared/assets/icons/TrashIcon";
import AddButtonIcon from "@/ami/shared/assets/icons/AddButtonIcon";

const RiskRatingRiskTypesForm = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isEditForm = location.pathname.includes("edit");

	const form = useForm<RiskTypes>({
		resolver: zodResolver(RiskRatingRiskTypesSchema),
		mode: "onChange",
		defaultValues: {
			portfolio_class: "Class 1",
			risk_rating: "High",
			min_point_range: 12,
			max_point_range: 18,
			min_yield_range: 4,
			max_yield_range: 12,
			portfolio_distribution: [
				{
					product_name: "Product 1",
					allotment: 10,
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "portfolio_distribution",
	});

	// Example function to add an empty item
	const addDistribution = () => append({ product_name: "", allotment: 0 });

	const onSubmit = (values: RiskTypes) => {
		console.log(values);
	};

	return (
		<div>
			<SectionHeader>
				<div>
					<div className="text-md font-normal flex flex-row gap-1 items-center">
						<Button
							variant={"icon"}
							onClick={() => navigate("/risk-rating-management/risk-types")}
							className="hover:bg-transparent px-2 text-md font-normal"
						>
							<BackIcon fill="#1C1B1F" className="h-4 w-4" /> Risk Types
						</Button>
						<ChevronRight className="h-4 w-4" />{" "}
						<span className="text-admin-secondary">Risk Type Details</span>
					</div>
				</div>
			</SectionHeader>

			<FormCard>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormCard.Title hasSeparator={false}>
							Risk Type Details
						</FormCard.Title>
						<FormCard.Body>
							<FormField
								control={form.control}
								name="portfolio_class"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label>Portfolio</FormCard.Label>
										<div className="flex flex-row">
											<Input
												disabled={!isEditForm}
												className="text-2xs"
												{...field}
											/>
										</div>
									</FormCard.Field>
								)}
							/>

							<FormCard.Field>
								<FormCard.Label>Risk Rating</FormCard.Label>
								<div className="flex flex-row">
									<Input
										disabled={true}
										className="text-2xs"
										value={form.getValues("risk_rating")}
									/>
								</div>
							</FormCard.Field>

							{isEditForm ? (
								<FormCard.Field>
									<FormCard.Label>Point Range</FormCard.Label>
									<div className="flex flex-row gap-4">
										<FormField
											control={form.control}
											name="min_point_range"
											render={({ field }) => (
												<div className="flex flex-row relative">
													<Input
														disabled={!isEditForm}
														className="text-2xs max-w-[15em] w-[15em] pr-11"
														{...field}
													/>

													<span className="absolute right-3 top-1/2 -translate-y-1/2  text-[12px] text-disabled">
														min.
													</span>
												</div>
											)}
										/>
										<FormField
											control={form.control}
											name="max_point_range"
											render={({ field }) => (
												<div className="flex flex-row relative">
													<Input
														disabled={!isEditForm}
														className="text-2xs max-w-[15em] w-[15em] pr-11"
														{...field}
													/>

													<span className="absolute right-3 top-1/2 -translate-y-1/2  text-[12px] text-disabled">
														max.
													</span>
												</div>
											)}
										/>
									</div>
								</FormCard.Field>
							) : (
								<FormCard.Field>
									<FormCard.Label>Point Range</FormCard.Label>
									<Label className="text-2xs font-normal">
										{form.getValues("min_point_range")}-
										{form.getValues("max_point_range")} points
									</Label>
								</FormCard.Field>
							)}

							{isEditForm ? (
								<FormCard.Field>
									<FormCard.Label>Yield Range</FormCard.Label>
									<div className="flex flex-row gap-4">
										<FormField
											control={form.control}
											name="min_yield_range"
											render={({ field }) => (
												<div className="flex flex-row relative">
													<Input
														disabled={!isEditForm}
														className="text-2xs max-w-[15em] w-[15em] pr-6"
														{...field}
													/>

													<span className="absolute right-3 top-1/2 -translate-y-1/2  text-[12px] text-disabled">
														%
													</span>
												</div>
											)}
										/>
										<FormField
											control={form.control}
											name="max_yield_range"
											render={({ field }) => (
												<div className="flex flex-row relative">
													<Input
														disabled={!isEditForm}
														className="text-2xs max-w-[15em] w-[15em] pr-6"
														{...field}
													/>

													<span className="absolute right-3 top-1/2 -translate-y-1/2  text-[12px] text-disabled">
														%
													</span>
												</div>
											)}
										/>
									</div>
								</FormCard.Field>
							) : (
								<FormCard.Field>
									<FormCard.Label>Yield Range</FormCard.Label>
									<Label className="text-2xs font-normal">
										{form.getValues("min_yield_range")}-
										{form.getValues("max_yield_range")}%
									</Label>
								</FormCard.Field>
							)}
						</FormCard.Body>

						<Separator className="my-8" />

						<FormCard.Title hasSeparator={false}>
							Portfolio Distribution
						</FormCard.Title>
						<FormCard.Body>
							{fields.length === 0 && (
								<p className="text-sm text-muted-foreground mb-2">
									No distributions added yet.
								</p>
							)}

							{fields.map((item, index) => (
								<FormCard.Field key={item.id}>
									<FormCard.Label>Product {index + 1}</FormCard.Label>
									<div className="flex flex-col sm:flex-row gap-2 items-center">
										<Input
											{...form.register(
												`portfolio_distribution.${index}.product_name`
											)}
											placeholder="Product Name"
											disabled={!isEditForm}
											className="text-2xs w-full max-w-[30em]"
										/>

										<FormCard.Label className="ml-6 mr-2">
											Allotment
										</FormCard.Label>

										{isEditForm ? (
											<div className="flex flex-row relative">
												<Input
													type="number"
													step="any"
													{...form.register(
														`portfolio_distribution.${index}.allotment`,
														{ valueAsNumber: true }
													)}
													placeholder="Allotment"
													disabled={!isEditForm}
													className="text-2xs w-full max-w-[15em]"
												/>

												<span className="absolute right-3 top-1/2 -translate-y-1/2  text-[12px] text-disabled">
													%
												</span>
											</div>
										) : (
											<div className="flex flex-row relative">
												<Label className="text-2xs font-normal">
													{item.allotment}%
												</Label>
											</div>
										)}

										{isEditForm && (
											<Button
												variant="ghost"
												type="button"
												onClick={() => remove(index)}
												className="px-2 text-red-500"
											>
												<TrashIcon className="h-4 w-4" />
											</Button>
										)}
									</div>

									<div className="flex flex-col sm:flex-row gap-2">
										{form.formState.errors.portfolio_distribution?.[index]
											?.product_name && (
											<p className="text-xs text-red-500">
												{
													form.formState.errors.portfolio_distribution[index]
														?.product_name?.message
												}
											</p>
										)}
										{form.formState.errors.portfolio_distribution?.[index]
											?.allotment && (
											<p className="text-xs text-red-500">
												{
													form.formState.errors.portfolio_distribution[index]
														?.allotment?.message
												}
											</p>
										)}
									</div>
								</FormCard.Field>
							))}

							{isEditForm && (
								<FormCard.Field>
									<Button
										type="button"
										className="text-[12px] col-start-2 max-w-[20em] px-2 rounded-md border-primary border-[1px] bg-transparent text-primary hover:bg-transparent hover:text-primary [&_svg]:size-4"
										onClick={addDistribution}
									>
										<AddButtonIcon className="h-4 w-4" fill={"#f58735"} /> Add
										New Investment Product
									</Button>
								</FormCard.Field>
							)}
						</FormCard.Body>

						{isEditForm && (
							<FormCard.Footer className="flex gap-2 justify-end">
								<Button
									variant="secondary"
									onClick={() => {
										form.reset();
										form.clearErrors();
									}}
								>
									Cancel
								</Button>
								<Button className="sm:w-fit" type="submit">
									Save Changes
								</Button>
							</FormCard.Footer>
						)}
					</form>
				</Form>
			</FormCard>
		</div>
	);
};

export default RiskRatingRiskTypesForm;
