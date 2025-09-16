// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Placeholder from "@tiptap/extension-placeholder";
// import TextAreaEditorToolbar from "../toolbar/TextAreaEditorToolbar";

// type TextAreaEditorProps = {
// 	description?: string;
// 	onChange: (richText: string) => void;
// };

// const TextAreaEditor = ({ description, onChange }: TextAreaEditorProps) => {
// 	const CustomPlaceholder = Placeholder.extend({
// 		addOptions() {
// 			return {
// 				...this.parent?.(),
// 				placeholder: "Type here...",
// 				showOnlyWhenEditable: true,
// 				emptyEditorClass: "is-empty",
// 			};
// 		},
// 	});

// 	const editor = useEditor({
// 		extensions: [StarterKit, Underline, CustomPlaceholder],
// 		content: description,
// 		editorProps: {
// 			attributes: {
// 				class:
// 					"rich-text px-4 py-4 text-2xs placeholder:text-2xs placeholder:font-normal rounded-sm rounded-t-none border border-border bg-white min-h-[150px] ring-none outline-none max-h-[375px] sm:max-h-[575px] md:max-h-[675px] xl:max-h-[380px] xl:max-w-full overflow-scroll",
// 			},
// 		},
// 		onUpdate: ({ editor }) => {
// 			onChange(editor.getHTML());
// 		},
// 	});

// 	return (
// 		<div className="w-full">
// 			<TextAreaEditorToolbar editor={editor} />
// 			<EditorContent editor={editor} />
// 		</div>
// 	);
// };

// export default TextAreaEditor;

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TextAreaEditorToolbar from "../toolbar/TextAreaEditorToolbar";

type TextAreaEditorProps = {
	description?: string;
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
		content: description ?? "",
		editorProps: {
			attributes: {
				class:
					"rich-text px-4 py-4 text-2xs placeholder:text-2xs placeholder:font-normal rounded-sm rounded-t-none border border-border bg-white min-h-[150px] ring-none outline-none max-h-[375px] sm:max-h-[575px] md:max-h-[675px] xl:max-h-[380px] xl:max-w-full overflow-scroll",
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	// 👇 Watch for prop changes and update editor content
	useEffect(() => {
		if (editor && description !== editor.getHTML()) {
			editor.commands.setContent(description || "");
		}
	}, [description, editor]);

	return (
		<div className="w-full">
			<TextAreaEditorToolbar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};

export default TextAreaEditor;
