import { Column } from "@/core/types/column.types";
import { MyBookingsSfTableType } from "../types/my-bookings-table.sf.types";
import { useNavigate } from "react-router-dom";
import { formatToNormalDate } from "@/ami/shared/helpers/formatDate";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { Button } from "@/core/components/base/button";
import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";

export const useMyBookingColumns = (): Column<MyBookingsSfTableType>[] => {
	const navigate = useNavigate();

	const columns: Column<MyBookingsSfTableType>[] = [
		{
			key: "booking_reference",
			label: "Reference No",
			sortable: true,
			priority: 1,
			render: (value) => <DataTableRow className="font-light" value={value} />,
		},
		{
			key: "photographer_name",
			label: "Assigned Photographer",
			sortable: true,
			render: (value) => <DataTableRow className="font-light" value={value} />,
		},
		{
			key: "booking_date",
			label: "Booking Date",
			sortable: true,
			render: (_, row) => (
				<DataTableRow
					className="font-light"
					value={formatToNormalDate(row.booking_date)}
				/>
			),
		},
		{
			key: "booking_duration",
			label: "Booking Duration",
			sortable: true,
			render: (value) => (
				<DataTableRow className="font-light text-center" value={value} />
			),
		},
		{
			key: "final_amount",
			label: "Total Amount",
			sortable: true,
			render: (value) => (
				<DataTableRow
					className="font-light text-center"
					value={formatToPeso(String(value))}
				/>
			),
		},
		{
			key: "status",
			label: "Status",
			sortable: true,
			render: (value) => {
				return (
					<DataTableRow className="font-light text-center" value={value} />
				);
			},
		},
		{
			key: "location",
			label: "Location",
			sortable: true,
			render: (value) => <DataTableRow className="font-light" value={value} />,
		},
		{
			key: "action",
			label: "Actions",
			render: (_, row) => (
				<div className="flex">
					<Button
						variant="sf"
						onClick={() => {
							navigate(`booking/${row._id}/details`);

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
