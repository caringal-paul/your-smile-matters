import roleArray from "../mock/temp-roles.json";
import samplePermissions from "../mock/temp-permissions.json";
import { RoleTableType } from "../utils/types/roles-and-permission.types";
import { Check, X } from "lucide-react";
import { formatToProperText } from "@/ami/shared/helpers/formatToProperText";
import { Label } from "@/core/components/base/label";
import { Button } from "@/core/components/base/button";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import TrashIcon from "@/ami/shared/assets/icons/TrashIcon";
import { useNavigate } from "react-router-dom";

const RolesAndPermissionsTable = () => {
	const navigate = useNavigate();
	const roles = roleArray as unknown;

	const sampleRoles = roles as RoleTableType[];

	const modules = [...new Set(samplePermissions.map((p) => p.module))];

	const getActionsForModule = (module: string) => {
		return samplePermissions
			.filter((p) => p.module === module)
			.map((p) => p.action)
			.sort((a, b) => {
				const order = ["read", "create", "update", "delete", "approve"];
				return order.indexOf(a) - order.indexOf(b);
			});
	};

	const hasPermission = (
		role: RoleTableType,
		module: string,
		action: string
	) => {
		return role.permissions.includes(`${module}:${action}`);
	};

	return (
		<div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
			<div className="flex-1 overflow-auto scrollbar-small">
				<div className="min-w-full xl:w-[calc(100vw-340px)] max-w-[calc(100vw-260px)] scrollbar-hidden inline-block align-top">
					<table className="w-full border-[1px] border-table">
						<thead className="border-b-[1.5px] border-table sticky top-0 bg-white z-20">
							<tr className="bg-accent">
								<th className="border-none py-2 text-left px-8 sticky left-0 min-w-[150px] z-30 bg-accent">
									<Label
										variant="undefined"
										className="font-semibold text-xs whitespace-nowrap"
									>
										Role
									</Label>
								</th>
								<th className="border-none py-2 text-left px-8 min-w-[200px]">
									<Label
										variant="undefined"
										className="font-semibold text-xs whitespace-nowrap"
									>
										Description
									</Label>
								</th>
								{modules.map((module) => (
									<th
										key={module}
										className="border-none py-2 text-left px-8 min-w-[180px]"
									>
										<Label
											variant="undefined"
											className="font-semibold text-xs whitespace-nowrap"
										>
											{formatToProperText(module)}
										</Label>
									</th>
								))}
								<th className="border-none py-2 text-left px-8 min-w-[200px]">
									<Label
										variant="undefined"
										className="font-semibold text-xs whitespace-nowrap"
									>
										Actions
									</Label>
								</th>
							</tr>
						</thead>
						<tbody>
							{sampleRoles.map((role, index) => (
								<tr
									key={role._id}
									className="odd:bg-white even:bg-accent-foreground"
								>
									<td className="sticky left-0 bg-inherit border-b-[.5px] border-table py-4 pl-8 pr-0 min-w-[150px] z-10">
										<Label className="font-normal text-[8px] xl:text-xs truncate">
											{role.name}
										</Label>
									</td>

									<td className="border-b-[.5px] border-table py-4 pl-8 pr-0 min-w-[200px]">
										<Label className="font-normal text-[8px] xl:text-xs truncate">
											{role.description}
										</Label>
									</td>
									{modules.map((module) => (
										<td
											key={module}
											className="border-b-[.5px] border-table py-4 pl-8 pr-0"
										>
											<div className="space-y-2 min-w-[80px]">
												{getActionsForModule(module).map((action) => (
													<div
														key={action}
														className="flex items-center justify-between py-1 px-3 bg-accent rounded-md"
													>
														<Label className="font-normal text-[8px] xl:text-[10px] capitalize">
															{action}
														</Label>

														<div className="flex items-center">
															{hasPermission(role, module, action) ? (
																<Check className="size-3 2xl:size-4 text-green-700" />
															) : (
																<X className="size-3 2xl:size-4 text-red-600" />
															)}
														</div>
													</div>
												))}
											</div>
										</td>
									))}

									<td className="border-b-[.5px] border-table py-4 pl-8 pr-0 min-w-[200px]">
										<Button
											variant="icon"
											size="icon"
											onClick={() => navigate(`edit/${role._id}`)}
										>
											<EditIcon fill="#1C1B1F" className="ml-1 mt-[4px]" />
										</Button>
										<Button variant="icon" size="icon">
											<EyeIcon fill="#1C1B1F" />
										</Button>
										<Button variant="icon" size="icon">
											<TrashIcon />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="px-6 py-4 bg-gray-100 border-t flex-shrink-0 border-[1px] border-table">
				<div className="flex items-center justify-between">
					<div className="flex flex-wrap gap-4 text-sm">
						<div className="flex items-center gap-2">
							<Check className="w-4 h-4 text-green-600" />
							<Label className="text-xs">Has Permission</Label>
						</div>
						<div className="flex items-center gap-2">
							<X className="w-4 h-4 text-red-400" />
							<Label className="text-xs">No Permission</Label>
						</div>
					</div>

					<div className="flex flex-wrap gap-4 text-sm">
						<div className="flex items-center gap-2">
							<Label className="text-xs">
								Total Roles: {sampleRoles.length}
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<Label className="text-xs">Total Modules: {modules.length}</Label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RolesAndPermissionsTable;
