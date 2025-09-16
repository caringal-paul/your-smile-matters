import { Checkbox } from "@/core/components/base/checkbox";
import { Label } from "@/core/components/base/label";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/core/components/base/button";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { Role } from "../utils/types/roles-and-permission.types";
import samplePermissions from "../mock/temp-permissions.json";
import { Separator } from "@/core/components/base/separator";
import { RoleContext } from "../../auth/providers/RoleContext.ami";
import modulePermissions from "../mock/temp-module_permissions.json";
import OldRolesForm from "./OldRolesForm";

type RolesAndPermissionsFormProps = {
	selectedRole: Role | null;
	onSave: (updatedRole: Role) => void;
};

// TODO ADD BREADCRUMBS
// RECHECK ADD MODULES AND SUBMODULES IN ORDER TO SEPARATE PERMISSIONS PER MODULE EX. THERE IS AN APPROVAL AND THEN THERE IS A MANAGER LEVEL FOR THAT MODULE
const RolesAndPermissionsForm = ({
	selectedRole,
	onSave,
}: RolesAndPermissionsFormProps) => {
	const [isEdit, setIsEdit] = useState(false);
	const [rolePermissions, setRolePermissions] = useState<string[]>([]);
	const [hasChanges, setHasChanges] = useState(false);

	// Get unique modules from permissions
	const modules = [...new Set(samplePermissions.map((p) => p.module))];

	// Initialize permissions when role changes
	useEffect(() => {
		if (selectedRole) {
			setRolePermissions([...selectedRole.permissions]);
			setHasChanges(false);
		}
	}, [selectedRole]);

	// Get permissions for a specific module
	const getPermissionsForModule = (module: string) => {
		return samplePermissions
			.filter((p) => p.module === module)
			.sort((a, b) => {
				const order = ["read", "create", "update", "delete", "approve"];
				return order.indexOf(a.action) - order.indexOf(b.action);
			});
	};

	// Check if role has specific permission
	const hasPermission = (permissionKey: string) => {
		return rolePermissions.includes(permissionKey);
	};

	// Handle permission change
	const handlePermissionChange = (permissionKey: string, checked: boolean) => {
		if (!isEdit) return;

		setRolePermissions((prev) => {
			const updated = checked
				? [...prev, permissionKey]
				: prev.filter((p) => p !== permissionKey);

			// Check if there are changes compared to original
			const originalPermissions = selectedRole?.permissions || [];
			const hasChangesNow =
				updated.length !== originalPermissions.length ||
				updated.some((p) => !originalPermissions.includes(p)) ||
				originalPermissions.some((p) => !updated.includes(p));

			setHasChanges(hasChangesNow);
			return updated;
		});
	};

	// Handle save
	const handleSave = () => {
		if (onSave && selectedRole) {
			const updatedRole = {
				...selectedRole,
				permissions: rolePermissions,
			};
			onSave(updatedRole);
		}
		setIsEdit(false);
		setHasChanges(false);
	};

	// Handle cancel
	const handleCancel = () => {
		if (selectedRole) {
			setRolePermissions([...selectedRole.permissions]);
		}
		setIsEdit(false);
		setHasChanges(false);
	};

	// Get action color
	const getActionColor = (action: string) => {
		const colors = {
			create: "text-green-600",
			read: "text-blue-600",
			update: "text-yellow-600",
			delete: "text-red-600",
			approve: "text-purple-600",
		};
		return colors[action as keyof typeof colors] || "text-gray-600";
	};

	// Format module name
	const formatModuleName = (module: string) => {
		return module.charAt(0).toUpperCase() + module.slice(1);
	};

	if (!selectedRole) {
		return (
			<div className="flex items-center justify-center flex-1 py-6 bg-white border border-gray-200 rounded-lg shadow-md grow">
				<p className="text-gray-500">Please select a role</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-20 ">
			<div className="flex-1 grow py-6 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col max-h-[calc(100vh-100px)]">
				{/* Fixed buttons */}
				<div className="flex items-center w-full gap-2 px-8 mb-2 ml-auto h-9 sm:w-fit shrink-0">
					{isEdit ? (
						<>
							<Button variant="secondary" onClick={handleCancel}>
								Cancel
							</Button>
							<Button
								className="w-full sm:w-fit"
								onClick={handleSave}
								disabled={!hasChanges}
							>
								Save Changes
							</Button>
						</>
					) : (
						<Button variant="edit" size="edit" onClick={() => setIsEdit(true)}>
							<EditIcon className="w-3 h-3 mr-1" />
							Edit
						</Button>
					)}
				</div>

				{/* Scrollable content */}
				<div className="flex-1 px-8 mt-4 space-y-4 overflow-y-auto">
					{/* Role Details */}
					<div className="flex flex-col gap-4">
						<div className="flex">
							<Label className="w-[25%] min-w-[8em] md:min-w-[25%] text-xs font-bold">
								Role
							</Label>
							<Label className="flex-1 text-xs grow">
								{selectedRole?.name}
							</Label>
						</div>
						<div className="flex">
							<Label className="w-[25%] min-w-[8em] md:min-w-[25%] text-xs font-bold">
								Description
							</Label>
							<Label className="flex-1 text-xs grow">
								{selectedRole?.description}
							</Label>
						</div>

						<Separator className="my-2" />
					</div>

					{/* Permissions Section */}
					{/* <div className="flex flex-col gap-[6px] min-w-full overflow-x-auto px-4">
					<div className="flex min-w-full mb-4">
						<Label className="w-1/3 min-w-[8rem] text-xs font-bold">
							Module Name
						</Label>
						<Label className="flex-1 text-xs font-bold">Permissions</Label> 
					</div>
				*/}
					<div className="flex flex-col gap-[6px] min-w-full overflow-x-auto px-4 scrollbar-small">
						<div className="flex min-w-full mb-4">
							<Label className="w-1/3 min-w-[8rem] text-xs font-bold">
								Module Name
							</Label>
							<Label className="flex-1 text-xs font-bold">Permissions</Label>
						</div>

						{modules.map((module) => {
							const modulePermissions = getPermissionsForModule(module);
							const modulePermissionCount = modulePermissions.filter((p) =>
								hasPermission(p.key)
							).length;

							return (
								<div key={module} className="mb-4">
									<div className="flex items-start min-w-full gap-4">
										<div className="w-1/3 min-w-[8rem] flex-shrink-0">
											<div className="flex flex-col">
												<Label className="text-xs font-semibold whitespace-nowrap">
													{formatModuleName(module)}
												</Label>
												<span className="mt-1 text-xs text-gray-500">
													{modulePermissionCount}/{modulePermissions.length}{" "}
													permissions
												</span>
											</div>
										</div>

										<div className="flex-1 min-w-0">
											<div className="flex flex-wrap items-center gap-6">
												{modulePermissions.map((permission) => {
													const isChecked = hasPermission(permission.key);

													return (
														<div
															key={permission._id}
															className="flex items-center flex-shrink-0 gap-2"
														>
															<Checkbox
																checked={isChecked}
																disabled={!isEdit}
																onCheckedChange={(checked) =>
																	handlePermissionChange(
																		permission.key,
																		!!checked
																	)
																}
															/>
															<Label
																className={`text-xs whitespace-nowrap ${getActionColor(
																	permission.action
																)}`}
															>
																{permission.action.charAt(0).toUpperCase() +
																	permission.action.slice(1)}
															</Label>
														</div>
													);
												})}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Changes indicator */}
					{isEdit && hasChanges && (
						<div className="p-3 mt-4 border border-yellow-200 rounded-lg bg-yellow-50">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
								<span className="text-sm text-yellow-800">
									You have unsaved changes
								</span>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* ------------------------ OLD ----------------------------- */}

			<OldRolesForm />
		</div>
	);
};

export default RolesAndPermissionsForm;

// export default RolesAndPermissionsForm;
