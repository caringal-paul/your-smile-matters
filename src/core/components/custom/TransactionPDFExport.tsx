import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { TRANSACTION_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import { TransactionStatus } from "@/ami/shared/types/status.types";
import { TransactionGetByIdResponse } from "@/store-front/features/transactions/utils/types/transaction-response.sf.types";
import {
	formatDurationByHours,
	formatTime24to12,
} from "@/store-front/shared/helpers/formatDuration";

interface TransactionPDFExportProps {
	data: TransactionGetByIdResponse;
	buttonText?: string;
	buttonClassName?: string;
}

const TransactionPDFExport: React.FC<TransactionPDFExportProps> = ({
	data,
	buttonText = "Export PDF",
	buttonClassName = "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md",
}) => {
	const printRef = useRef<HTMLDivElement>(null);

	const handleExportPDF = async () => {
		if (!printRef.current) return;

		try {
			// Show loading indicator (optional)
			const button = document.querySelector(
				"[data-export-btn]"
			) as HTMLButtonElement;
			if (button) {
				button.disabled = true;
				button.textContent = "Generating...";
			}

			// Capture the content as canvas
			const canvas = await html2canvas(printRef.current, {
				useCORS: true,
				allowTaint: true,
				background: "#ffffff",
				height: 1248,
				width: 816,
			});

			// Create PDF
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4");

			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const imgWidth = canvas.width;
			const imgHeight = canvas.height;
			const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

			const imgX = (pdfWidth - imgWidth * ratio) / 2;
			const imgY = 5;

			pdf.addImage(
				imgData,
				"PNG",
				imgX,
				imgY,
				imgWidth * ratio,
				imgHeight * ratio
			);

			// Download with transaction reference as filename
			pdf.save(`Transaction-${data.transaction_reference}.pdf`);

			// Reset button
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

	const getStatusColor = (status: TransactionStatus) => {
		return TRANSACTION_STATUS_COLORS[status] || "#6b7280";
	};

	return (
		<>
			{/* Export Button */}
			<button
				data-export-btn
				onClick={handleExportPDF}
				className={buttonClassName}
			>
				{buttonText}
			</button>

			{/* Hidden Printable Content - Bond Paper Style (8.5" x 11") */}
			<div style={{ position: "absolute", left: "-9999px", top: "0" }}>
				<div
					ref={printRef}
					style={{
						width: "816px", // 8.5 inches at 96 DPI
						minHeight: "1056px", // 11 inches at 96 DPI
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
							TRANSACTION RECEIPT
						</h1>
						<p
							style={{
								margin: "5px 0 0 0",
								fontSize: "11px",
								color: "#6b7280",
							}}
						>
							Your Smile Matters Photography
						</p>
					</div>

					{/* Transaction Info Box */}
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
									Transaction Reference
								</p>
								<p
									style={{
										margin: "0",
										fontSize: "20px",
										fontWeight: "bold",
										color: "#1f2937",
									}}
								>
									{data.transaction_reference}
								</p>
							</div>
							<div style={{ textAlign: "right" }}>
								<span
									style={{
										display: "inline-block",
										padding: "6px 16px",
										borderRadius: "20px",
										backgroundColor: getStatusColor(
											data.status as TransactionStatus
										),
										color: "#ffffff",
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

						{/* Right Column - Transaction Details */}
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
								Transaction Details
							</h2>
							<div style={{ lineHeight: "1.8" }}>
								<div style={{ marginBottom: "8px" }}>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										Transaction Date
									</p>
									<p
										style={{
											margin: "0",
											fontWeight: "bold",
											fontSize: "12px",
										}}
									>
										{formatDate(data.transaction_date)}
									</p>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										{formatTime(data.transaction_date)}
									</p>
								</div>
								<div style={{ marginBottom: "8px" }}>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										Transaction Type
									</p>
									<p
										style={{
											margin: "0",
											fontWeight: "bold",
											fontSize: "12px",
										}}
									>
										{data.transaction_type}
									</p>
								</div>
								<div style={{ marginBottom: "8px" }}>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										Payment Method
									</p>
									<p
										style={{
											margin: "0",
											fontWeight: "bold",
											fontSize: "12px",
										}}
									>
										{data.payment_method}
									</p>
								</div>
								{data.external_reference && (
									<div style={{ marginBottom: "8px" }}>
										<p
											style={{
												margin: "0",
												fontSize: "10px",
												color: "#6b7280",
											}}
										>
											External Reference
										</p>
										<p style={{ margin: "0", fontSize: "11px" }}>
											{data.external_reference}
										</p>
									</div>
								)}
								{data.processed_at && (
									<div>
										<p
											style={{
												margin: "0",
												fontSize: "10px",
												color: "#6b7280",
											}}
										>
											Processed At
										</p>
										<p style={{ margin: "0", fontSize: "11px" }}>
											{formatDate(data.processed_at)}{" "}
											{formatTime(data.processed_at)}
										</p>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Related Booking */}
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
							Related Booking
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
									marginBottom: "10px",
								}}
							>
								<div>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										Booking Reference
									</p>
									<p
										style={{
											margin: "0",
											fontWeight: "bold",
											fontSize: "13px",
										}}
									>
										{data.booking_id.booking_reference}
									</p>
								</div>
								<div style={{ textAlign: "right" }}>
									<p
										style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}
									>
										Status
									</p>
									<p
										style={{
											margin: "0",
											fontWeight: "bold",
											fontSize: "12px",
											color: "#10b981",
										}}
									>
										{data.booking_id.status}
									</p>
								</div>
							</div>
							<div style={{ display: "flex", gap: "15px", fontSize: "11px" }}>
								<div>
									<p style={{ margin: "0", color: "#6b7280" }}>Date</p>
									<p style={{ margin: "0", fontWeight: "600" }}>
										{formatDate(data.booking_id.booking_date)}
									</p>
								</div>
								<div>
									<p style={{ margin: "0", color: "#6b7280" }}>Time</p>
									<p style={{ margin: "0", fontWeight: "600" }}>
										{formatTime24to12(data.booking_id.start_time)} -{" "}
										{formatTime24to12(data.booking_id.end_time)}
									</p>
								</div>
								<div>
									<p style={{ margin: "0", color: "#6b7280" }}>Location</p>
									<p style={{ margin: "0", fontWeight: "600" }}>
										{data.booking_id.location}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Amount Box - Highlighted */}
					<div
						style={{
							backgroundColor: "rgba(132, 110, 98, 0.2)",
							border: "2px solid #846e62",
							padding: "20px",
							borderRadius: "8px",
							marginBottom: "20px",
							textAlign: "center",
						}}
					>
						<p
							style={{
								margin: "0 0 5px 0",
								fontSize: "12px",
								color: "#846e62",
								fontWeight: "600",
							}}
						>
							TRANSACTION AMOUNT
						</p>
						<p
							style={{
								margin: "0",
								fontSize: "32px",
								fontWeight: "bold",
								color: "#846e62",
							}}
						>
							{formatCurrency(data.amount)}
						</p>
					</div>

					{/* Notes Section */}
					{data.notes && (
						<div
							style={{
								marginBottom: "20px",
							}}
						>
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
								Notes
							</h2>
							<div
								style={{
									margin: "0",
									padding: "12px",
									backgroundColor: "#c3bfbb",
									border: "1px solid #a7a29c",
									borderRadius: "6px",
									fontSize: "11px",
									lineHeight: "1.6",
								}}
							>
								{data.notes}
							</div>
						</div>
					)}

					{/* Processed By */}
					{data.updated_by && (
						<div style={{ marginBottom: "20px" }}>
							<p style={{ margin: "0", fontSize: "10px", color: "#6b7280" }}>
								Processed By
							</p>
							<p style={{ margin: "0", fontWeight: "bold", fontSize: "12px" }}>
								{data.updated_by.first_name} {data.updated_by.last_name}
							</p>
						</div>
					)}

					{/* Footer */}
					<div
						style={{
							marginTop: "40px",
							paddingTop: "15px",
							borderTop: "2px solid #e5e7eb",
							textAlign: "center",
							fontSize: "10px",
							color: "#6b7280",
						}}
					>
						<p style={{ margin: "0 0 5px 0" }}>
							This is a computer-generated receipt and does not require a
							signature.
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
							Your Smile Matters Photography
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default TransactionPDFExport;
