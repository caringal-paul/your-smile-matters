import { useContext, useState } from "react";
import modulePermissions from "../mock/temp-module_permissions.json";
import RoleDetails from "./RoleDetails";

import {
	OldModule,
	OldPermission,
} from "../utils/types/roles-and-permission.types";
import { RoleContext } from "../../auth/providers/RoleContext.ami";
import { Button } from "@/core/components/base/button";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { Label } from "@/core/components/base/label";
import { Checkbox } from "@/core/components/base/checkbox";

const OldRolesForm = () => {
	const roleContext = useContext(RoleContext);
	if (roleContext === null) {
		throw new Error("useRole must be used within a RoleProvider");
	}

	const { selectedRole } = roleContext;

	const [isEdit, setIsEdit] = useState(false);

	const modules: OldModule[] = [...modulePermissions];

	const [checkedPermissions, setCheckedPermissions] = useState<{
		[key: string]: boolean;
	}>({});

	const handlePermissionChange = (
		permissionKey: string,
		checked: boolean,
		permissionName: string,
		moduleId: number,
		submoduleId?: number
	) => {
		const newCheckedPermissions = { ...checkedPermissions };

		if (permissionName.toLowerCase() === "view" && !checked) {
			const currentModule = modules.find((m) => m.id === moduleId);
			if (currentModule) {
				if (submoduleId) {
					const currentSubmodule = currentModule.submodules?.find(
						(s) => s.submodule_id === submoduleId
					);
					currentSubmodule?.permissions.forEach((permission) => {
						const key = getPermissionKey(
							moduleId,
							permission.permission_id,
							submoduleId
						);
						newCheckedPermissions[key] = false;
					});
				} else {
					currentModule.permissions?.forEach((permission) => {
						const key = getPermissionKey(moduleId, permission.permission_id);
						newCheckedPermissions[key] = false;
					});
				}
			}
		} else {
			newCheckedPermissions[permissionKey] = checked;
		}

		setCheckedPermissions(newCheckedPermissions);
	};

	const isViewChecked = (moduleId: number, submoduleId?: number) => {
		const currentModule = modules.find((m) => m.id === moduleId);
		if (!currentModule) return false;

		if (submoduleId) {
			const currentSubmodule = currentModule.submodules?.find(
				(s) => s.submodule_id === submoduleId
			);
			const viewPermission = currentSubmodule?.permissions.find(
				(p) => p.name.toLowerCase() === "view"
			);
			if (viewPermission) {
				const viewKey = getPermissionKey(
					moduleId,
					viewPermission.permission_id,
					submoduleId
				);
				return checkedPermissions[viewKey] || false;
			}
		} else {
			const viewPermission = currentModule.permissions?.find(
				(p) => p.name.toLowerCase() === "view"
			);
			if (viewPermission) {
				const viewKey = getPermissionKey(
					moduleId,
					viewPermission.permission_id
				);
				return checkedPermissions[viewKey] || false;
			}
		}

		return false;
	};

	const isPermissionDisabled = (
		permission: OldPermission,
		moduleId: number,
		submoduleId?: number
	) => {
		if (permission.name.toLowerCase() === "view") {
			return false;
		}
		return !isViewChecked(moduleId, submoduleId);
	};

	const getPermissionKey = (
		moduleId: number,
		permissionId: number,
		submoduleId?: number
	) => {
		return submoduleId
			? `${moduleId}-${submoduleId}-${permissionId}`
			: `${moduleId}-${permissionId}`;
	};

	return (
		<div className="flex-1 grow py-6 bg-card rounded-lg shadow-md border border-border flex flex-col max-h-[calc(100vh-100px)]">
			{!selectedRole ? (
				<>Please select a role</>
			) : (
				<>
					{/* Fixed buttons */}
					<div className="flex gap-2 items-center h-9 px-8 mb-2 w-full sm:w-fit ml-auto shrink-0">
						{isEdit ? (
							<>
								<Button variant="secondary" onClick={() => setIsEdit(false)}>
									Cancel
								</Button>
								<Button
									className="w-full sm:w-fit"
									onClick={() => setIsEdit(false)}
								>
									Save Changes
								</Button>
							</>
						) : (
							<Button
								variant="edit"
								size="edit"
								onClick={() => setIsEdit((prev) => !prev)}
							>
								<EditIcon fill="#1C1B1F" className=" h-3 w-3 mt-[1.5px]" />
								Edit
							</Button>
						)}
					</div>

					<div className="overflow-y-auto mt-4 flex-1 px-8 space-y-4">
						<RoleDetails />

						<div className="flex flex-col gap-[6px] min-w-full overflow-x-auto px-4 scrollbar-small">
							<div className="flex min-w-full mb-4">
								<Label className="w-1/3 min-w-[8rem] text-xs font-bold">
									OldModule Name
								</Label>
								<Label className="flex-1 text-xs font-bold">Permissions</Label>
							</div>

							{modules.map((module) => {
								return (
									<div key={module.id} className="mb-4">
										<div className="flex items-start gap-4 min-w-full">
											<div className="w-1/3 min-w-[8rem] flex-shrink-0">
												<Label className="text-xs font-semibold whitespace-nowrap">
													{module.name}
												</Label>
											</div>

											{/* If no submodules, show permissions at module level */}
											{!module.submodules && (
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-6 flex-nowrap">
														{(module.permissions ?? []).map(
															(permission: OldPermission) => {
																const permissionKey = getPermissionKey(
																	module.id,
																	permission.permission_id
																);
																const isDisabled = isPermissionDisabled(
																	permission,
																	module.id
																);
																const isChecked =
																	checkedPermissions[permissionKey] || false;

																return (
																	<div
																		key={permission.permission_id}
																		className="flex items-center gap-2 flex-shrink-0"
																	>
																		<Checkbox
																			checked={isChecked}
																			disabled={isDisabled || !isEdit}
																			onCheckedChange={(checked) =>
																				handlePermissionChange(
																					permissionKey,
																					checked as boolean,
																					permission.name,
																					module.id
																				)
																			}
																		/>
																		<Label
																			className={`text-xs whitespace-nowrap ${
																				isDisabled ? "text-gray-400" : ""
																			}`}
																		>
																			{permission.name.charAt(0).toUpperCase() +
																				permission.name.slice(1)}
																		</Label>
																	</div>
																);
															}
														)}
													</div>
												</div>
											)}
										</div>

										{module.submodules && (
											<div className="mt-2 space-y-2">
												{module.submodules.map((submodule) => (
													<div
														key={submodule.submodule_id}
														className="flex gap-4 min-w-full"
													>
														<div className="w-1/3 min-w-[8rem] pl-4 flex-shrink-0">
															<Label className="text-xs">
																{submodule.name}
															</Label>
														</div>
														<div className="flex-1 min-w-0">
															<div className="flex items-center gap-6 flex-nowrap">
																{submodule.permissions.map((permission) => {
																	const permissionKey = getPermissionKey(
																		module.id,
																		permission.permission_id,
																		submodule.submodule_id
																	);
																	const isDisabled = isPermissionDisabled(
																		permission,
																		module.id,
																		submodule.submodule_id
																	);
																	const isChecked =
																		checkedPermissions[permissionKey] || false;

																	return (
																		<div
																			key={permission.permission_id}
																			className="flex items-center gap-2 flex-shrink-0"
																		>
																			<Checkbox
																				checked={isChecked}
																				disabled={isDisabled || !isEdit}
																				onCheckedChange={(checked) =>
																					handlePermissionChange(
																						permissionKey,
																						checked as boolean,
																						permission.name,
																						module.id,
																						submodule.submodule_id
																					)
																				}
																			/>
																			<Label
																				className={`text-xs whitespace-nowrap ${
																					isDisabled ? "text-gray-400" : ""
																				}`}
																			>
																				{permission.name
																					.charAt(0)
																					.toUpperCase() +
																					permission.name.slice(1)}
																			</Label>
																		</div>
																	);
																})}
															</div>
														</div>
													</div>
												))}
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default OldRolesForm;
