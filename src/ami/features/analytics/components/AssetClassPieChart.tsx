import { Pie, PieChart } from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/core/components/base/chart";

const chartData = [
	{ assetClass: "fixedIncome", value: 7746, fill: "var(--chart-1)" },
	{ assetClass: "equity", value: 4469, fill: "var(--chart-2)" },
	{ assetClass: "commodity", value: 2979, fill: "var(--chart-3)" },
];

const chartConfig = {
	fixedIncome: {
		label: "Fixed Income",
		color: "var(--chart-1)",
	},
	equity: {
		label: "Equity",
		color: "var(--chart-2)",
	},
	commodity: {
		label: "Commodity",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

type ChartLegendProps = {
	noOfInvestments: string;
	percentage: string;
	legendColor: string;
};

const ChartLegend = ({
	noOfInvestments,
	percentage,
	legendColor,
}: ChartLegendProps) => {
	return (
		<div className="flex gap-2 w-full">
			<div
				className={`${legendColor} h-2 w-2 sm:h-7 sm:w-[7px] rounded-none sm:rounded-full`}
			/>
			<div className="flex flex-col gap-1 justify-start sm:justify-center xl:justify-start 2xl:justify-center">
				<p className="text-[8px] sm:text-[10px]">{noOfInvestments}</p>
				<p className="text-[7px] sm:text-[9px]">{percentage}</p>
			</div>
		</div>
	);
};

// TODO PASS THE CHART DATA IN THIS COMPONENT
const AssetClassPieChartLegends = () => {
	return (
		<div className="h-fit sm:h-[300px] xl:h-fit 2xl:h-[300px] w-fit lg:w-[calc(100%-300px)] xl:w-fit flex sm:flex-col xl:flex-row 2xl:flex-col sm:items-center sm:justify-center tracking-tight leading-none gap-6 sm:pl-4">
			<ChartLegend
				legendColor="bg-chart-1"
				noOfInvestments="7,446 Investments"
				percentage="Fixed Income (50%)"
			/>

			<ChartLegend
				legendColor="bg-chart-2"
				noOfInvestments="4,469 Investments"
				percentage="Equity (30%)"
			/>

			<ChartLegend
				legendColor="bg-chart-3"
				noOfInvestments="2,979 Investments"
				percentage="Commodity (20%)"
			/>
		</div>
	);
};

export function AssetClassPieChart() {
	return (
		<div className="flex flex-col sm:flex-row xl:flex-col 2xl:flex-row items-center sm:justify-center">
			<div>
				<ChartContainer
					config={chartConfig}
					className="aspect-square max-h-[300px] w-[200px] sm:w-[280px] lg:w-[300px] xl:w-[230px] 2xl:w-[300px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="value"
							nameKey="assetClass"
							innerRadius={60}
						/>
					</PieChart>
				</ChartContainer>
			</div>

			<AssetClassPieChartLegends />
		</div>
	);
}
