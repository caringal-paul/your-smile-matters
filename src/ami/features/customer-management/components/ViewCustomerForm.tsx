// Components
import { Label } from "@/core/components/base/label";
import { useParams } from "react-router-dom";
import FormCard from "@/ami/shared/components/card/FormCard";
import { formatDateToTextMonth } from "@/ami/shared/helpers/formatDate";

import image from "/profile-avatar.jpg";
import { Badge } from "@/core/components/base/badge";
import { useGetCustomerByIdQuery } from "../queries/getCustomerById.ami.query";
import { getInitials } from "@/core/helpers/getInitials";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/core/components/base/avatar";

const ViewCustomerForm = () => {
	const { id } = useParams();

	const { data: foundCustomer, isLoading } = useGetCustomerByIdQuery(id!);

	if (isLoading) {
		return <>Loading</>;
	}

	return (
		<div>
			<FormCard>
				<FormCard.Title>Customer Information</FormCard.Title>
				<div className="flex flex-col w-full gap-4 lg:flex-row lg:min-h-fit">
					{/* Profile Image */}
					<div className="relative flex items-center justify-center lg:w-1/2 lg:min-h-full h-44">
						<div className="absolute transform -translate-x-1/2 top-4 left-1/2 flex flex-col items-center gap-2">
							<FormCard.Label>Profile Image</FormCard.Label>
							<Avatar className="size-32 border-2 border-gray-300">
								<AvatarImage
									src={foundCustomer?.profile_image}
									alt="Profile"
									className="object-cover"
								/>
								<AvatarFallback className="text-4xl">
									{getInitials(
										`${foundCustomer?.first_name} ${foundCustomer?.last_name}`
									)}
								</AvatarFallback>
							</Avatar>
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
								{foundCustomer?.address} {foundCustomer?.barangay}{" "}
								{foundCustomer?.city} {foundCustomer?.postal_code}{" "}
								{foundCustomer?.province} {foundCustomer?.country}{" "}
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
