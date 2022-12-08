import { Schema, models, model } from "mongoose";

export interface ContactInterface {
	name: string;
	email: string;
	website?: string;
	comment: string;
	read?: boolean;
	received: Date | (() => Date) | string;
}

const ContactSchema = new Schema<ContactInterface>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	website: {
		type: String,
		required: false,
	},
	comment: {
		type: String,
		required: true,
	},
	read: {
		type: Boolean,
		required: false,
		default: false,
	},
	received: {
		type: Date,
		default: () => {
			let d = new Date().toLocaleString("en-US", {
				timeZone: "America/Chicago",
			});
			return d;
		},
	},
});

ContactSchema.alias("_id", "id");

export default models?.Contact ||
	model<ContactInterface>("Contact", ContactSchema);
