import { Schema, models, model, ObjectId } from "mongoose";
import Hours, { HoursInterface, Week } from "./Hours";
import Daily from "./Daily";

export interface SpecialHoursInterface {
	hours: HoursInterface;
	dateApplicable: Date | (() => Date) | Week;
	recurring?: boolean;
	dateUpdated: (() => Date) | string;
}

const SpecialHoursSchema = new Schema<SpecialHoursInterface>({
	hours: {
		type: Schema.Types.ObjectId,
		ref: Daily,
		required: true,
	},
	dateApplicable: {
		type: Date || String,
		required: true,
	},
	recurring: {
		type: Boolean,
		default: false,
		validate: (dataInValidateSpecialHours: any) => {
			console.log("dataInValidateSpecialHours: ", dataInValidateSpecialHours);
			let a = Object.keys(Week);
			return (
				/// @ts-ignore
				(this.recurring && a.indexOf(this.dateApplicable) >= 0) ||
				/// @ts-ignore
				!this.recurring
			);
		},
	},
	dateUpdated: {
		type: Date,
		required: false,
		default: Date(),
	},
});

SpecialHoursSchema.pre("save", function (next) {
	this.dateUpdated = Date();
	next();
});

export default models?.SpecialHours ||
	model<SpecialHoursInterface>("SpecialHours", SpecialHoursSchema);
