import amiUserApi from "@/core/api/user/ami/user.ami.api";
import { useQuery } from "@tanstack/react-query";
import { GetAllUserResponseAmi } from "../utils/types/user-response.ami.types";

export const useGetAllUsersQuery = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: () => amiUserApi.get(),
		select: (data): GetAllUserResponseAmi[] => {
			const userArray = data.data ?? [];

			return userArray;
		},
	});
};
