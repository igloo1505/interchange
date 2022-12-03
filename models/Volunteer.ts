import { Schema, models, model } from "mongoose";

interface VolunteerInterface {
	datePosted: Date;
	description: string[];
	name: {
		firstName?: string;
		lastName?: string;
	};
	quote: {
		string?: string;
		// Use index to allow Interchange to define after which paragraph quote will appear.
		// NOTE: Make sure to account for indexs that are out of range. If index is above maximum possible, place at end of last paragraph. If no index, place after first paragraph.
		index?: number;
	};
	regularJob?: string;
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
	regularJob: {
		type: String,
		required: false,
	},
	description: {
		type: [String],
		required: true,
	},
	quote: {
		string: {
			type: String,
			required: false,
		},
		index: {
			type: number,
			// BUG: change this to using default only if quote.string exists.
			required: false,
			default: 1,
		},
	},
	datePosted: {
		type: Date,
		required: true,
		default: Date(),
	},
});

export default models?.Volunteer ||
	model<VolunteerInterface>("Volunteer", VolunteerSchema);
