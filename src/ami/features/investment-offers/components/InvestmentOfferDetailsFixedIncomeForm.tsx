import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import parse from "html-react-parser";

// Components
import FormCard from "@/ami/shared/components/custom/card/FormCard";
import TextAreaEditor from "@/ami/shared/components/custom/input/TextAreaEditor";
import { Button } from "@/core/components/base/button";
import { Form, FormField } from "@/core/components/base/form";

import { Label } from "@/core/components/base/label";
import { Separator } from "@/core/components/base/separator";
import {
	formatToNaira,
	getFormattedNairaInput,
} from "@/ami/shared/helpers/formatCurrency";
import {
	InvestmentDetailsFixedIncome,
	InvestmentDetailsFixedIncomeSchema,
} from "../utils/schemas/investment-details-fixed-income.schema";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";
import { Input } from "@/core/components/base/input";
import { formatToProperText } from "@/ami/shared/helpers/formatToProperText";

const InvestmentOfferDetailsFixedIncomeForm = () => {
	const location = useLocation();
	const isPostForm =
		!location.pathname.includes("view") && !location.pathname.includes("edit");
	const isViewForm = location.pathname.includes("view");
	//
	const form = useForm<InvestmentDetailsFixedIncome>({
		resolver: zodResolver(InvestmentDetailsFixedIncomeSchema),
		mode: "onChange",
		defaultValues: {
			isArchived: isViewForm ? true : true,
			description: !isPostForm
				? `By purchasing shares of Apple stock, investors become partial owners of the company. As a leading technology giant, Apple offers potential for long-term growth, along with the possibility of dividends.

				Market Leader: Apple’s iconic products – from iPhones to MacBooks – continue to drive growth and global demand.
				Strong Financials: With robust revenue, consistent profit growth, and a solid dividend track record, AAPL is a proven performer.
				Future-Focused: Apple is investing heavily in cutting-edge technologies like AI, AR, and wearables, positioning itself for continued long-term growth.`
				: "",
			asset_class: isPostForm ? "" : "fixed-income",
			investment_name: isPostForm ? "" : " Apple Inc. (AAPL)",
			return_of_investment: isPostForm ? "" : "3%",
			return_of_investment_frequency: isPostForm ? "" : "anually",
			min_investment_amount: isPostForm ? "" : "1685548",
			max_investment_amount: isPostForm ? "" : "10000000",
			investment_tenor: isPostForm ? "" : "10 months, 1 year",
		},
	});

	const onSubmit = (values: InvestmentDetailsFixedIncome) => {
		console.log(values);
	};

	return (
		<FormCard className={"mt-0 h-fit mb-4"}>
			<FormCard.Title hasSeparator={false}>Investment Details</FormCard.Title>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormCard.Body>
						{/* NOTE: DONT DELETE THIS IS DEPRIO ONLY BUT MIGHT NEED IN FUTURE */}
						{/* {!isPostForm && (
							<FormField
								// control={form.control}
								name="isArchived"
								render={({ field }) => (
									<FormCard.Field
										className={`${isPostForm && "flex"} items-start`}
									>
										// <FormCard.Label className={`${isPostForm && "hidden"}`}>
											// Visibility Status
										</FormCard.Label>

										<div className="flex items-center gap-4 flex-shrink-0">
											<StatusWithIndicator
												value={
													field.value
														? "Inactive"
														: ("Active" as AvailabilityStatus)
												}
												textClassName="text-[11px]"
												colorMap={AVAILABILITY_STATUS_COLORS}
											/>

											<div className={`space-x-2 ${isViewForm && "hidden"}`}>
												<Checkbox
													checked={field.value}
													onCheckedChange={(checked) =>
														field.onChange(checked as boolean)
													}
												/>
												<Label className={`text-xs whitespace-nowrap `}>
													Archive
												</Label>
											</div>
										</div>
									</FormCard.Field>
								)}
							/>
						)} */}

						<FormField
							control={form.control}
							name="investment_name"
							render={({ field }) => (
								<FormCard.Field>
									<FormCard.Label>Investment Name</FormCard.Label>
									<div className="flex flex-row">
										<Input
											placeholder="Investment name"
											disabled={isViewForm}
											className="text-[11px]"
											{...field}
										/>
									</div>
								</FormCard.Field>
							)}
						/>

						<FormCard.Field>
							<FormCard.Label htmlFor="firstName">Asset Class</FormCard.Label>
							<div className="flex flex-row">
								<FormField
									control={form.control}
									name={"asset_class"}
									render={({ field }) => (
										<>
											{!isPostForm ? (
												<Label className="text-[11px] font-normal">
													{formatToProperText(field.value)}
												</Label>
											) : (
												<Select
													value={field.value}
													onValueChange={(value) => field.onChange(value)}
												>
													<SelectTrigger
														className={`w-full ${
															!field.value ? "text-gray-400" : "text-foreground"
														}`}
													>
														<SelectValue placeholder="Select option" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectItem value="fixed-income">
																Fixed Income
															</SelectItem>
															<SelectItem value="equity">Equity</SelectItem>
															<SelectItem value="commodity">
																Commodity
															</SelectItem>
														</SelectGroup>
													</SelectContent>
												</Select>
											)}
										</>
									)}
								/>
							</div>
						</FormCard.Field>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormCard.Field className={`items-start`}>
									<FormCard.Label>Description</FormCard.Label>
									<div className="flex flex-row overflow-hidden w-full">
										{isViewForm ? (
											<div className="rich-text text-[11px] font-normal">
												{parse(String(field.value))}
											</div>
										) : (
											<TextAreaEditor
												description={field.value}
												// placeholder="Enter a description"
												onChange={field.onChange}
											/>
										)}
									</div>
								</FormCard.Field>
							)}
						/>
					</FormCard.Body>

					<Separator
						orientation="horizontal"
						className="h-[1px] w-full my-10"
					/>

					<FormCard.Body
						className={`flex flex-row flex-wrap gap-0 lg:gap-2 ${
							!isViewForm ? "space-y-0" : ""
						}`}
					>
						<FormCard.Title hasSeparator={false} className="mb-4 lg:mb-0">
							Investment Terms
						</FormCard.Title>

						<FormField
							control={form.control}
							name="return_of_investment"
							render={({ field }) => {
								const frequencyValue = form.watch(
									"return_of_investment_frequency"
								);

								return (
									<FormCard.Field className="items-start md:flex md:flex-col lg:grid lg:grid-cols-[20%_1fr]">
										<FormCard.Label className={`${!isViewForm ? "mt-2" : ""}`}>
											Return of Investment (%)
										</FormCard.Label>

										{isViewForm ? (
											<Label className="text-[11px] font-normal">
												{form.getValues("return_of_investment")}{" "}
												{form.getValues("return_of_investment_frequency")}
											</Label>
										) : (
											<>
												<div className="flex flex-col lg:flex-row gap-2 w-full">
													<div className="relative w-full">
														<Input
															disabled={isViewForm}
															className="text-[11px] pr-6"
															placeholder="Portfolio weight"
															value={
																isViewForm ? field.value + "%" : field.value
															}
															onChange={(e) => field.onChange(e.target.value)}
														/>

														<span
															className={`absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-disabled ${
																isViewForm ? "hidden" : ""
															}`}
														>
															%
														</span>
													</div>

													<div className="w-full space-y-2 lg:space-y-0">
														<Input
															placeholder="Frequency of Return of Investment"
															disabled={isViewForm}
															className="text-[11px]"
															value={frequencyValue}
															onChange={(e) =>
																form.setValue(
																	"return_of_investment_frequency",
																	e.target.value,
																	{
																		shouldValidate: true,
																		shouldDirty: true,
																	}
																)
															}
														/>

														<span className="ml-1 text-gray-400 text-[10px] italic font-light leading-[1.8] line-clamp-2">
															Specify the return frequency for this investment.
															Choose from options like annually, semi-annually,
															quarterly, or monthly.
														</span>
													</div>
												</div>
											</>
										)}
									</FormCard.Field>
								);
							}}
						/>

						<FormField
							control={form.control}
							name="min_investment_amount"
							render={({ field }) => {
								const maxAmount = form.watch("max_investment_amount");

								const { formatted: min } = getFormattedNairaInput(field.value);
								const { formatted: max } = getFormattedNairaInput(maxAmount);

								return (
									<FormCard.Field className="items-start md:flex md:flex-col lg:grid lg:grid-cols-[20%_1fr]">
										<FormCard.Label className="whitespace-nowrap my-auto">
											Minimum Investment Amount
										</FormCard.Label>

										<div className="flex flex-col lg:flex-row gap-2 lg:items-center w-full">
											<Input
												disabled={isViewForm}
												className="text-[11px]"
												placeholder="Minimum investment amount"
												value={min}
												onChange={(e) => {
													const rawValue = e.target.value.replace(
														/[^0-9]/g,
														""
													);
													field.onChange(rawValue);
												}}
											/>

											{!isViewForm && (
												<>
													<FormCard.Label className="whitespace-nowrap">
														Maximum Investment Amount
													</FormCard.Label>

													<Input
														disabled={isViewForm}
														className="text-[11px]"
														placeholder="Maximum investment amount"
														value={max}
														onChange={(e) => {
															const rawValue = e.target.value.replace(
																/[^0-9]/g,
																""
															);
															form.setValue("max_investment_amount", rawValue, {
																shouldValidate: true,
																shouldDirty: true,
															});
														}}
													/>
												</>
											)}
										</div>
									</FormCard.Field>
								);
							}}
						/>

						{isViewForm && (
							<FormCard.Field>
								<FormCard.Label>Maximum Investment Amount</FormCard.Label>
								<Label className="text-[11px] font-normal">
									{formatToNaira(form.getValues("max_investment_amount"))}
								</Label>
							</FormCard.Field>
						)}

						<FormField
							control={form.control}
							name="investment_tenor"
							render={({ field }) => {
								return (
									<FormCard.Field className="items-start  md:flex md:flex-col lg:grid lg:grid-cols-[20%_1fr]">
										<FormCard.Label className="mt-2 my-auto">
											Investment Tenor
										</FormCard.Label>
										{isViewForm ? (
											<Label className="text-[11px] font-normal">
												{form.getValues("investment_tenor")}
											</Label>
										) : (
											<div className="w-full space-y-1">
												<Input
													placeholder="Investment tenor"
													disabled={isViewForm}
													className="text-[11px] w-full"
													{...field}
												/>

												<span className="ml-1 text-gray-400 text-[10px] italic font-light leading-2 line-clamp-2">
													Enter the investment tenor using a combination of
													days, months, or years. Separate each value with a
													comma. (Example: 90 days,6 months, 2 years)
												</span>
											</div>
										)}
									</FormCard.Field>
								);
							}}
						/>
					</FormCard.Body>
					{!isViewForm && (
						<FormCard.Footer className="flex gap-2 justify-end">
							<Button variant="secondary" onClick={() => form.reset()}>
								Cancel
							</Button>
							<Button className="sm:w-fit" type="submit">
								{isPostForm ? "Create Investment" : "Save Changes"}
							</Button>
						</FormCard.Footer>
					)}
				</form>
			</Form>
		</FormCard>
	);
};

export default InvestmentOfferDetailsFixedIncomeForm;
