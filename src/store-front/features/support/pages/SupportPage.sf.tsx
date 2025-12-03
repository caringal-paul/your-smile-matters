import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Textarea } from "@/core/components/base/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/core/components/base/form"; // Adjust import path to your Shadcn Form
import {
	SendSupportPayload,
	sendSupportSchema,
} from "../utils/schema/send-support.sf.schema";
import { useSendSupportMutation } from "@/core/queries/sendSupport.mutation";

export const SupportPage = () => {
	const { mutateAsync: sendSupport } = useSendSupportMutation();

	const form = useForm<SendSupportPayload>({
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
		resolver: zodResolver(sendSupportSchema),
		mode: "onSubmit",
	});

	const onSubmit = async (data: SendSupportPayload) => {
		try {
			await sendSupport(data);

			form.reset();
		} catch (error) {
			console.error("Failed to send support message:", error);
		}
	};

	return (
		<div className="flex flex-row gap-4 mx-auto container w-full py-8">
			<div className="w-full space-y-4">
				{/* Contact Info Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<div className="bg-white border border-border rounded-lg shadow-sm p-6 flex items-center gap-4">
						<div className="bg-primary/20 p-3 rounded-lg">
							<Phone className="w-6 h-6 text-primary" />
						</div>
						<div>
							<p className="text-foreground font-medium">+63 992 855 9444</p>
						</div>
					</div>

					<div className="bg-white border border-border rounded-lg shadow-sm p-6 flex items-center gap-4">
						<div className="bg-secondary/20 p-3 rounded-lg">
							<Mail className="w-6 h-6 text-secondary" />
						</div>
						<div>
							<p className="text-foreground font-medium">
								ysmphotography@yopmail.com
							</p>
						</div>
					</div>

					<div className="bg-white border border-border rounded-lg shadow-sm p-6 flex items-center gap-4">
						<div className="bg-primary/20 p-3 rounded-lg">
							<MapPin className="w-6 h-6 text-primary" />
						</div>
						<div>
							<p className="text-foreground font-medium">Manila, Philippines</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Contact Form */}
					<div className="bg-white rounded-lg border border-border shadow-sm p-8">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Full Name*</FormLabel>
												<FormControl>
													<Input
														className="h-12"
														{...field}
														placeholder="Enter Your Full Name"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email*</FormLabel>
												<FormControl>
													<Input
														className="h-12"
														{...field}
														type="email"
														placeholder="Enter Your Email"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name="subject"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Subject*</FormLabel>
											<FormControl>
												<Input
													className="h-12"
													{...field}
													placeholder="Enter Your Subject"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="message"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Message*</FormLabel>
											<FormControl>
												<Textarea
													className="min-h-[200px] resize-none"
													{...field}
													placeholder="Write Your Message"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									type="submit"
									className="bg-primary hover:bg-admin-primary-hover text-white px-8 py-6 text-base rounded-md"
								>
									Send Message
								</Button>
							</form>
						</Form>
					</div>

					{/* Google Map */}
					<div className="bg-white rounded-lg shadow-sm overflow-hidden">
						<div className="relative w-full h-full min-h-[500px]">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247117.89678199767!2d120.98227953744929!3d14.599512393427687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca03571ec38b%3A0x69d1d5751069c11f!2sManila%2C%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2sph!4v1234567890123!5m2!1sen!2sph"
								width="100%"
								height="100%"
								style={{ border: 0 }}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								className="absolute inset-0"
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SupportPage;
