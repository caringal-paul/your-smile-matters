import { Column } from "@/core/types/column.types";
import { useNavigate } from "react-router-dom";
import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";
import { Button } from "@/core/components/base/button";
import { MyTransactionsSfTableType } from "../types/my-transactions-table.sf.types";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/core/components/base/tooltip";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { HandCoins, SmartphoneNfc } from "lucide-react";
import { formatToNormalDate } from "@/ami/shared/helpers/formatDate";

export const useMyTransactionsColumns =
	(): Column<MyTransactionsSfTableType>[] => {
		const navigate = useNavigate();

		const columns: Column<MyTransactionsSfTableType>[] = [
			{
				key: "transaction_reference",
				label: "Transaction Ref No.",
				sortable: true,
				priority: 1,
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "booking_reference",
				label: "Booking Ref No.",
				sortable: true,
				render: (_, row) => (
					<Tooltip delayDuration={200}>
						<TooltipTrigger asChild className="cursor-pointer">
							<Button
								variant="link"
								size="link"
								onClick={() => {
									navigate(
										`/profile/my-bookings/booking/${row.booking_id._id}/details`
									);
								}}
							>
								{row.booking_reference}
							</Button>
						</TooltipTrigger>
						<TooltipContent
							className="text-white bg-admin-secondary text-3xs"
							side="right"
							sideOffset={5}
							align="end"
							alignOffset={10}
						>
							<p>View Booking?</p>
						</TooltipContent>
					</Tooltip>
				),
			},
			{
				key: "booking_status",
				label: "Booking Status",
				sortable: true,
				render: (value) => (
					<DataTableRow
						value={value}
						className="line-clamp-4 text-ellipsis overflow-hidden font-light"
					/>
				),
			},
			{
				key: "status",
				label: "Transactions Status",
				sortable: true,
				render: (value) => (
					<DataTableRow
						value={value}
						className="line-clamp-4 text-ellipsis overflow-hidden font-light"
					/>
				),
			},

			{
				key: "transaction_type",
				label: "Transaction Type",
				sortable: true,
				render: (value) => (
					<DataTableRow
						value={value}
						className="line-clamp-4 text-ellipsis overflow-hidden font-light"
					/>
				),
			},
			{
				key: "amount",
				label: "Amount",
				sortable: true,
				render: (value) => (
					<DataTableRow
						value={formatToPeso(String(value))}
						className="line-clamp-4 text-ellipsis overflow-hidden font-light whitespace-nowrap"
					/>
				),
			},
			{
				key: "payment_method",
				label: "Payment Method",
				sortable: true,
				render: (_, row) => (
					// <DataTableRow
					// 	value={value}
					// 	className="line-clamp-4 text-ellipsis overflow-hidden font-light"
					// />
					<div
						className={
							"font-normal text-2xs 2xl:text-xs truncate flex flex-row items-center gap-1"
						}
					>
						{row.payment_method == "Cash" ? (
							<HandCoins className="size-3 2xl:size-4" />
						) : (
							<SmartphoneNfc className="size-3 2xl:size-4" />
						)}
						{row.payment_method}
					</div>
				),
			},
			{
				key: "external_reference",
				label: "External Reference",
				sortable: true,
				render: (value) => (
					<DataTableRow
						value={!value ? "N/A" : value}
						className="line-clamp-4 text-ellipsis overflow-hidden font-light"
					/>
				),
			},
			{
				key: "processed_at",
				label: "Processed At",
				sortable: true,
				render: (value) => (
					<DataTableRow
						value={value ? formatToNormalDate(String(value)) : "N/A"}
						className="line-clamp-4 text-ellipsis overflow-hidden font-light whitespace-nowrap"
					/>
				),
			},

			{
				key: "action",
				label: "Actions",
				render: (_, row) => (
					<div className="flex">
						<Button
							variant="sf"
							onClick={() => {
								navigate(`transaction/${row._id}/details`);

								// try {
								// 	const totalServicesPrice = row.services.reduce(
								// 		(total, service) =>
								// 			total + service.price_per_unit * service.quantity,
								// 		0
								// 	);

								// 	const hasCustomPackagePrice =
								// 		(row.package_id?.package_price || 0 > 0) &&
								// 		!!row?.package_id?.package_price;

								// 	const initialData: BookingFormData = {
								// 		services: row.services.map((service) => ({
								// 			_id: service.service_id._id,
								// 			quantity: service.quantity,
								// 			price_per_unit: service.price_per_unit,
								// 			total_price: service.total_price,
								// 			duration_minutes: service.duration_minutes,
								// 		})),

								// 		is_customized: row.is_customized,
								// 		customer_id: row?.customer_id._id,
								// 		customization_notes: row.customization_notes,
								// 		package_id: row.package_id?._id ?? "",

								// 		booking_date: formatToUtc(new Date(row.booking_date)),
								// 		start_time: row.start_time,
								// 		end_time: row.end_time,
								// 		session_duration_minutes: row.session_duration_minutes,
								// 		location: row.location,

								// 		photographer_id: row.photographer_id._id,
								// 		photographer_name: row.photographer_name,
								// 		theme: row.theme,
								// 		special_requests: row.special_requests,

								// 		old_amount: hasCustomPackagePrice
								// 			? totalServicesPrice
								// 			: undefined,
								// 		total_amount: hasCustomPackagePrice
								// 			? row.package_id?.package_price ?? 0
								// 			: totalServicesPrice,
								// 		discount_amount: row.discount_amount,
								// 		promo_id: row.promo_id?._id ?? undefined,
								// 		final_amount: hasCustomPackagePrice
								// 			? row.package_id?.package_price ?? 0
								// 			: totalServicesPrice,

								// 		is_booking_sent: true,
								// 		status: row.status,
								// 		booking_reference: row.booking_reference,
								// 	};

								// 	// Manually wrap synchronous functions into Promises
								// 	await new Promise<void>((resolve) => {
								// 		saveOriginalForm(initialData);
								// 		resolve();
								// 	});

								// 	await new Promise<void>((resolve) => {
								// 		setStepValid("step1", true);
								// 		setStepValid("step2", true);
								// 		setStepValid("step3", true);
								// 		setStepValid("step4", true);

								// 		resolve();
								// 	});

								// 	// WORKON JUST CREATE NEW PAGE FOR BOOKING DETAILS
								// 	openModal();

								// 	gotoStep(4);
								// } catch (error) {
								// 	console.error("Error preparing booking data:", error);
								// }
							}}
						>
							Details
							{/* <EyeIcon fill="#1C1B1F" className="mt-[1px]" /> */}
						</Button>
					</div>
				),
			},
		];

		return columns;
	};
