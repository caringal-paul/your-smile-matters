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
import { formatToNaira } from "@/ami/shared/helpers/formatCurrency";

import {
	InvestmentDetailsEquity,
	InvestmentDetailsEquitySchema,
} from "../utils/schemas/investment-details-equity.schema";
import SelectArrowIcon from "@/ami/shared/assets/icons/SelectArrowIcon";

const InvestmentOfferDetailsEquityForm = () => {
	const location = useLocation();
	const isPostForm =
		!location.pathname.includes("view") && !location.pathname.includes("edit");

	const isViewForm = location.pathname.includes("view");

	const form = useForm<InvestmentDetailsEquity>({
		resolver: zodResolver(InvestmentDetailsEquitySchema),
		mode: "onChange",
		defaultValues: {
			isArchived: isViewForm ? false : false,
			description: !isPostForm
				? `By purchasing shares of Apple stock, investors become partial owners of the company. As a leading technology giant, Apple offers potential for long-term growth, along with the possibility of dividends.

				Market Leader: Apple’s iconic products – from iPhones to MacBooks – continue to drive growth and global demand.
				Strong Financials: With robust revenue, consistent profit growth, and a solid dividend track record, AAPL is a proven performer.
				Future-Focused: Apple is investing heavily in cutting-edge technologies like AI, AR, and wearables, positioning itself for continued long-term growth.`
				: "",
		},
	});

	const onSubmit = (values: InvestmentDetailsEquity) => {
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

						<FormCard.Field>
							<FormCard.Label>Investment Name</FormCard.Label>
							<Label className="text-[11px] font-normal">
								Apple Inc. (AAPL) Stock
							</Label>
						</FormCard.Field>

						<FormCard.Field>
							<FormCard.Label>Asset Class</FormCard.Label>
							<Label className="text-[11px] font-normal">Equity</Label>
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

					<FormCard.Body className="grid grid-cols-2">
						<div className="col-span-2">
							<FormCard.Title hasSeparator={false}>
								Investment Terms
							</FormCard.Title>
						</div>

						<div className="col-span-2 sm:col-span-1 space-y-4">
							<FormCard.Field>
								<FormCard.Label>Market Price</FormCard.Label>
								<Label className="text-[11px] font-normal">
									{formatToNaira("471454.50")}
								</Label>
							</FormCard.Field>
							<FormCard.Field>
								<FormCard.Label>Price Change</FormCard.Label>
								<Label className="text-[11px] font-normal">
									<div className="text-[11px] flex items-center gap-1">
										<SelectArrowIcon
											className={`rotate-180 h-3 w-3`}
											// className={`${
											// 	value.direction == "up" && "rotate-180"
											// } h-3 w-3`}
											// fill={value.direction == "up" ? "#22c55e" : "#ef4444"}
											fill={"#22c55e"}
										/>{" "}
										1.35
									</div>
								</Label>
							</FormCard.Field>
							<FormCard.Field>
								<FormCard.Label>Price per Unit</FormCard.Label>
								<Label className="text-[11px] font-normal">
									{formatToNaira("9250")}
								</Label>
							</FormCard.Field>
						</div>

						<div className="col-span-2 sm:col-span-1 space-y-4">
							<FormCard.Field>
								<FormCard.Label>Total Units</FormCard.Label>
								<Label className="text-[11px] font-normal">2,740</Label>
							</FormCard.Field>
							<FormCard.Field>
								<FormCard.Label>Available Units</FormCard.Label>
								<Label className="text-[11px] font-normal">2,500</Label>
							</FormCard.Field>
							<FormCard.Field>
								<FormCard.Label>Units Bought</FormCard.Label>
								<Label className="text-[11px] font-normal">240</Label>
							</FormCard.Field>
						</div>
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

export default InvestmentOfferDetailsEquityForm;
