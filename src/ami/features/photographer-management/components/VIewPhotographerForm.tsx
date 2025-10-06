// Components
import { Label } from "@/core/components/base/label";
import { useParams } from "react-router-dom";
import FormCard from "@/ami/shared/components/card/FormCard";

import { Badge } from "@/core/components/base/badge";
import { useGetPhotographerByIdQuery } from "../queries/getPhotographerById.ami.query";
import { getInitials } from "@/core/helpers/getInitials";
import parse from "html-react-parser";
import { formatDurationByHours } from "@/store-front/shared/helpers/formatDuration";

import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/core/components/base/item";
import { formatToNormalTime } from "@/ami/shared/helpers/formatDate";
import { Book, Check, Notebook, X } from "lucide-react";

const ViewPhotographerForm = () => {
	const { id } = useParams();

	const { data: foundPhotographer, isLoading } = useGetPhotographerByIdQuery(
		id!
	);

	if (isLoading) {
		return <>Loading</>;
	}

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 xl:grid-rows-2 gap-4 pb-6">
			<FormCard className="col-span-2  xl:col-span-1  row-span-1 overflow-auto scrollbar-small">
				<FormCard.Title>Profile Image</FormCard.Title>
				<FormCard.Body className="max-h-[90%] overflow-auto scrollbar-small">
					<img
						src={
							foundPhotographer?.profile_image ||
							"/images/avatar-placeholder.png"
						}
						onError={(e) => {
							e.currentTarget.src = "/sf/ysm-card-fallback.png";
						}}
						alt="Photographer profile"
						className="h-36 w-36 border-avatar mt-12 lg:mt-4 border-2 rounded-full object-cover bg-center mx-auto"
					/>

					{/* {!foundPhotographer?.profile_image && (
						<Label className="text-avatar font-semibold tracking-tighter">
							{getInitials(String(foundPhotographer?.name))}
						</Label>
					)} */}
					<FormCard.Title>Bio</FormCard.Title>

					<FormCard.Label className="font-normal rich-text">
						{parse(String(foundPhotographer?.bio))}
					</FormCard.Label>
				</FormCard.Body>
			</FormCard>

			<FormCard className="col-span-2 xl:col-span-1 w-full xl:row-span-2 row-start-1 overflow-auto scrollbar-small">
				<FormCard.Title>Weekly Schedule</FormCard.Title>
				<FormCard.Body>
					{foundPhotographer?.weekly_schedule?.map((sched, index) => {
						return (
							<Item
								key={index}
								size="default"
								variant="outline"
								className="border-dashed relative"
							>
								<ItemContent>
									<ItemTitle>{sched.day_of_week}</ItemTitle>
									{sched.is_available ? (
										<ItemDescription className="text-xs">
											{formatToNormalTime(sched.start_time)} -{" "}
											{formatToNormalTime(sched.end_time)}
										</ItemDescription>
									) : (
										<ItemDescription className="text-xs">
											00:00 AM - 00:00 PM
										</ItemDescription>
									)}
									<div className="flex flex-col mt-1 space-y-2">
										<div className="flex gap-1 items-center">
											<Book className="size-3" />
											<Label className="text-xs">Notes:</Label>
										</div>
										<Label className="text-xs 2xl:text-2xs">
											{sched.notes ? sched.notes : "Empty Note"}
										</Label>
									</div>
									<div className="flex gap-1 absolute top-4 right-4 items-center">
										<ItemMedia
											variant="icon"
											className={`border-none text-white rounded-full size-4 ${
												sched.is_available ? "bg-green-500" : "bg-destructive"
											}`}
										>
											{sched.is_available ? (
												<Check className="size-3" />
											) : (
												<X className="size-3" />
											)}
										</ItemMedia>
										<Label className="text-xs font-light mt-[2px]">
											{sched.is_available ? "Available" : "Unavailable"}
										</Label>
									</div>
								</ItemContent>
							</Item>
						);
					})}
				</FormCard.Body>
			</FormCard>

			<FormCard className="col-span-2 xl:col-span-1 row-span-1 ">
				<FormCard.Title>Photographer Information</FormCard.Title>
				<FormCard.Body className="max-h-[90%] overflow-auto scrollbar-small">
					<FormCard.Field>
						<FormCard.Label>Name</FormCard.Label>
						<Label className="font-normal text-xs 2xl:text-2xs">
							{foundPhotographer?.name}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Email</FormCard.Label>
						<Label className="font-normal text-xs 2xl:text-2xs">
							{foundPhotographer?.email}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Mobile Number</FormCard.Label>
						<Label className="font-normal text-xs 2xl:text-2xs">
							{foundPhotographer?.mobile_number}
						</Label>
					</FormCard.Field>
					<FormCard.Field className="items-start">
						<FormCard.Label>Specialties</FormCard.Label>
						<div className="flex flex-col gap-2">
							{foundPhotographer?.specialties.map((specialty) => {
								return <Badge className="even:bg-secondary">{specialty}</Badge>;
							})}
						</div>
					</FormCard.Field>
					<FormCard.Field>
						{/* TODO ADD CONDITION TO GET BY ID */}
						<FormCard.Label>Total Bookings</FormCard.Label>
						<Label className="font-normal text-xs 2xl:text-2xs">
							{!foundPhotographer?.total_bookings
								? 0
								: foundPhotographer?.total_bookings}{" "}
							bookings
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Completed Bookings</FormCard.Label>
						<Label className="font-normal text-xs 2xl:text-2xs">
							{!foundPhotographer?.completed_bookings
								? 0
								: foundPhotographer?.completed_bookings}{" "}
							completed
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Advance Notice</FormCard.Label>
						<Label className="font-normal text-xs 2xl:text-2xs">
							{formatDurationByHours(
								Number(foundPhotographer?.booking_lead_time_hours)
							)}{" "}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Account Status</FormCard.Label>

						<Badge className="w-fit">
							<Label className={`font-normal text-xs 2xl:text-2xs`}>
								{foundPhotographer?.is_active ? "Active" : "Inactive"}
							</Label>
						</Badge>
					</FormCard.Field>
				</FormCard.Body>
			</FormCard>

			<FormCard className="col-span-2 xl">
				<FormCard.Title>Custom Schedule</FormCard.Title>
				<FormCard.Body className="max-h-[90%] overflow-auto scrollbar-small">
					{Array.isArray(foundPhotographer?.date_overrides) &&
					foundPhotographer?.date_overrides.length > 0 ? (
						<div className="space-y-4">
							{foundPhotographer?.date_overrides.map((override, index) => (
								<Item
									key={index}
									size="default"
									variant="outline"
									className="border-dashed relative"
								>
									<ItemContent>
										<ItemTitle>
											{new Date(override.date).toLocaleDateString("en-US", {
												weekday: "long",
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</ItemTitle>

										{override.reason && (
											<ItemDescription className="text-xs font-medium">
												Reason: {override.reason}
											</ItemDescription>
										)}

										{override.is_available && override.custom_hours ? (
											<ItemDescription className="text-xs">
												Custom Hours:{" "}
												{formatToNormalTime(override.custom_hours.start_time)} -{" "}
												{formatToNormalTime(override.custom_hours.end_time)}
											</ItemDescription>
										) : (
											<ItemDescription className="text-xs text-destructive">
												Not Available
											</ItemDescription>
										)}

										{override.notes && (
											<div className="flex flex-col mt-1 space-y-2">
												<div className="flex gap-1 items-center">
													<Notebook className="size-3" />
													<Label className="text-xs">Notes:</Label>
												</div>
												<Label className="text-xs 2xl:text-2xs">
													{override.notes}
												</Label>
											</div>
										)}

										<div className="flex gap-1 absolute top-4 right-4 items-center">
											<ItemMedia
												variant="icon"
												className={`border-none text-white rounded-full size-4 ${
													override.is_available
														? "bg-green-500"
														: "bg-destructive"
												}`}
											>
												{override.is_available ? (
													<Check className="size-3" />
												) : (
													<X className="size-3" />
												)}
											</ItemMedia>
											<Label className="text-xs font-light mt-[2px]">
												{override.is_available ? "Available" : "Unavailable"}
											</Label>
										</div>
									</ItemContent>
								</Item>
							))}
						</div>
					) : (
						<div className="flex items-center justify-center h-full min-h-[15rem]">
							<Label className="text-lg font-medium">
								No date overrides set
							</Label>
						</div>
					)}
				</FormCard.Body>
			</FormCard>

			<FormCard className="col-span-2">
				<FormCard.Title>Photo Gallery</FormCard.Title>
				<FormCard.Body className="h-full">
					{Array.isArray(foundPhotographer?.photo_gallery) &&
					foundPhotographer?.photo_gallery.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-4 px-44">
							{foundPhotographer?.photo_gallery.map((photo, index) => {
								return (
									<div key={index} className="aspect-square">
										<img
											src={photo || "/sf/ysm-card-fallback.png"}
											onError={(e) => {
												e.currentTarget.src = "/sf/ysm-card-fallback.png";
											}}
											alt={`photographer-img-${index + 1}`}
											className="w-full h-full object-cover rounded-lg"
										/>
									</div>
								);
							})}
						</div>
					) : (
						<div className="flex items-center justify-center h-full min-h-[15rem]">
							<Label className="text-lg font-medium">No image showcased</Label>
						</div>
					)}
				</FormCard.Body>
			</FormCard>
		</div>
	);
};

export default ViewPhotographerForm;
