import CalendarIcon from "@/ami/shared/assets/icons/CalendarIcon";
import InfoIcon from "@/ami/shared/assets/icons/InfoIcon";
import { Button } from "@/core/components/base/button";
import { formatToNaira } from "@/ami/shared/helpers/formatCurrency";

import { Suspense, useState } from "react";
import { AssetClassPieChart } from "../components/AssetClassPieChart";

type BasicCardProps = {
	value: string;
	description: string;
	title: string;
	className: string;
};

const BasicCard = ({
	className,
	description,
	title,
	value,
}: BasicCardProps) => {
	return (
		<div
			className={`h-[120px] w-full shadow-md border-[1px] p-4 rounded-lg  space-y-2 flex flex-col justify-between ${className}`}
		>
			<div>
				<h3 className="text-sm font-semibold">{title}</h3>
				<p className="text-[10px] text-gray-400">{description}</p>
			</div>
			<h1 className="text-2xl font-bold">{value}</h1>
		</div>
	);
};

const DashboardPage = () => {
	const [selectedRange, setSelectedRange] = useState<string | null>(null);

	const options = ["YTD", "MTD", "Today", "Custom"];

	const handleClick = (option: string) => {
		setSelectedRange((prev) => (prev === option ? null : option));
	};

	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth();

	// Get dynamic dates
	const jan1 = new Date(year, 0, 1);
	const monthStart = new Date(year, month, 1);

	const formatDate = (date: Date) =>
		new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}).format(date);

	const rangeMessageMap: Record<string, string> = {
		YTD: `Displaying data from ${formatDate(jan1)} – ${formatDate(today)}.`,
		MTD: `Displaying data from ${formatDate(monthStart)} – ${formatDate(
			today
		)}.`,
		Today: `Displaying data for ${formatDate(today)} only.`,
		Custom: "Displaying data from custom date range.",
	};

	const infoMessage = selectedRange
		? rangeMessageMap[selectedRange]
		: "Displaying all data.";

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className="space-y-4">
				<div className="flex gap-0 sm:gap-1 overflow-x-scroll scrollbar-small">
					{options.map((option) => (
						<Button
							key={option}
							onClick={() => handleClick(option)}
							className={`flex text-sm gap-1 h-fit w-fit py-[4px] px-3 rounded-full border-2 [&_svg]:size-5 
								${
									selectedRange === option
										? "border-[#201F1F] bg-accent"
										: "border-transparent bg-transparent"
								}
								text-foreground shadow-none hover:bg-accent`}
						>
							<CalendarIcon className="h-6 w-6" />
							{option}
						</Button>
					))}
				</div>

				<div className="flex bg-accent text-[10px] md:text-xs gap-2 my-4 md:mt-0 md:mb-4 p-3 items-center rounded-md">
					<InfoIcon fill={"#1C1B1F"} className="h-3 w-3 md:h-4 md:w-4" />
					{infoMessage}
				</div>

				<div className="grid grid-cols-6 gap-4 pb-4 h-fit">
					{/* CARD 1 - 4 */}
					{/* TODO CHANGE THIS TO LOOPING BASED ON DATA */}
					<BasicCard
						className="row-span-1 col-span-6 sm:col-span-3 lg:col-span-3 2xl:col-span-1"
						description="Total registered users in the app"
						title="Total Customers"
						value="2,200"
					/>
					<BasicCard
						className="row-span-1 col-span-6 sm:col-span-3 lg:col-span-3 2xl:col-span-1"
						description="Total investment brands available"
						title="Total Brands"
						value="85"
					/>
					<BasicCard
						className="row-span-1 col-span-6 sm:col-span-3 lg:col-span-3 2xl:col-span-2"
						description="Total investment of all customers"
						title="Total Investment Value"
						value={`${formatToNaira("250000000")}`}
					/>
					<BasicCard
						className="row-span-1 col-span-6 sm:col-span-3 lg:col-span-3 2xl:col-span-2"
						description="Total no. of investments across all customers"
						title="Total Investment Count"
						value={`14,892`}
					/>

					{/* CARD 5 */}
					<div className=" w-full shadow-md border-[1px] p-4 rounded-lg row-span-3 col-span-6 lg:col-span-3  space-y-2 flex flex-col h-fit">
						<div>
							<h3 className="text-sm font-semibold">
								Asset Class Distribution
							</h3>
							<p className="text-[10px] text-gray-400">
								This chart represents the breakdown of investments by asset
								class
							</p>
						</div>
						<div className="max-h-[325px] h-full">
							<AssetClassPieChart />
						</div>
					</div>

					{/* CARD 6 */}
					<div className=" w-full shadow-md border-[1px] p-4 rounded-lg row-span-6 col-span-6 lg:col-span-3 space-y-6 flex flex-col">
						<div>
							<h3 className="text-sm font-semibold">
								Top 10 Investments Brands
							</h3>
							<p className="text-[10px] text-gray-400">
								Top-performing brands based on customer investments
							</p>
						</div>
						<div className="flex flex-col overflow-scroll max-h-[630px] h-full">
							{Array.from({ length: 10 }, (_, index) => (
								<div
									key={index}
									className={`p-4 ${
										index % 2 === 0 ? "bg-accent" : "bg-transparent"
									}`}
								>
									<div className="flex gap-4 text-[11px] items-center w-full font-semibold">
										<div>{index + 1}</div>

										<div className="flex flex-col gap-1 w-full">
											<div className="flex w-full justify-between">
												Apple (50%)
												<span>{formatToNaira("500000")}</span>
											</div>
											<div
												className={`h-[10px] w-[50%] bg-gradient rounded-xs`}
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* CARD 7 */}
					<div className=" w-full shadow-md border-[1px] p-4 rounded-lg row-span-3 col-span-6 lg:col-span-3 space-y-2 flex flex-col">
						<div>
							<h3 className="text-sm font-semibold">Top 5 Customers</h3>
							<p className="text-[10px] text-gray-400">
								Top 5 customers with the highest total investment value
							</p>
						</div>
						<div className="flex flex-col overflow-scroll max-h-[300px] h-full">
							{Array.from({ length: 5 }, (_, index) => (
								<div
									key={index}
									className={`p-4 ${
										index % 2 === 0 ? "bg-accent" : "bg-transparent"
									}`}
								>
									<div className="flex gap-4 text-[11px] items-center w-full font-semibold">
										<div className="">{index + 1}</div>

										<div className="flex w-full justify-between">
											Jamir Esteseun
											<span>{formatToNaira("500000")}</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	);
};

export default DashboardPage;
