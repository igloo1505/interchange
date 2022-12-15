import { Schema, models, model } from "mongoose";
import { removeImage, clearAllImages } from "../utils/imageHandler";
import checkIsValid from "../utils/checkIsValid";
export interface GeneralPostInterface {
	description: string;
	location?: string;
	_model?: string;
	url?: string;
	title: string;
	id: string;
	_id: string;
	images?: { path: string; publicUrl: string }[];
	primaryImageIndex?: number;
	autoExpire?: (() => Date) | Date | string;
	datePosted?: () => Date;
}

const GeneralPostSchema = new Schema<GeneralPostInterface>(
	{
		title: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: false,
		},
		url: {
			type: String,
			required: false,
		},
		description: {
			type: String,
			required: true,
		},
		_model: {
			type: String,
			default: "generalPost",
		},
		images: {
			type: [
				{
					path: String,
					publicUrl: String,
				},
			],
			required: true,
		},
		primaryImageIndex: {
			type: Number,
			default: 0,
		},
		autoExpire: {
			type: Date,
			required: false,
		},
		datePosted: {
			type: Date,
			required: true,
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

export default models?.GeneralPost ||
	model<GeneralPostInterface>("GeneralPost", GeneralPostSchema);
