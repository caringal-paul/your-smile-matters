import { Button } from "@/core/components/base/button";
import ButtonArrowRightIcon from "@/ami/shared/assets/icons/ButtonArrowRightIcon";
import {
	Role,
	RoleContext,
} from "@/ami/features/auth/providers/RoleContext.ami";
import { useContext, useState } from "react";

import tempRoles from "../mock/temp-roles.json";

import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/core/components/base/popover";
import { cn } from "@/core/lib/utils";

const RoleOptionButtons = () => {
	const roles = tempRoles as unknown;

	const rolesWithRoleAndPermissions = roles as Role[];

	const roleContext = useContext(RoleContext);
	if (roleContext === null) {
		throw new Error("useRole must be used within a RoleProvider");
	}

	const { selectedRole, setSelectedRole } = roleContext;
	const [isSelectPopoverOpen, setIsSelectPopoverOpen] = useState(false);

	return (
		<>
			<div className="hidden lg:block w-[35%] space-y-4">
				{rolesWithRoleAndPermissions.map((role: Role) => (
					<Button
						key={role.id}
						variant={selectedRole?.id === role.id ? "roleSelected" : "role"}
						onClick={() => setSelectedRole(role)}
					>
						{role.name}
						<ButtonArrowRightIcon
							className={`h-7 w-7 ${
								selectedRole?.id === role.id
									? "text-white"
									: "text-text-primary"
							}`}
						/>
					</Button>
				))}
			</div>

			<Popover open={isSelectPopoverOpen} onOpenChange={setIsSelectPopoverOpen}>
				<PopoverTrigger asChild>
					<Button
						className={cn(
							"w-full justify-between rounded-[13px] lg:hidden shadow-none transition-none",
							"bg-primary-foreground text-white"
						)}
					>
						{selectedRole?.name ?? "Select Role"}
						<ButtonArrowRightIcon className="h-7 w-7 text-white" />
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-[var(--radix-popover-trigger-width)] bg-white p-0">
					<div className="flex flex-col">
						{rolesWithRoleAndPermissions.map((role) => (
							<button
								key={role.id}
								className={cn(
									"px-3 py-2 text-left hover:bg-muted transition-all text-xs",
									selectedRole?.id === role.id && "bg-accent font-semibold"
								)}
								onClick={() => {
									setSelectedRole(role);
									setIsSelectPopoverOpen(false);
								}}
							>
								{role.name}
							</button>
						))}
					</div>
				</PopoverContent>
			</Popover>
		</>
	);
};

export default RoleOptionButtons;
