// Components
import { Label } from "@/core/components/base/label";
import { useParams } from "react-router-dom";
import customersArray from "../mock/temp-customers.json";

import { CustomerModel } from "@/core/models/customer.model";
import FormCard from "@/ami/shared/components/custom/card/FormCard";
import {
	formatDateToTextMonth,
	formatDisplayDate,
} from "@/ami/shared/helpers/formatDate";

import image from "/profile-avatar.jpg";
import { Badge } from "@/core/components/base/badge";

const ViewCustomerForm = () => {
	const { id } = useParams();

	const customers = customersArray as unknown;
	const customersData = customers as CustomerModel[];

	const foundCustomer = id
		? customersData.find((customer) => customer._id === id)
		: undefined;

	return (
		<div>
			<FormCard>
				<FormCard.Title>Customer Information</FormCard.Title>
				<div className="flex flex-col w-full gap-4 lg:flex-row lg:min-h-fit">
					{/* Profile Image */}
					<div className="relative flex items-center justify-center lg:w-1/2 lg:min-h-full">
						<div className="absolute transform -translate-x-1/2 top-4 left-1/2">
							<FormCard.Label>Profile Image</FormCard.Label>
						</div>
						<div
							className={`h-36 w-36 border-avatar mt-12 lg:mt-6 border-2 flex items-center justify-center rounded-full bg-cover bg-center ${
								!image && "bg-avatar-placeholder"
							}`}
							style={{
								backgroundImage: !image ? undefined : `url('${image}')`,
							}}
						>
							{!image && (
								<Label className="text-avatar font-semibold text-[64px] tracking-tighter">
									JD
								</Label>
							)}
						</div>
					</div>

					<div className="flex flex-col w-full gap-4 p-4 lg:w-2/3">
						<FormCard.Field>
							<FormCard.Label>Customer No.</FormCard.Label>
							<Label className="font-normal text-2xs">
								{foundCustomer?.customer_no}
							</Label>
						</FormCard.Field>

						<FormCard.Field>
							<FormCard.Label>Customer Name</FormCard.Label>
							<Label className="font-normal text-2xs">
								{foundCustomer?.last_name} {foundCustomer?.first_name}
							</Label>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label>Email</FormCard.Label>
							<Label className="font-normal text-2xs">
								{foundCustomer?.email}
							</Label>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label>Mobile Number</FormCard.Label>
							<Label className="font-normal text-2xs">
								{foundCustomer?.mobile_number}
							</Label>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label>Gender</FormCard.Label>
							<Label className="font-normal text-2xs">
								{foundCustomer?.gender}
							</Label>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label>Birth Date</FormCard.Label>
							<Label className="font-normal text-2xs">
								{!foundCustomer?.birth_date
									? "-"
									: formatDateToTextMonth(foundCustomer?.birth_date)}
							</Label>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label>Complete Address</FormCard.Label>
							<Label className="font-normal text-2xs">
								{foundCustomer?.country} {foundCustomer?.province}{" "}
								{foundCustomer?.city} {foundCustomer?.barangay}{" "}
								{foundCustomer?.address} {foundCustomer?.postal_code}
							</Label>
						</FormCard.Field>
						{/* Account Status */}
						<FormCard.Field>
							<FormCard.Label>Account Status</FormCard.Label>

							<Badge className="w-fit">
								<Label className={`font-normal text-2xs`}>
									{foundCustomer?.is_active ? "Active" : "Inactive"}
								</Label>
							</Badge>
						</FormCard.Field>
					</div>
				</div>
			</FormCard>
		</div>
	);
};

export default ViewCustomerForm;
