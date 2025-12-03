import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { BookingResponseSf } from "@/store-front/features/booking/utils/types/booking-response.sf.types";
import { BOOKING_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { BookingStatus } from "@/ami/shared/types/status.types";

interface BookingPDFExportProps {
	data: BookingResponseSf;
	buttonText?: string;
	buttonClassName?: string;
}

// TODO CHECK FOR IMPROVEMENT AND DO THE UPLOADING OF IMAGE
const BookingPDFExport: React.FC<BookingPDFExportProps> = ({
	data,
	buttonText = "📄 Export Booking PDF",
	buttonClassName = "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md",
}) => {
	const printRef = useRef<HTMLDivElement>(null);

	const handleExportPDF = async () => {
		if (!printRef.current) return;

		try {
			const button = document.querySelector(
				"[data-booking-export-btn]"
			) as HTMLButtonElement;
			if (button) {
				button.disabled = true;
				button.textContent = "Generating...";
			}

			const canvas = await html2canvas(printRef.current, {
				useCORS: true,
				allowTaint: true,
				background: "#ffffff",
				height: 1248,
				width: 816,
			});

			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4");

			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const pageHeight = 295; // A4 height in mm with margins
			const imgWidth = canvas.width;
			const imgHeight = canvas.height;

			// Calculate ratio to fit width
			const ratio = pdfWidth / imgWidth;
			const imgHeightMM = imgHeight * ratio;

			// Check if content fits in one page
			if (imgHeightMM <= pageHeight) {
				// Single page - fits perfectly
				pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeightMM);
			} else {
				// Multi-page - split content
				let heightLeft = imgHeightMM;
				let position = 0;

				// First page
				pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeightMM);
				heightLeft -= pageHeight;

				// Additional pages
				while (heightLeft > 0) {
					position = -(imgHeightMM - heightLeft);
					pdf.addPage();
					pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeightMM);
					heightLeft -= pageHeight;
				}
			}

			pdf.save(`Booking-${data.booking_reference}.pdf`);

			if (button) {
				button.disabled = false;
				button.textContent = buttonText;
			}
		} catch (error) {
			console.error("Error generating PDF:", error);
			alert("Failed to generate PDF. Please try again.");
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const formatTime = (dateString: string) => {
		return new Date(dateString).toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const formatCurrency = (amount: number) => {
		return `₱${amount.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})}`;
	};

	const getStatusColor = (status: BookingStatus) => {
		return BOOKING_STATUS_COLORS[status] || "#6b7280";
	};

	return (
		<>
			{/* Export Button */}
			<button
				data-booking-export-btn
				onClick={handleExportPDF}
				className={buttonClassName}
			>
				{buttonText}
			</button>

			{/* Hidden Printable Content - Bond Paper Style */}
			<div style={{ position: "absolute", left: "-9999px", top: "0" }}>
				<div
					ref={printRef}
					style={{
						width: "816px",
						minHeight: "1056px",
						padding: "60px 50px",
						backgroundColor: "#ffffff",
						fontFamily: "Arial, sans-serif",
						color: "#000000",
						fontSize: "12px",
					}}
				>
					{/* Header */}
					<div
						style={{
							borderBottom: "3px solid #1f2937",
							paddingBottom: "15px",
							marginBottom: "20px",
						}}
					>
						<h1
							style={{
								margin: "0",
								fontSize: "28px",
								fontWeight: "bold",
								color: "#1f2937",
							}}
						>
							BOOKING CONFIRMATION
						</h1>
						<p
							style={{
								margin: "5px 0 0 0",
								fontSize: "11px",
								color: "#6b7280",
							}}
						>
							Photography Booking System
						</p>
					</div>

					{/* Booking Reference Box */}
					<div
						style={{
							backgroundColor: "#f9fafb",
							padding: "15px",
							borderRadius: "8px",
							marginBottom: "20px",
							border: "1px solid #e5e7eb",
						}}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<div>
								<p
									style={{
										margin: "0 0 5px 0",
										fontSize: "10px",
										color: "#6b7280",
									}}
								>
									Booking Reference
								</p>
								<p
									style={{
										margin: "0",
										fontSize: "24px",
										fontWeight: "bold",
										color: "#1f2937",
									}}
								>
									{data.booking_reference}
								</p>
							</div>
							<div style={{ textAlign: "right" }}>
								<span
									style={{
										fontSize: "11px",
										fontWeight: "bold",
									}}
								>
									{data.status.toUpperCase()}
								</span>
							</div>
						</div>
					</div>

					{/* Two Column Layout */}
					<div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
						{/* Left Column - Customer Info */}
						<div style={{ flex: "1" }}>
							<h2
								style={{
									fontSize: "14px",
									fontWeight: "bold",
									color: "#1f2937",
									borderBottom: "2px solid #e5e7eb",
									paddingBottom: "8px",
									marginBottom: "12px",
									marginTop: "0",
								}}
							>
								Customer Information
							</h2>
							<div style={{ lineHeight: "1.8" }}>
								<div style={{ marginBottom: "8px" }}>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										Customer No.
									</p>
									<p
										style={{
											margin: "0",
											fontWeight: "bold",
											fontSize: "12px",
										}}
									>
										{data.customer_id.customer_no}
									</p>
								</div>
								<div style={{ marginBottom: "8px" }}>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										Full Name
									</p>
									<p
										style={{
											margin: "0",
											fontWeight: "bold",
											fontSize: "12px",
										}}
									>
										{data.customer_id.first_name} {data.customer_id.last_name}
									</p>
								</div>
								<div style={{ marginBottom: "8px" }}>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										Email
									</p>
									<p style={{ margin: "0", fontSize: "11px" }}>
										{data.customer_id.email}
									</p>
								</div>
								<div style={{ marginBottom: "8px" }}>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										Mobile
									</p>
									<p style={{ margin: "0", fontSize: "11px" }}>
										{data.customer_id.mobile_number}
									</p>
								</div>
								{data.customer_id.address && (
									<div>
										<p
											style={{
												margin: "0",
												fontSize: "10px",
												color: "#6b7280",
											}}
										>
											Address
										</p>
										<p
											style={{
												margin: "0",
												fontSize: "11px",
												lineHeight: "1.4",
											}}
										>
											{data.customer_id.address}
											{data.customer_id.barangay &&
												`, ${data.customer_id.barangay}`}
											<br />
											{data.customer_id.city && `${data.customer_id.city}, `}
											{data.customer_id.province} {data.customer_id.postal_code}
										</p>
									</div>
								)}
							</div>
						</div>

						{/* Right Column - Booking Details */}
						<div style={{ flex: "1" }}>
							<h2
								style={{
									fontSize: "14px",
									fontWeight: "bold",
									color: "#1f2937",
									borderBottom: "2px solid #e5e7eb",
									paddingBottom: "8px",
									marginBottom: "12px",
									marginTop: "0",
								}}
							>
								Booking Details
							</h2>
							<div style={{ lineHeight: "1.8" }}>
								<div style={{ marginBottom: "8px" }}>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										Booking Date
									</p>
									<p
										style={{
											margin: "0",
											fontWeight: "bold",
											fontSize: "12px",
										}}
									>
										{formatDate(data.booking_date)}
									</p>
								</div>
								<div style={{ marginBottom: "8px" }}>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										Time Schedule
									</p>
									<p
										style={{
											margin: "0",
											fontWeight: "bold",
											fontSize: "12px",
										}}
									>
										{data.start_time} - {data.end_time}
									</p>
								</div>
								<div style={{ marginBottom: "8px" }}>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										Duration
									</p>
									<p style={{ margin: "0", fontSize: "11px" }}>
										{data.session_duration_minutes} minutes
									</p>
								</div>
								<div style={{ marginBottom: "8px" }}>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										Location
									</p>
									<p
										style={{ margin: "0", fontSize: "11px", fontWeight: "600" }}
									>
										{data.location}
									</p>
								</div>
								{data.theme && (
									<div style={{ marginBottom: "8px" }}>
										<p
											style={{
												margin: "0",
												fontSize: "10px",
												color: "#6b7280",
											}}
										>
											Theme
										</p>
										<p style={{ margin: "0", fontSize: "11px" }}>
											{data.theme}
										</p>
									</div>
								)}
								{data.booking_confirmed_at && (
									<div>
										<p
											style={{
												margin: "0",
												fontSize: "10px",
												color: "#6b7280",
											}}
										>
											Confirmed At
										</p>
										<p style={{ margin: "0", fontSize: "10px" }}>
											{formatDate(data.booking_confirmed_at)}{" "}
											{formatTime(data.booking_confirmed_at)}
										</p>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Photographer Section */}
					{data.photographer_id && (
						<div style={{ marginBottom: "20px" }}>
							<h2
								style={{
									fontSize: "14px",
									fontWeight: "bold",
									color: "#1f2937",
									borderBottom: "2px solid #e5e7eb",
									paddingBottom: "8px",
									marginBottom: "12px",
									marginTop: "0",
								}}
							>
								Assigned Photographer
							</h2>
							<div
								style={{
									backgroundColor: "#f9fafb",
									padding: "12px",
									borderRadius: "6px",
									border: "1px solid #e5e7eb",
								}}
							>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "8px",
									}}
								>
									<div>
										<p
											style={{
												margin: "0",
												fontSize: "10px",
												color: "#6b7280",
											}}
										>
											Photographer Name
										</p>
										<p
											style={{
												margin: "0",
												fontWeight: "bold",
												fontSize: "13px",
											}}
										>
											{data.photographer_id.name}
										</p>
									</div>
									<div style={{ textAlign: "right" }}>
										<p
											style={{
												margin: "0",
												fontSize: "10px",
												color: "#6b7280",
											}}
										>
											Contact
										</p>
										<p style={{ margin: "0", fontSize: "11px" }}>
											{data.photographer_id.mobile_number}
										</p>
									</div>
								</div>
								<p style={{ margin: "0", fontSize: "11px", color: "#6b7280" }}>
									Email: {data.photographer_id.email}
								</p>
								{data.photographer_id.specialties &&
									data.photographer_id.specialties.length > 0 && (
										<p
											style={{
												margin: "5px 0 0 0",
												fontSize: "10px",
												color: "#6b7280",
											}}
										>
											Specialties: {data.photographer_id.specialties.join(", ")}
										</p>
									)}
							</div>
						</div>
					)}

					{/* Services Table */}
					<div style={{ marginBottom: "20px" }}>
						<h2
							style={{
								fontSize: "14px",
								fontWeight: "bold",
								color: "#1f2937",
								borderBottom: "2px solid #e5e7eb",
								paddingBottom: "8px",
								marginBottom: "12px",
								marginTop: "0",
							}}
						>
							Booked Services
						</h2>
						<table style={{ width: "100%", borderCollapse: "collapse" }}>
							<thead>
								<tr style={{ backgroundColor: "#f3f4f6" }}>
									<th
										style={{
											textAlign: "left",
											padding: "10px 8px",
											fontSize: "11px",
											fontWeight: "600",
											borderBottom: "1px solid #e5e7eb",
										}}
									>
										Service Name
									</th>
									<th
										style={{
											textAlign: "center",
											padding: "10px 8px",
											fontSize: "11px",
											fontWeight: "600",
											borderBottom: "1px solid #e5e7eb",
										}}
									>
										Category
									</th>
									<th
										style={{
											textAlign: "center",
											padding: "10px 8px",
											fontSize: "11px",
											fontWeight: "600",
											borderBottom: "1px solid #e5e7eb",
										}}
									>
										Qty
									</th>
									<th
										style={{
											textAlign: "right",
											padding: "10px 8px",
											fontSize: "11px",
											fontWeight: "600",
											borderBottom: "1px solid #e5e7eb",
										}}
									>
										Price
									</th>
									<th
										style={{
											textAlign: "right",
											padding: "10px 8px",
											fontSize: "11px",
											fontWeight: "600",
											borderBottom: "1px solid #e5e7eb",
										}}
									>
										Total
									</th>
								</tr>
							</thead>
							<tbody>
								{data.services.map((service, index) => (
									<tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
										<td style={{ padding: "10px 8px", fontSize: "11px" }}>
											<div style={{ fontWeight: "600" }}>
												{service.service_id.name}
											</div>
											{service.duration_minutes && (
												<div style={{ fontSize: "10px", color: "#6b7280" }}>
													{service.duration_minutes} min
												</div>
											)}
										</td>
										<td
											style={{
												padding: "10px 8px",
												fontSize: "11px",
												textAlign: "center",
												color: "#6b7280",
											}}
										>
											{service.service_id.category}
										</td>
										<td
											style={{
												padding: "10px 8px",
												fontSize: "11px",
												textAlign: "center",
												fontWeight: "600",
											}}
										>
											{service.quantity}
										</td>
										<td
											style={{
												padding: "10px 8px",
												fontSize: "11px",
												textAlign: "right",
											}}
										>
											{formatCurrency(service.price_per_unit)}
										</td>
										<td
											style={{
												padding: "10px 8px",
												fontSize: "11px",
												textAlign: "right",
												fontWeight: "600",
											}}
										>
											{formatCurrency(service.total_price)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Pricing Summary */}
					<div
						style={{
							backgroundColor: "rgba(132, 110, 98, 0.2)",
							border: "2px solid #846e62",
							padding: "15px",
							borderRadius: "8px",
							marginBottom: "20px",
						}}
					>
						<h2
							style={{
								fontSize: "14px",
								fontWeight: "bold",
								color: "#846e62",
								marginTop: "0",
								marginBottom: "12px",
							}}
						>
							Pricing Summary
						</h2>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "6px",
							}}
						>
							<span style={{ fontSize: "12px", color: "#846e62" }}>
								Subtotal:
							</span>
							<span
								style={{
									fontSize: "12px",
									fontWeight: "600",
									color: "#846e62",
								}}
							>
								{formatCurrency(data.total_amount)}
							</span>
						</div>
						{data.discount_amount > 0 && (
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "6px",
								}}
							>
								<span style={{ fontSize: "12px", color: "#846e62" }}>
									Discount:
								</span>
								<span
									style={{
										fontSize: "12px",
										fontWeight: "600",
										color: "#846e62",
									}}
								>
									-{formatCurrency(data.discount_amount)}
								</span>
							</div>
						)}
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								paddingTop: "8px",
								borderTop: "2px solid #846e62",
								marginTop: "8px",
							}}
						>
							<span
								style={{
									fontSize: "14px",
									fontWeight: "bold",
									color: "#846e62",
								}}
							>
								Final Amount:
							</span>
							<span
								style={{
									fontSize: "16px",
									fontWeight: "bold",
									color: "#846e62",
								}}
							>
								{formatCurrency(data.final_amount)}
							</span>
						</div>
					</div>

					{/* Payment Status */}
					{data.payment_status && (
						<div style={{ marginBottom: "20px" }}>
							<h2
								style={{
									fontSize: "14px",
									fontWeight: "bold",
									color: "#1f2937",
									borderBottom: "2px solid #e5e7eb",
									paddingBottom: "8px",
									marginBottom: "12px",
									marginTop: "0",
								}}
							>
								Payment Status
							</h2>
							<div
								style={{
									backgroundColor: data.payment_status.is_payment_complete
										? "#d1fae5"
										: "#fef3c7",
									border: `2px solid ${
										data.payment_status.is_payment_complete
											? "#10b981"
											: "#f59e0b"
									}`,
									padding: "12px",
									borderRadius: "6px",
								}}
							>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "6px",
									}}
								>
									<span style={{ fontSize: "11px", color: "#374151" }}>
										Amount Paid:
									</span>
									<span
										style={{
											fontSize: "12px",
											fontWeight: "600",
											color: "#10b981",
										}}
									>
										{formatCurrency(data.payment_status.amount_paid)}
									</span>
								</div>
								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<span style={{ fontSize: "11px", color: "#374151" }}>
										Remaining Balance:
									</span>
									<span
										style={{
											fontSize: "12px",
											fontWeight: "600",
											color:
												data.payment_status.remaining_balance > 0
													? "#ef4444"
													: "#10b981",
										}}
									>
										{formatCurrency(data.payment_status.remaining_balance)}
									</span>
								</div>
								<div style={{ marginTop: "10px", textAlign: "center" }}>
									<span
										style={{
											fontSize: "11px",
											fontWeight: "bold",
											color: data.payment_status.is_payment_complete
												? "#047857"
												: "#b45309",
										}}
									>
										{data.payment_status.is_payment_complete ? (
											"✓ FULLY PAID"
										) : (
											<>
												{data.payment_status.is_partially_paid
													? "⚠ PARTIALLY PAID"
													: ""}
											</>
										)}
									</span>
								</div>
							</div>
						</div>
					)}

					{/* Special Requests */}
					{data.special_requests && (
						<div style={{ marginBottom: "20px" }}>
							<h2
								style={{
									fontSize: "14px",
									fontWeight: "bold",
									color: "#1f2937",
									borderBottom: "2px solid #e5e7eb",
									paddingBottom: "8px",
									marginBottom: "12px",
									marginTop: "0",
								}}
							>
								Special Requests
							</h2>
							<p
								style={{
									margin: "0",
									padding: "12px",
									backgroundColor: "#fffbeb",
									border: "1px solid #fbbf24",
									borderRadius: "6px",
									fontSize: "11px",
									lineHeight: "1.6",
								}}
							>
								{data.special_requests}
							</p>
						</div>
					)}

					{/* Footer */}
					<div
						style={{
							marginTop: "30px",
							paddingTop: "15px",
							borderTop: "2px solid #e5e7eb",
							textAlign: "center",
							fontSize: "10px",
							color: "#6b7280",
						}}
					>
						<p style={{ margin: "0 0 5px 0" }}>
							This is a computer-generated booking confirmation and does not
							require a signature.
						</p>
						<p style={{ margin: "0" }}>
							Generated on {formatDate(new Date().toISOString())} at{" "}
							{formatTime(new Date().toISOString())}
						</p>
						<p
							style={{
								margin: "8px 0 0 0",
								fontWeight: "bold",
								color: "#1f2937",
							}}
						>
							Photography Booking System
						</p>
						<p style={{ margin: "5px 0 0 0", fontSize: "9px" }}>
							For inquiries, please contact us through the provided customer
							support channels.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default BookingPDFExport;
