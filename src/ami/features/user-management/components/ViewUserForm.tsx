import { useNavigate, useParams } from "react-router-dom";

import FormCard from "@/ami/shared/components/card/FormCard";
import { Label } from "@/core/components/base/label";
import { Badge } from "@/core/components/base/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/core/components/base/tooltip";
import { useGetUserByIdQuery } from "../queries/getUserById.ami.query";

const ViewUserForm = () => {
	const { id } = useParams();

	const { data: userWithRoleAndPermissions, isLoading } = useGetUserByIdQuery(
		id!
	);

	const navigate = useNavigate();

	if (isLoading) {
		return <>Loading</>;
	}

	return (
		<FormCard>
			<FormCard.Body className="mt-0 mb-2 space-y-4">
				<FormCard.Title>User Information</FormCard.Title>

				<FormCard.Field>
					<FormCard.Label>Full Name</FormCard.Label>
					<Label className="font-normal text-2xs">
						{userWithRoleAndPermissions?.first_name}{" "}
						{userWithRoleAndPermissions?.last_name}
					</Label>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label>Assigned Role</FormCard.Label>
					<Label className="font-normal text-2xs">
						<Tooltip delayDuration={200}>
							<TooltipTrigger asChild className="cursor-pointer">
								<Badge
									onClick={() => {
										navigate(
											`/admin/ami/role-and-permission-management/roles-and-permissions/edit/${userWithRoleAndPermissions?.role_id}`
										);
									}}
								>
									{userWithRoleAndPermissions?.role_and_permissions?.name}
								</Badge>
							</TooltipTrigger>
							<TooltipContent className="text-white bg-admin-secondary text-3xs">
								<p>Click to view role permissions</p>
							</TooltipContent>
						</Tooltip>
					</Label>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label>Username</FormCard.Label>
					<Label className="font-normal text-2xs">
						{userWithRoleAndPermissions?.username}
					</Label>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label>Email</FormCard.Label>
					<Label className="font-normal text-2xs">
						{userWithRoleAndPermissions?.email}
					</Label>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label>Mobile Number</FormCard.Label>
					<Label className="font-normal text-2xs">
						{userWithRoleAndPermissions?.mobile_number}
					</Label>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label>Account Status</FormCard.Label>

					<Badge className="w-fit">
						<Label className={`font-normal text-2xs`}>
							{userWithRoleAndPermissions?.is_active ? "Active" : "Inactive"}
						</Label>
					</Badge>
				</FormCard.Field>
			</FormCard.Body>
		</FormCard>
	);
};

export default ViewUserForm;
