import { Schema, models, model } from "mongoose";

interface SpecialEventInterface {
	datePosted: () => Date | Date;
	validUntil?: Date;
	title: string;
	content: string;
	bannerImage: string;
}

const SpecialEventSchema = new Schema<SpecialEventInterface>({
	datePosted: {
		type: Date,
		default: Date(),
	},
	validUntil: {
		type: Date,
		// if no valid until, leave up indefinitely
		required: false,
	},
	content: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	bannerImage: {
		type: String,
		required: false,
	},
});

export default models?.SpecialEvent ||
	model<SpecialEventInterface>("SpecialEvent", SpecialEventSchema);
