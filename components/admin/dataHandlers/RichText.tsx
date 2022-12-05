import {
	DefaultEditorOptions,
	RichTextInput,
	RichTextInputToolbar,
	LevelSelect,
	FormatButtons,
	AlignmentButtons,
	ListButtons,
	LinkButtons,
	QuoteButtons,
	ClearButtons,
} from "ra-input-rich-text";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Ordered from "@tiptap/extension-ordered-list";
import Bullet from "@tiptap/extension-bullet-list";

export const EditorOptions = {
	...DefaultEditorOptions,
	extensions: [
		...DefaultEditorOptions.extensions,
		Heading,
		Bullet,
		Ordered,
		Paragraph,
	],
};

enum buttonSizeEnum {
	small = "small",
	medium = "medium",
	large = "large",
}

interface RichTextInterface {
	buttonSize?: buttonSizeEnum;
	source: string;
	label: string;
}

const RichText = ({
	buttonSize = buttonSizeEnum.small,
	source,
	label,
}: RichTextInterface) => {
	return (
		<RichTextInput
			source={source}
			label={label}
			fullWidth
			editorOptions={EditorOptions}
			toolbar={
				<RichTextInputToolbar>
					<FormatButtons size={buttonSize} />
					<AlignmentButtons size={buttonSize} />
					<ListButtons size={buttonSize} />
					<LinkButtons size={buttonSize} />
					<QuoteButtons size={buttonSize} />
					<ClearButtons size={buttonSize} />
				</RichTextInputToolbar>
			}
		/>
	);
};

export default RichText;
