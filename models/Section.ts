import { Schema, models, model } from "mongoose";

export interface SectionInterface {
	content: string;
	title?: string;
}

const SectionSchema = new Schema<SectionInterface>({
	content: String,
	title: {
		type: String,
		required: false,
	},
});

export default models?.Section ||
	model<SectionInterface>("Section", SectionSchema);
