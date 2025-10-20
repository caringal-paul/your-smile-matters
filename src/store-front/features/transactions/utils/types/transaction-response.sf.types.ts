import { BookingModel } from "@/core/models/booking.model";
import { CustomerModel } from "@/core/models/customer.model";
import { TransactionModel } from "@/core/models/transaction.model";
import { UserModel } from "@/core/models/user.model";
import { TransactionResponse } from "@/core/types/base-response.types";

export type TransactionGetByIdResponse = Omit<
	TransactionResponse,
	"updated_by"
> & {
	updated_by: UserModel;
};
