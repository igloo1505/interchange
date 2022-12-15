import { Schema, models, model } from "mongoose";
import { removeImage, clearAllImages } from "../utils/imageHandler";
import checkIsValid from "../utils/checkIsValid";
export interface VolunteerInterface {
	datePosted?: Date | (() => Date) | string;
	description: string;
	email?: string;
	primaryImageIndex?: number;
	_model?: string;
	_id: string;
	name: {
		first?: string;
		last?: string;
	};
	quote?: {
		string?: string;
		// Use index to allow Interchange to define after which paragraph quote will appear.
		// NOTE: Make sure to account for indexs that are out of range. If index is above maximum possible, place at end of last paragraph. If no index, place after first paragraph.
		index?: number;
	};
	images?: { path: string; publicUrl: string }[];
	phone?: number | string | undefined;
	regularJob?: string;
	id?: Schema.Types.ObjectId;
}

const VolunteerSchema = new Schema<VolunteerInterface>(
	{
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
		images: {
			type: [
				{
					path: String,
					publicUrl: String,
				},
			],
			required: false,
		},
		primaryImageIndex: {
			type: Number,
			default: 0,
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
		_model: {
			type: String,
			default: "volunteer",
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
	},
	{
		methods: {
			async clearImages() {
				await clearAllImages(this);
			},
			checkValid() {
				return checkIsValid(this);
			},
		},
		timestamps: true,
	}
);

VolunteerSchema.alias("_id", "id");

VolunteerSchema.pre("save", function (next) {
	if (this?.quote?.string && !this?.quote?.index) {
		this.quote.index = 1;
	}
	next();
});

export default models?.Volunteer ||
	model<VolunteerInterface>("Volunteer", VolunteerSchema);
