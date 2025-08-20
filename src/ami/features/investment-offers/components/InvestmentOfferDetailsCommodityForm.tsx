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
import {
	InvestmentDetailsCommodity,
	InvestmentDetailsCommoditySchema,
} from "../utils/schemas/investment-details-commodity.schema";
import { Label } from "@/core/components/base/label";
import { Input } from "@/core/components/base/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";
import { formatToProperText } from "@/ami/shared/helpers/formatToProperText";
import { Separator } from "@/core/components/base/separator";
import { getFormattedNairaInput } from "@/ami/shared/helpers/formatCurrency";

const InvestmentOfferDetailsCommodityForm = () => {
	const location = useLocation();
	const isPostForm =
		!location.pathname.includes("view") && !location.pathname.includes("edit");
	const isViewForm = location.pathname.includes("view");

	const form = useForm<InvestmentDetailsCommodity>({
		resolver: zodResolver(InvestmentDetailsCommoditySchema),
		mode: "onChange",
		defaultValues: {
			isArchived: isViewForm ? true : true,
			description: !isPostForm
				? `By purchasing shares of Apple stock, investors become partial owners of the company. As a leading technology giant, Apple offers potential for long-term growth, along with the possibility of dividends.

				Market Leader: Apple’s iconic products – from iPhones to MacBooks – continue to drive growth and global demand.
				Strong Financials: With robust revenue, consistent profit growth, and a solid dividend track record, AAPL is a proven performer.
				Future-Focused: Apple is investing heavily in cutting-edge technologies like AI, AR, and wearables, positioning itself for continued long-term growth.`
				: "",
			asset_class: isPostForm ? "" : "commodity",
			investment_name: isPostForm ? "" : " Apple Inc. (AAPL)",
			amount: isPostForm ? "" : "100020000",
			minimum_holding_period: isPostForm ? "" : "6 months",
			minimum_investable_amount: isPostForm ? "" : "2444231123",
			portfolio_weight: isPostForm ? "" : "10",
		},
	});

	const onSubmit = (values: InvestmentDetailsCommodity) => {
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
								control={form.control}
								name="isArchived"
								render={({ field }) => (
									<FormCard.Field
										className={`${isPostForm && "flex"} items-start`}
									>
										<FormCard.Label className={`${isPostForm && "hidden"}`}>
											Visibility Status
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

					<FormCard.Body>
						<FormCard.Title hasSeparator={false}>
							Investment Terms
						</FormCard.Title>

						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => {
								const { formatted } = getFormattedNairaInput(field.value);

								return (
									<FormCard.Field>
										<FormCard.Label>Amount</FormCard.Label>
										<div className="flex flex-row">
											<Input
												disabled={isViewForm}
												placeholder="Amount"
												className="text-[11px]"
												value={formatted}
												onChange={(e) => {
													const rawValue = e.target.value.replace(
														/[^0-9]/g,
														""
													);
													field.onChange(rawValue);
												}}
											/>
										</div>
									</FormCard.Field>
								);
							}}
						/>

						<FormField
							control={form.control}
							name="portfolio_weight"
							render={({ field }) => {
								return (
									<FormCard.Field>
										<FormCard.Label>Portfolio Weight (%)</FormCard.Label>
										<div className="flex flex-row relative">
											<Input
												disabled={isViewForm}
												className="text-[11px]"
												placeholder="Portfolio weight"
												value={isViewForm ? field.value + "%" : field.value}
												onChange={(e) => field.onChange(e.target.value)}
												// {...field}
											/>

											<span
												className={`${
													isViewForm && "hidden"
												} absolute right-3 top-1/2 -translate-y-1/2  text-[12px] text-disabled`}
											>
												%
											</span>
										</div>
									</FormCard.Field>
								);
							}}
						/>

						<FormField
							control={form.control}
							name="minimum_holding_period"
							render={({ field }) => {
								return (
									<FormCard.Field>
										<FormCard.Label>Minimum Holding Period</FormCard.Label>
										<Input
											placeholder="Minimum holding period"
											disabled={isViewForm}
											className="text-[11px]"
											{...field}
										/>
									</FormCard.Field>
								);
							}}
						/>

						<FormField
							control={form.control}
							name="minimum_investable_amount"
							render={({ field }) => {
								const { formatted } = getFormattedNairaInput(field.value);

								return (
									<FormCard.Field>
										<FormCard.Label>
											Minimum Investable Amount (grams)
										</FormCard.Label>
										<div className="flex flex-row">
											<Input
												disabled={isViewForm}
												className="text-[11px]"
												placeholder="Minimum investable amount"
												value={formatted}
												onChange={(e) => {
													const rawValue = e.target.value.replace(
														/[^0-9]/g,
														""
													);
													field.onChange(rawValue);
												}}
											/>
										</div>
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

export default InvestmentOfferDetailsCommodityForm;
