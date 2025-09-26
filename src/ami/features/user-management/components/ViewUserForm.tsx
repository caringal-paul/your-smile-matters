import { useNavigate, useParams } from "react-router-dom";

import FormCard from "@/ami/shared/components/card/FormCard";
import SectionHeader from "@/ami/shared/components/header/SectionHeader";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";
import BackIcon from "@/ami/shared/assets/icons/BackIcon";
import { ChevronRight } from "lucide-react";

import usersArray from "../mock/temp-user.json";
import roleArray from "../mock/temp-roles.json";

import { UserModel } from "@/core/models/user.model";
import { RoleModel } from "@/core/models/role.model";
import { Badge } from "@/core/components/base/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/core/components/base/tooltip";

const ViewUserForm = () => {
	const { id } = useParams();

	const navigate = useNavigate();

	const users = usersArray as unknown;
	const roles = roleArray as unknown;
	const usersData = users as UserModel[];
	const sampleRoles = roles as RoleModel[];

	const foundUser = id ? usersData.find((user) => user._id === id) : undefined;

	const userWithRolesAndPermissions = foundUser && {
		...foundUser,
		roleAndPermission: sampleRoles.find(
			(role) => role._id == foundUser.role_id
		),
	};

	console.log(userWithRolesAndPermissions);

	// WORKON ADD IS_ACTIVE
	return (
		<FormCard>
			<FormCard.Body className="mt-0 mb-2 space-y-4">
				<FormCard.Title>User Information</FormCard.Title>

				<FormCard.Field>
					<FormCard.Label>Full Name</FormCard.Label>
					<Label className="font-normal text-2xs">
						{userWithRolesAndPermissions?.first_name}{" "}
						{userWithRolesAndPermissions?.last_name}
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
											`/admin/ami/role-and-permission-management/roles-and-permissions/edit/${userWithRolesAndPermissions?.role_id}`
										);
									}}
								>
									{userWithRolesAndPermissions?.roleAndPermission?.name}
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
						{userWithRolesAndPermissions?.username}
					</Label>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label>Email</FormCard.Label>
					<Label className="font-normal text-2xs">
						{userWithRolesAndPermissions?.email}
					</Label>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label>Mobile Number</FormCard.Label>
					<Label className="font-normal text-2xs">
						{userWithRolesAndPermissions?.mobile_number}
					</Label>
				</FormCard.Field>
			</FormCard.Body>
		</FormCard>
	);
};

export default ViewUserForm;
