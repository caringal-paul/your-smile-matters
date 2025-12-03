import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { BaseResponseDto } from "@/core/types/base.types";
import { CustomerSfUpdate } from "../utils/schema/customer-update.schema";
import { CustomerModel } from "@/core/models/customer.model";
import sfCustomerApi from "@/core/api/customer/store-front/customer.sf.api";
import { queryClient } from "@/core/lib/react-query/react-query-client";
import { useMyCredentials } from "@/store-front/store/useMyCredentials";

type UpdateCustomerProps = {
	customerId: string;
	payload: CustomerSfUpdate;
};

export const useUpdateCustomerMutation = () => {
	const setMyCredentials = useMyCredentials((state) => state.setMyCredentials);

	return useMutation({
		mutationFn: async ({ customerId, payload }: UpdateCustomerProps) => {
			const res: BaseResponseDto<CustomerModel> = await sfCustomerApi.update(
				customerId,
				payload
			);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to update your details.");
			}

			return res.data;
		},
		onSuccess: (data) => {
			toast.success("Profile updated successfully!");

			if (data) {
				setMyCredentials(data);
			}

			queryClient.invalidateQueries({
				queryKey: ["me-customer"],
				refetchType: "all",
			});
			queryClient.invalidateQueries({
				queryKey: ["customer-logged-in"],
				refetchType: "all",
			});
		},
		onError: (error: Error) => {
			console.error("❌ Failed to send Cancel request:", error);
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Mutation finished (success or error)");
		},
	});
};
