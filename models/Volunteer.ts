import { Schema, models, model } from "mongoose";
import { parsePhone } from "../utils/utilityFunctions";
export interface VolunteerInterface {
	datePosted?: Date | (() => Date) | string;
	description: string;
	email?: string;
	name: {
		first?: string;
		last?: string;
	};
	quote: {
		string?: string;
		// Use index to allow Interchange to define after which paragraph quote will appear.
		// NOTE: Make sure to account for indexs that are out of range. If index is above maximum possible, place at end of last paragraph. If no index, place after first paragraph.
		index?: number;
	};
	image?: string;
	phone?: number | string | undefined;
	regularJob?: string;
	id?: Schema.Types.ObjectId;
}

const VolunteerSchema = new Schema<VolunteerInterface>({
	name: {
		first: {
			type: String,
			required: false,
		},
		last: {
			type: String,
			required: false,
		},
	},
	email: {
		type: String,
		required: false,
	},
	phone: {
		type: Number,
		required: false,
	},
	regularJob: {
		type: String,
		required: false,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: false,
	},
	quote: {
		string: {
			type: String,
			required: false,
		},
		index: {
			type: Number,
			// BUG: change this to using default only if quote.string exists.
			required: () => {
				/// @ts-ignore
				return Boolean(this?.quote?.string);
			},
			default: () => {
				/// @ts-ignore
				return this?.quote?.string ? 1 : null;
			},
		},
	},
	datePosted: {
		type: Date,
		// required: false,
		default: () => {
			let d = new Date().toLocaleString("en-US", {
				timeZone: "America/Chicago",
			});
			return d;
		},
	},
});

VolunteerSchema.alias("_id", "id");

export default models?.Volunteer ||
	model<VolunteerInterface>("Volunteer", VolunteerSchema);
