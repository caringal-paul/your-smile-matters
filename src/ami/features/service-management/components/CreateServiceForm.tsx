import { useForm } from "react-hook-form";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import FormCard from "@/ami/shared/components/card/FormCard";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Form, FormField } from "@/core/components/base/form";
import { cn } from "@/core/lib/utils";
import { Switch } from "@/core/components/base/switch";
import { Label } from "@/core/components/base/label";

import {
	serviceCreateSchema,
	ServiceAmiCreate,
} from "../utils/schemas/service.schema";
import TextAreaEditor from "@/ami/shared/components/input/TextAreaEditor";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";

const CreateServiceForm = () => {
	const form = useForm<ServiceAmiCreate>({
		resolver: zodResolver(serviceCreateSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			description: "",
			category: "",
			is_available: false,
		},
	});

	const onSubmit = (values: ServiceAmiCreate) => {
		console.log(values);
	};

	return (
		<FormCard className={cn("mt-0")}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormCard.Body className="my-2">
						<FormCard.Title hasSeparator>Service Details</FormCard.Title>

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormCard.Field>
									<FormCard.Label>Service Name</FormCard.Label>
									<Input
										className="text-2xs"
										placeholder="Enter service name"
										{...field}
									/>
								</FormCard.Field>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormCard.Field className={`items-start`}>
									<FormCard.Label>Description</FormCard.Label>
									<div className="flex flex-row w-full overflow-hidden">
										{/* {isViewForm ? (
											<div className="font-normal rich-text text-2xs">
												{parse(String(field.value))}
											</div>
										) : ( */}
										<TextAreaEditor
											description={field.value}
											// placeholder="Enter a description"
											onChange={field.onChange}
										/>
										{/* )} */}
									</div>
								</FormCard.Field>
							)}
						/>

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormCard.Field>
									<FormCard.Label>Category</FormCard.Label>

									<Select
										value={field.value}
										onValueChange={(value) => field.onChange(value)}
									>
										<SelectTrigger
											className={`w-full ${
												!field.value ? "text-gray-400" : "text-foreground"
											}`}
										>
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="photography">Photography</SelectItem>
												<SelectItem value="beauty">Beauty</SelectItem>
												<SelectItem value="styling">Styling</SelectItem>
												<SelectItem value="equipment">Equipment</SelectItem>
												<SelectItem value="other">Other</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormCard.Field>
							)}
						/>

						<div className="pt-1">
							<FormField
								control={form.control}
								name="is_available"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label htmlFor="is_available">
											Availability
										</FormCard.Label>
										<div className="flex items-center gap-2">
											<Switch
												checked={field.value}
												onCheckedChange={(checked) => {
													field.onChange(checked);
												}}
											/>

											<div className="relative h-4 w-fit">
												<Label
													className={`absolute transition-opacity duration-300 text-2xs font-normal ${
														field.value ? "opacity-0" : "opacity-100"
													}`}
												>
													Unavailable
												</Label>
												<Label
													className={`absolute transition-opacity duration-300 text-2xs font-normal ${
														field.value ? "opacity-100" : "opacity-0"
													}`}
												>
													Available
												</Label>
											</div>
										</div>
									</FormCard.Field>
								)}
							/>
						</div>
					</FormCard.Body>

					{/* Form Actions */}
					<FormCard.Footer className="flex justify-end gap-2">
						<Button
							variant="secondary"
							type="button"
							disabled={!form.formState.isDirty}
							onClick={(e) => {
								e.stopPropagation();
								e.preventDefault();

								form.reset();
							}}
						>
							Clear
						</Button>
						<Button
							className="sm:w-fit"
							onClick={() => onSubmit(form.getValues())}
							disabled={!form.formState.isDirty || !form.formState.isValid}
						>
							Create Package
						</Button>
					</FormCard.Footer>
				</form>
			</Form>
		</FormCard>
	);
};

export default CreateServiceForm;
