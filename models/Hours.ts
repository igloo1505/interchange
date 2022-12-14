import { Schema, models, model } from "mongoose";
import Daily, { DailyHoursInterface } from "./Daily";
import { dayKeys } from "../utils/utilityFunctions";
import { ObjectId } from "mongodb";
export enum Week {
	monday = "mon",
	tuesday = "tue",
	wednesday = "wed",
	thursday = "thur",
	friday = "fri",
	saturday = "sat",
	sunday = "sun",
}

export interface HoursInterface {
	mon: DailyHoursInterface;
	tue: DailyHoursInterface;
	wed: DailyHoursInterface;
	thur: DailyHoursInterface;
	fri: DailyHoursInterface;
	sat: DailyHoursInterface;
	sun: DailyHoursInterface;
}

const HoursSchema = new Schema<HoursInterface>(
	{
		mon: {
			type: Schema.Types.ObjectId,
			ref: "Daily",
			required: false,
			autopopulate: true,
		},
		tue: {
			type: Schema.Types.ObjectId,
			ref: "Daily",
			required: false,
			autopopulate: true,
		},
		wed: {
			type: Schema.Types.ObjectId,
			ref: "Daily",
			required: false,
			autopopulate: true,
		},
		thur: {
			type: Schema.Types.ObjectId,
			ref: "Daily",
			required: false,
			autopopulate: true,
		},
		fri: {
			type: Schema.Types.ObjectId,
			ref: "Daily",
			required: false,
			autopopulate: true,
		},
		sat: {
			type: Schema.Types.ObjectId,
			ref: "Daily",
			required: false,
			autopopulate: true,
		},
		sun: {
			type: Schema.Types.ObjectId,
			ref: "Daily",
			required: false,
			autopopulate: true,
		},
	},
	{
		timestamps: true,
		methods: {
			async clearSubdocs() {
				for (let i = 0; i < dayKeys.length; i++) {
					const k = dayKeys[i];
					debugger;
					if (this[k]) {
						await Daily.findByIdAndRemove(this[k]._id || this[k]);
					}
				}
			},
		},
	}
);

HoursSchema.plugin(require("mongoose-autopopulate"));

export default models?.Hours || model<HoursInterface>("Hours", HoursSchema);
