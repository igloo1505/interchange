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
			toolbar={
				<RichTextInputToolbar>
					<LevelSelect size={buttonSize} />
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
