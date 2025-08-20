import { type Editor } from "@tiptap/react";
import { ToggleGroup } from "../../../../../core/components/base/toggle-group";
import BoldIcon from "@/ami/shared/assets/icons/BoldIcon";
import ItalicIcon from "@/ami/shared/assets/icons/ItalicIcon";
import UnderlineIcon from "@/ami/shared/assets/icons/UnderlineIcon";
import { Separator } from "../../../../../core/components/base/separator";
import StrikethroughIcon from "@/ami/shared/assets/icons/StrikethroughIcon";

import BulletIcon from "@/ami/shared/assets/icons/BulletIcon";
import NumberingIcon from "@/ami/shared/assets/icons/NumberingIcon";
import { Toggle } from "../../../../../core/components/base/toggle";

type TextAreaEditorToolbarProps = {
	editor: Editor | null;
};

const TextAreaEditorToolbar = ({ editor }: TextAreaEditorToolbarProps) => {
	if (!editor) {
		return null;
	}

	return (
		<div className="relative max-h-[34px] h-full w-full bg-toolbar rounded-sm rounded-b-none">
			<ToggleGroup type="multiple" className="justify-start mx-2">
				{/* 1 */}
				<Toggle
					pressed={editor.isActive("bold")}
					onPressedChange={() => editor.chain().focus().toggleBold().run()}
				>
					<BoldIcon className="h-4 w-4" />
				</Toggle>
				<Toggle
					pressed={editor.isActive("italic")}
					onPressedChange={() => editor.chain().focus().toggleItalic().run()}
				>
					<ItalicIcon className="h-4 w-4" />
				</Toggle>
				<Toggle
					pressed={editor.isActive("underline")}
					onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
				>
					<UnderlineIcon className="h-4 w-4" />
				</Toggle>
				<Toggle
					pressed={editor.isActive("strike")}
					onPressedChange={() => editor.chain().focus().toggleStrike().run()}
				>
					<StrikethroughIcon className="h-4 w-4" />
				</Toggle>
				<Separator
					orientation="vertical"
					className="h-[34px] w-[1px] mx-1 bg-toolbar-separator"
				/>

				{/* 2 */}
				{/* <ToggleGroupItem value="justify-left" aria-label="Toggle justify left">
					<JustifyLeftIcon className="h-4 w-4" />
				</ToggleGroupItem>
				<ToggleGroupItem
					value="justify-center"
					aria-label="Toggle justify center"
				>
					<JustifyCenterIcon className="h-4 w-4" />
				</ToggleGroupItem>
				<ToggleGroupItem
					value="justify-right"
					aria-label="Toggle justify right"
				>
					<JustifyRightIcon className="h-4 w-4" />
				</ToggleGroupItem>
				<Separator
					orientation="vertical"
					className="h-[34px] w-[1px] mx-1 bg-toolbar-separator"
				/> */}

				{/* 3 */}

				<Toggle
					pressed={editor.isActive("orderedList")}
					onPressedChange={() =>
						editor.chain().focus().toggleOrderedList().run()
					}
				>
					<NumberingIcon className="h-4 w-4" />
				</Toggle>
				<Toggle
					pressed={editor.isActive("bulletList")}
					onPressedChange={() =>
						editor.chain().focus().toggleBulletList().run()
					}
				>
					<BulletIcon className="h-4 w-4" />
				</Toggle>
			</ToggleGroup>
		</div>
	);
};

export default TextAreaEditorToolbar;
