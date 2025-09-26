import React, { useEffect, useState } from "react";
import FormCard from "@/ami/shared/components/card/FormCard";
import { Label } from "@/core/components/base/label";
import { Button } from "@/core/components/base/button";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { Input } from "@/core/components/base/input";
import {
	validateFileExtension,
	validateFileSize,
} from "@/ami/shared/helpers/validateFileUpload";

const AccountSettingsForm = () => {
	const [isEdit, setIsEdit] = useState(false);
	const [firstName, setFirstName] = useState("John");
	const [lastName, setLastName] = useState("Doe");
	const [email, setEmail] = useState("johndoe@altinvest.com");
	const [mobile, setMobile] = useState("+234 201 335 3131");
	const [image, setImage] = useState("");
	useEffect(() => {
		if (isEdit == false) {
			setFirstName((prev) => {
				if (prev == "") {
					return "John";
				} else {
					return prev;
				}
			});
			setLastName((prev) => {
				if (prev == "") {
					return "Doe";
				} else {
					return prev;
				}
			});
			setEmail((prev) => {
				if (prev == "") {
					return "johndoe@yopmail.com";
				} else {
					return prev;
				}
			});
			setMobile((prev) => {
				if (prev == "") {
					return "+234 201 335 3131";
				} else {
					return prev;
				}
			});
		}

		setIsEdit(false);
	}, [isEdit]);

	return (
		<FormCard className="h-fit">
			<FormCard.Title>Account Profile</FormCard.Title>
			<FormCard.Body>
				<div className="space-y-4 justify-center flex flex-col items-center">
					<div
						// className=""
						className={`relative h-36 w-36 border-avatar border-2 place-items-center grid rounded-full bg-cover bg-center ${
							!image && "bg-avatar-placeholder "
						} `}
						style={{
							backgroundImage: !image ? undefined : `url('${image}')`,
						}}
					>
						{!image && (
							<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
								<Label className="text-avatar font-semibold text-[64px] tracking-tighter">
									JD
								</Label>
							</div>
						)}
						<Input
							id="profile"
							type="file"
							className="hidden"
							accept="image/*"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const file = e.target.files?.[0];

								if (file) {
									const isAttachmentValid = validateFileSize({
										file: file,
										errorMessage: "Image size must not exceed 2mb.",
										fieldName: "image",
										sizeLimit: 2,
									});

									const isExtensionValid = validateFileExtension({
										file: file,
										errorMessage:
											"Invalid file type. Please upload a .png, .jpg, or .jpeg file.",
										fieldName: "image",
										validExtensions: ["image/jpeg", "image/jpg", "image/png"],
									});

									if (!isExtensionValid || !isAttachmentValid) {
										return;
									} else {
										// form.clearErrors();
									}

									const imageUrl = URL.createObjectURL(file);

									setImage(imageUrl);
								}
							}}
							value=""
						/>
						<Button
							variant="edit"
							size="edit"
							className={`absolute bottom-3 right-2 rounded-full bg-avatar hover:bg-foreground hover:border-none hover:ring-none h-5 w-5 pl-1 pt-1 [&_svg]:size-4 [&_svg]:shrink-0`}
							onClick={() => document.getElementById("profile")?.click()}
							type="button"
						>
							<span className="h-4 w-4 text-white">
								<EditIcon fill="white" />
							</span>
						</Button>
					</div>
					<Label className={`text-[10px] text-text-secondary font-light`}>
						Upload Profile Picture (less than 2mb*)
					</Label>
				</div>

				<div>
					<FormCard.Body className="p-6 rounded-md bg-accent-foreground border-[1px] border-border">
						<FormCard.Title
							className="relative flex flex-col sm:flex-row border-none justify-between items-start sm:items-center"
							hasSeparator={false}
						>
							<span className="mb-2 sm:mb-0">Edit Profile</span>

							{/* {isEdit ? (
								<div className="flex gap-2 items-center h-9 w-full sm:w-fit">
									<Button
										variant="secondary"
										size="sm"
										className="w-full"
										onClick={() => {
											setFirstName((prev) => {
												if (prev == "") {
													return "John";
												} else {
													return prev;
												}
											});
											setLastName((prev) => {
												if (prev == "") {
													return "Doe";
												} else {
													return prev;
												}
											});
											setEmail((prev) => {
												if (prev == "") {
													return "johndoe@altinvest.com";
												} else {
													return prev;
												}
											});
											setMobile((prev) => {
												if (prev == "") {
													return "+234 201 335 3131";
												} else {
													return prev;
												}
											});
											setIsEdit(false);
										}}
									>
										Cancel
									</Button>
									<Button
										className="w-full sm:w-fit"
										size="sm"
										onClick={() => setIsEdit(false)}
									>
										Save Changes
									</Button>
								</div>
							) : (
								<Button
									variant="edit"
									size="edit"
									className="absolute sm:flex right-0"
									onClick={() => setIsEdit((prev) => !prev)}
								>
									<EditIcon fill="#1C1B1F" className=" h-3 w-3 mt-[1.5px]" />
									Edit
								</Button>
							)} */}
						</FormCard.Title>

						<FormCard.Field>
							<FormCard.Label htmlFor="firstName">First Name</FormCard.Label>
							<div className="flex flex-row">
								<Input
									className="h-7 py-1 text-2xs font-normal placeholder:text-2xs placeholder:font-normal disabled:px-0 disabled:shadow-none disabled:h-fit disabled:border-none disabled:bg-transparent  disabled:hover:cursor-default disabled:text-foreground disabled:opacity-100"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									disabled={!isEdit}
								/>
							</div>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label htmlFor="lastName">Last Name</FormCard.Label>
							<Input
								className="h-7 py-1 text-2xs font-normal placeholder:text-2xs placeholder:font-normal disabled:px-0 disabled:shadow-none disabled:h-fit disabled:border-none disabled:bg-transparent  disabled:hover:cursor-default disabled:text-foreground disabled:opacity-100"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								disabled={!isEdit}
							/>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label htmlFor="emailAddress">
								Email address
							</FormCard.Label>
							<Input
								className="h-7 py-1 text-2xs font-normal placeholder:text-2xs placeholder:font-normal disabled:px-0 disabled:shadow-none disabled:h-fit disabled:border-none disabled:bg-transparent  disabled:hover:cursor-default disabled:text-foreground disabled:opacity-100"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={!isEdit}
							/>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label htmlFor="mobileNumber">
								Mobile Number
							</FormCard.Label>
							<Input
								className="h-7 py-1 text-2xs font-normal placeholder:text-2xs placeholder:font-normal disabled:px-0 disabled:shadow-none disabled:h-fit disabled:border-none disabled:bg-transparent  disabled:hover:cursor-default disabled:text-foreground disabled:opacity-100"
								value={mobile}
								onChange={(e) => setMobile(e.target.value)}
								disabled={!isEdit}
							/>
						</FormCard.Field>
					</FormCard.Body>
				</div>
			</FormCard.Body>
		</FormCard>
	);
};

export default AccountSettingsForm;
