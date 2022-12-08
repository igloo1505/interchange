import { Schema, models, model } from "mongoose";
import { DailyHoursInterface, Daily } from "./Daily";

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

const HoursSchema = new Schema<HoursInterface>({
	mon: {
		type: Schema.Types.ObjectId,
		ref: Daily,
		required: false,
	},
	tue: {
		type: Schema.Types.ObjectId,
		ref: Daily,
		required: false,
	},
	wed: {
		type: Schema.Types.ObjectId,
		ref: Daily,
		required: false,
	},
	thur: {
		type: Schema.Types.ObjectId,
		ref: Daily,
		required: false,
	},
	fri: {
		type: Schema.Types.ObjectId,
		ref: Daily,
		required: false,
	},
	sat: {
		type: Schema.Types.ObjectId,
		ref: Daily,
		required: false,
	},
	sun: {
		type: Schema.Types.ObjectId,
		ref: Daily,
		required: false,
	},
});

export default models?.Hours || model<HoursInterface>("Hours", HoursSchema);
