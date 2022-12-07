import { Schema, models, model, ObjectId } from "mongoose";
import Hours, { HoursInterface } from "./Hours";
import SpecialHours, { SpecialHoursInterface } from "./SpecialHours";

interface ContentInterface {
	hours: HoursInterface;
	specialHours?: SpecialHoursInterface;
	dateUpdated: (() => Date) | string;
}

const ContentSchema = new Schema<ContentInterface>({
	hours: {
		type: Schema.Types.ObjectId,
		ref: Hours,
		required: true,
	},
	specialHours: {
		type: [Schema.Types.ObjectId],
		ref: SpecialHours,
		required: false,
		default: [],
	},
	dateUpdated: {
		type: Date,
		required: false,
		default: Date(),
	},
});

ContentSchema.pre("save", function (next) {
	this.dateUpdated = Date();
	next();
});

export default models?.Content ||
	model<ContentInterface>("Content", ContentSchema);
