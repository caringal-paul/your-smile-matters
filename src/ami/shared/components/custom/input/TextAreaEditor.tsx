import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TextAreaEditorToolbar from "../toolbar/TextAreaEditorToolbar";

type TextAreaEditorProps = {
	description: string;
	onChange: (richText: string) => void;
};

const TextAreaEditor = ({ description, onChange }: TextAreaEditorProps) => {
	const CustomPlaceholder = Placeholder.extend({
		addOptions() {
			return {
				...this.parent?.(),
				placeholder: "Type here...",
				showOnlyWhenEditable: true,
				emptyEditorClass: "is-empty",
			};
		},
	});

	const editor = useEditor({
		extensions: [StarterKit, Underline, CustomPlaceholder],
		content: description,
		editorProps: {
			attributes: {
				class:
					"rich-text px-4 py-4 text-[11px] placeholder:text-[11px] placeholder:font-normal rounded-sm rounded-t-none border border-border bg-white min-h-[150px] ring-none outline-none max-h-[375px] sm:max-h-[575px] md:max-h-[675px] xl:max-h-[380px] max-w-[263px] sm:max-w-[417px] md:max-w-[323.2px] lg:max-w-[417px] xl:max-w-full overflow-scroll",
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	return (
		<div className="w-full">
			<TextAreaEditorToolbar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};

export default TextAreaEditor;
