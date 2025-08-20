import FormCard from "@/ami/shared/components/custom/card/FormCard";
import { Label } from "@/core/components/base/label";
import { Customer } from "../../../customer-management/utils/types/customer-table.types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/core/components/base/button";

type CustomerInfoProps = {
	data: Customer;
};

export const CustomerInfo = ({ data }: CustomerInfoProps) => {
	const navigate = useNavigate();

	return (
		<FormCard>
			<FormCard.Title className="flex items-center">
				Customer Info
				<div className="ml-auto">
					<Button
						variant="edit"
						className="p-0 h-5 text-xs font-light"
						onClick={() =>
							navigate(
								`/customer-management/customers/view/customer/${data.id}`
							)
						}
					>
						Go to Customer Profile
					</Button>
				</div>
			</FormCard.Title>
			<FormCard.Body>
				<FormCard.Field>
					<FormCard.Label>Customer ID</FormCard.Label>
					<Label className="text-[11px] font-normal">{data.id}</Label>
				</FormCard.Field>
				<FormCard.Field>
					<FormCard.Label>First Name</FormCard.Label>
					<Label className="text-[11px] font-normal">{data.first_name}</Label>
				</FormCard.Field>
				<FormCard.Field>
					<FormCard.Label>Surname</FormCard.Label>
					<Label className="text-[11px] font-normal">{data.surname}</Label>
				</FormCard.Field>
				<FormCard.Field>
					<FormCard.Label>Email Address</FormCard.Label>
					<Label className="text-[11px] font-normal">{data.email}</Label>
				</FormCard.Field>
				<FormCard.Field>
					<FormCard.Label>Mobile Number</FormCard.Label>
					<Label className="text-[11px] font-normal">
						{!data.mobile_number ? "-" : data.mobile_number}
					</Label>
				</FormCard.Field>
			</FormCard.Body>
		</FormCard>
	);
};
