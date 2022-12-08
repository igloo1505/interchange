import { Schema, models, model } from "mongoose";
export interface DailyHoursInterface {
	open: number;
	close: number;
}

const DailySchema = new Schema<DailyHoursInterface>({
	open: {
		type: Number,
		required: true,
	},
	close: {
		type: Number,
		required: true,
	},
});

export const Daily =
	models?.Daily || model<DailyHoursInterface>("Daily", DailySchema);
