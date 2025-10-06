import { useContext } from "react";
import { Label } from "@/core/components/base/label";
import { Separator } from "@/core/components/base/separator";
import { RoleContext } from "@/ami/features/auth/providers/RoleContext.ami";

const RoleDetails = () => {
	const roleContext = useContext(RoleContext);
	if (roleContext === null) {
		throw new Error("useRole must be used within a RoleProvider");
	}

	const { selectedRole } = roleContext;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex">
				<Label className="w-[25%] min-w-[8em] md:min-w-[25%] text-xs font-bold">
					Role
				</Label>
				<Label className="flex-1 grow text-xs">{selectedRole?.name}</Label>
			</div>
			<div className="flex">
				<Label className="w-[25%] min-w-[8em] md:min-w-[25%] text-xs font-bold">
					Description
				</Label>
				<Label className="flex-1 grow text-xs">
					{selectedRole?.description}
				</Label>
			</div>

			<Separator className="my-2" />
		</div>
	);
};

export default RoleDetails;
