import { Schema, models, model } from "mongoose";
export interface DailyHoursInterface {
	open: string;
	close: string;
}

const DailySchema = new Schema<DailyHoursInterface>({
	open: {
		type: String,
		required: true,
	},
	close: {
		type: String,
		required: true,
	},
});

export default models?.Daily ||
	model<DailyHoursInterface>("Daily", DailySchema);
