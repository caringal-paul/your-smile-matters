import { BookingModel } from "@/core/models/booking.model";
import { CustomerModel } from "@/core/models/customer.model";
import { TransactionModel } from "@/core/models/transaction.model";

export type TransactionResponse = Omit<
	TransactionModel,
	"booking_id" | "customer_id"
> & {
	booking_id: BookingModel;
	customer_id: CustomerModel;
};
