import { useLocation, useNavigate } from "react-router-dom";

import FormCard from "@/ami/shared/components/custom/card/FormCard";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";

import BackIcon from "@/ami/shared/assets/icons/BackIcon";
import { ChevronRight, MinusIcon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";
import { Form, FormField } from "@/core/components/base/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFieldArray, useForm, useWatch } from "react-hook-form";

import {
	RiskRatingQuestion,
	RiskRatingQuestionnaireSchema,
} from "../utils/schemas/risk-rating-questionnaire.schema";
import { Switch } from "@/core/components/base/switch";
import { Textarea } from "@/core/components/base/textarea";
import { formatToProperText } from "@/ami/shared/helpers/formatToProperText";
import InfoIcon from "@/ami/shared/assets/icons/InfoIcon";
import { Input } from "@/core/components/base/input";
import AddButtonIcon from "@/ami/shared/assets/icons/AddButtonIcon";
import { useEffect } from "react";

const RiskRatingQuestionnaireForm = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isViewForm =
		!location.pathname.includes("edit") && !location.pathname.includes("add");

	const form = useForm<RiskRatingQuestion>({
		resolver: zodResolver(RiskRatingQuestionnaireSchema),
		mode: "onChange",
		defaultValues: {
			answer_format: "short-text",
			question: "Annual income/income level",
			status: true,
			options: undefined,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "options",
	});

	const addNormalOption = () => {
		const currentOptions = form.getValues("options") || [];
		const otherIndex = currentOptions.findIndex(
			(option) => option.type === "other"
		);

		let updatedOptions = [...currentOptions];

		if (otherIndex !== -1) {
			const [otherOption] = updatedOptions.splice(otherIndex, 1);
			updatedOptions.push({ label: "", point: 0, type: "normal" });
			updatedOptions.push(otherOption);
		} else {
			updatedOptions.push({ label: "", point: 0, type: "normal" });
		}

		form.setValue("options", updatedOptions, { shouldValidate: true });
	};

	const addOtherOption = () => append({ label: "", point: 0, type: "other" });

	const answerFormat = useWatch({
		control: form.control,
		name: "answer_format",
	});

	const onSubmit = (values: RiskRatingQuestion) => {
		console.log("===>", values);
	};

	useEffect(() => {
		if (answerFormat === "short-text" || answerFormat === "number-input") {
			addNormalOption();
		} else {
			// Reset to undefined if needed when switching back to select formats
			form.setValue("options", [{ label: "", point: 0, type: "normal" }], {
				shouldValidate: true,
			});
		}
	}, [answerFormat, form]);

	return (
		<div>
			<SectionHeader>
				<div>
					<div className="text-md font-normal flex flex-row gap-1 items-center">
						<Button
							variant={"icon"}
							onClick={() => navigate("/risk-rating-management/questionnaires")}
							className="hover:bg-transparent px-2 text-md font-normal"
						>
							<BackIcon fill="#1C1B1F" className="h-4 w-4" /> Questions
						</Button>
						<ChevronRight className="h-4 w-4" />{" "}
						<span className="text-text-blue">Question Details</span>
					</div>
				</div>
			</SectionHeader>

			<FormCard>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormCard.Body>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label htmlFor="status">Status</FormCard.Label>
										<div className="flex gap-2 items-center">
											<Switch
												checked={field.value}
												onCheckedChange={() =>
													form.setValue("status", !field.value, {
														shouldValidate: true,
													})
												}
												disabled={isViewForm}
											/>

											<div className="relative h-4 w-fit">
												<Label
													className={`absolute transition-opacity duration-300 text-[11px] font-normal ${
														field.value ? "opacity-0" : "opacity-100"
													}`}
												>
													Inactive
												</Label>
												<Label
													className={`absolute transition-opacity duration-300 text-[11px] font-normal ${
														field.value ? "opacity-100" : "opacity-0"
													}`}
												>
													Active
												</Label>
											</div>
										</div>
									</FormCard.Field>
								)}
							/>

							{!isViewForm ? (
								<FormField
									control={form.control}
									name="question"
									render={({ field }) => (
										<FormCard.Field className="items-start">
											<FormCard.Label>Question</FormCard.Label>
											<div className="flex flex-row">
												<Textarea
													disabled={isViewForm}
													className="h-[125px] max-h-[200px]"
													{...field}
												/>
											</div>
										</FormCard.Field>
									)}
								/>
							) : (
								<FormCard.Field>
									<FormCard.Label>Question</FormCard.Label>
									<Label className="text-[11px] font-normal">
										{form.getValues().question}
									</Label>
								</FormCard.Field>
							)}

							{!isViewForm ? (
								<FormCard.Field>
									<FormCard.Label>Answer Format</FormCard.Label>
									<FormField
										control={form.control}
										name="answer_format"
										render={({ field }) => (
											<Select
												value={field.value}
												onValueChange={(value) => field.onChange(value)}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select option" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectItem value="short-text">
															Short text
														</SelectItem>
														<SelectItem value="number-input">
															Number Input
														</SelectItem>
														<SelectItem value="single-select">
															Single Select
														</SelectItem>
														<SelectItem value="multiple-select">
															Multiple Select
														</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										)}
									/>
								</FormCard.Field>
							) : (
								<FormCard.Field>
									<FormCard.Label>Answer Format</FormCard.Label>
									<Label className="text-[11px] font-normal">
										{formatToProperText(form.getValues().answer_format)}
									</Label>
								</FormCard.Field>
							)}
						</FormCard.Body>

						{(answerFormat === "single-select" ||
							answerFormat === "multiple-select") && (
							<div>
								<div className="flex bg-accent text-[10px] md:text-xs gap-2 my-4 md:mt-0 md:mb-4 p-3 items-center rounded-md">
									<InfoIcon
										fill={"#1C1B1F"}
										className="h-3 w-3 md:h-4 md:w-4"
									/>
									Maximum of 5 options only
								</div>

								<FormCard.Body>
									{fields.map((field, index) => (
										<FormCard.Field
											key={field.id}
											className="gap-2 items-start"
										>
											<FormCard.Label className="w-full">
												{fields[index]?.type === "other"
													? "Other"
													: `Option ${index + 1}*`}
											</FormCard.Label>
											<div className="grid grid-cols-7 gap-2 w-full">
												<div className="col-span-7 sm:col-span-6">
													<FormField
														control={form.control}
														name={`options.${index}.label`}
														render={({ field }) => (
															<>
																{fields[index]?.type === "other" ? (
																	<Select
																		value={field.value}
																		onValueChange={(value) =>
																			field.onChange(value)
																		}
																	>
																		<SelectTrigger className={`w-full`}>
																			<SelectValue placeholder="Select option" />
																		</SelectTrigger>
																		<SelectContent>
																			<SelectGroup>
																				<SelectItem value="text-field">
																					Text Field
																				</SelectItem>
																				<SelectItem value="number-field">
																					Number Field
																				</SelectItem>
																			</SelectGroup>
																		</SelectContent>
																	</Select>
																) : (
																	<Textarea
																		placeholder="Fill in option"
																		className="h-20 max-h-20"
																		{...field}
																	/>
																)}
															</>
														)}
													/>
												</div>
												<div className="col-span-7 sm:col-span-1 flex flex-row sm:flex-col justify-between gap-2">
													<div className="flex flex-row gap-1 items-center w-full">
														<label className="font-semibold text-[11px]">
															Point
														</label>
														<FormField
															control={form.control}
															name={`options.${index}.point`}
															render={({ field }) => (
																<Input
																	type="number"
																	min={0}
																	max={100}
																	onKeyDown={(e) => {
																		if (e.key === "Enter") {
																			e.preventDefault();
																		}
																	}}
																	{...field}
																	placeholder="Point"
																/>
															)}
														/>
													</div>
													{fields[index]?.type !== "other" && (
														<Button
															variant="secondary"
															type="button"
															size="sm"
															disabled={fields.length === 1}
															onClick={() => remove(index)}
														>
															Delete
														</Button>
													)}
												</div>
											</div>
										</FormCard.Field>
									))}
									<FormCard.Field>
										<div className="col-start-1 md:col-start-2 flex gap-2">
											<Button
												type="button"
												size="sm"
												className="disabled:bg-transparent disabled:text-primary text-[9px] px-2 max-w-[20em] ml-1 rounded-md border-primary border-[1px] bg-transparent text-primary hover:bg-transparent hover:text-primary [&_svg]:size-3"
												disabled={form.getValues("options")?.length === 5}
												onClick={addNormalOption}
											>
												<AddButtonIcon className="h-2 w-2" fill={"#f58735"} />{" "}
												Add New Option
											</Button>

											{Array.isArray(form.getValues("options")) &&
											form
												.getValues("options")
												?.some((option) => option.type === "other") ? (
												<Button
													type="button"
													size="sm"
													className="disabled:bg-transparent disabled:text-foreground text-[9px] px-2 max-w-[20em] ml-1 rounded-md border-foreground border-[1px] bg-transparent text-foreground hover:bg-transparent hover:text-foreground [&_svg]:size-3"
													disabled={form.getValues("options")?.length === 1}
													onClick={() =>
														remove(
															form
																.getValues("options")
																?.findIndex((option) => option.type === "other")
														)
													}
												>
													<MinusIcon className="h-2 w-2" fill={"#2d2f2f"} />{" "}
													Remove "Others" Option
												</Button>
											) : (
												<Button
													type="button"
													size="sm"
													className="disabled:bg-transparent disabled:text-foreground text-[9px] px-2 max-w-[20em] ml-1 rounded-md border-foreground border-[1px] bg-transparent text-foreground hover:bg-transparent hover:text-foreground [&_svg]:size-3"
													disabled={form.getValues("options")?.length === 5}
													onClick={addOtherOption}
												>
													<AddButtonIcon className="h-2 w-2" fill={"#2d2f2f"} />{" "}
													Add "Others" Option
												</Button>
											)}
										</div>
									</FormCard.Field>
								</FormCard.Body>
							</div>
						)}

						{!isViewForm && (
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
								<Button
									className="sm:w-fit"
									type="submit"
									onClick={() => onSubmit(form.getValues())}
								>
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

export default RiskRatingQuestionnaireForm;
