import { Schema, models, model } from "mongoose";

export interface DailyHoursInterface {
	opening: number;
	closing: number;
}

export enum Week {
	monday = "mon",
	tuesday = "tue",
	wednesday = "wed",
	thursday = "thur",
	friday = "fri",
	saturday = "sat",
	sunday = "sun",
}

const DailySchema = new Schema({
	opening: {
		type: Number,
		required: true,
	},
	closing: {
		type: Number,
		required: true,
	},
});

export const Daily =
	models?.DailySchema || model<DailyHoursInterface>("Daily", DailySchema);

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

export default models?.HoursSchema ||
	model<HoursInterface>("Hours", HoursSchema);
