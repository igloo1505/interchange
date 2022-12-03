import { Schema, models, model, ObjectId } from "mongoose";
import Section, { SectionInterface } from "./Section";

interface ContentInterface {
	sections: ObjectId[];
	dateUpdated: () => Date;
}

const ContentSchema = new Schema<ContentInterface>({
	sections: {
		type: [Schema.Types.ObjectId],
		required: true,
	},
	dateUpdated: {
		type: Date,
		required: false,
		default: Date(),
	},
});

export default models?.Content ||
	model<ContentInterface>("Content", ContentSchema);
