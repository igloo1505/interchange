import { Schema, model, models } from "mongoose";
import checkIsValid from "../utils/checkIsValid";
export interface AllowedEmailInterface {
	email: string;
	autoExpire?: Date | (() => Date);
}

const AllowedEmailSchema = new Schema<AllowedEmailInterface>(
	{
		email: {
			type: String,
			required: true,
		},
		autoExpire: {
			type: Date,
			required: false,
		},
	},
	{
		methods: {
			checkValid() {
				debugger;
				return checkIsValid(this);
			},
		},
		timestamps: true,
	}
);

export default models?.AllowedEmail ||
	model<AllowedEmailInterface>("AllowedEmail", AllowedEmailSchema);
