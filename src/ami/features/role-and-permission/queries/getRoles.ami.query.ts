import amiUserApi from "@/core/api/user/ami/user.ami.api";
import { useQuery } from "@tanstack/react-query";
import amiRoleApi from "@/core/api/role/ami/role.ami.api";
import { GetAllRolesResponseAmi } from "../utils/types/role-response.ami.types";

export const useGetAllRolesQuery = () => {
	return useQuery({
		queryKey: ["roles"],
		queryFn: () => amiRoleApi.get(),
		select: (data): GetAllRolesResponseAmi[] => {
			const userArray = data.data ?? [];

			return userArray;
		},
	});
};
