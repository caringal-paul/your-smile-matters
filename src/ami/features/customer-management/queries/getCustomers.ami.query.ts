import { useQuery } from "@tanstack/react-query";
import { GetAllCustomerResponseAmi } from "../utils/types/customer-response.ami.types";
import amiCustomerApi from "@/core/api/customer/ami/customer.ami.api";

export const useGetAllCustomersQuery = () => {
	return useQuery({
		queryKey: ["customers"],
		queryFn: () => amiCustomerApi.get(),
		select: (data): GetAllCustomerResponseAmi[] => {
			const customerArray = data.data ?? [];

			return customerArray;
		},
	});
};
