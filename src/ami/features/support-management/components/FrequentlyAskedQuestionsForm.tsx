import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import { FAQ, FAQSchema } from "../utils/schemas/faq.schema";
import parse from "html-react-parser";

// Components
import FormCard from "@/ami/shared/components/card/FormCard";
import TextAreaEditor from "@/ami/shared/components/input/TextAreaEditor";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Form, FormField } from "@/core/components/base/form";
import { cn } from "@/core/lib/utils";

type FrequentlyAskedQuestionsForm = {
	className?: string;
	submitButtonLabel: string;
	cancelButtonLabel: string;
	closeModal?: () => void;
};

const FrequentlyAskedQuestionsForm = ({
	className,
	submitButtonLabel,
	cancelButtonLabel,
	closeModal,
}: FrequentlyAskedQuestionsForm) => {
	const location = useLocation();
	const isPostForm =
		!location.pathname.includes("view") && !location.pathname.includes("edit");

	const isViewForm = location.pathname.includes("view");

	const form = useForm<FAQ>({
		resolver: zodResolver(FAQSchema),
		mode: "onChange",
		defaultValues: {
			question: isViewForm ? "Sample Question" : "",
			answer: isViewForm
				? "<ul><li><p>This is a sample <strong>Answer</strong>!</p></li></ul><ol><li><p><strong>Answer 1</strong></p></li><li><p><em>Answer 2</em></p></li><li><p><u>Answer 3</u></p></li><li><p><s>Answer 4</s></p></li></ol>"
				: "",
		},
	});

	//

	const onSubmit = (values: FAQ) => {
		console.log(values);

		if (isPostForm && closeModal) {
			closeModal();
		}
	};

	return (
		<FormCard className={cn("mt-0", className)}>
			<Form {...form}>
				<form
					// onSubmit={(e) => {
					// 	e.preventDefault();
					// 	onSubmit(form.getValues());
					// }}

					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormCard.Body>
						<FormField
							control={form.control}
							name="question"
							render={({ field }) => (
								<FormCard.Field
									className={`${isPostForm && "flex"} items-start`}
								>
									<FormCard.Label className={`${isPostForm && "hidden"}`}>
										Questions
									</FormCard.Label>
									<Input
										placeholder="Question"
										disabled={isViewForm}
										className="text-2xs"
										{...field}
									/>
								</FormCard.Field>
							)}
						/>
						<FormField
							control={form.control}
							name="answer"
							render={({ field }) => (
								<FormCard.Field
									className={`${isPostForm && "flex w-full"} items-start`}
								>
									<FormCard.Label className={`${isPostForm && "hidden"}`}>
										Answer
									</FormCard.Label>
									<div className="flex flex-row overflow-hidden w-full">
										{isViewForm ? (
											<div className="rich-text text-2xs font-normal">
												{parse(String(field.value))}
											</div>
										) : (
											<TextAreaEditor
												description={field.value}
												onChange={field.onChange}
											/>
										)}
									</div>
								</FormCard.Field>
							)}
						/>
					</FormCard.Body>
					{!isViewForm && (
						<FormCard.Footer className="flex gap-2 justify-end">
							<Button variant="secondary" onClick={closeModal}>
								{cancelButtonLabel}
							</Button>
							<Button className="sm:w-fit" type="submit">
								{submitButtonLabel}
							</Button>
						</FormCard.Footer>
					)}
				</form>
			</Form>
		</FormCard>
	);
};

export default FrequentlyAskedQuestionsForm;
