import { Schema, models, model } from "mongoose";
import { removeImage, clearAllImages } from "../utils/imageHandler";

export interface GeneralPostInterface {
	description: string;
	location?: string;
	url?: string;
	title: string;
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
			default: 1,
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
		},
	}
);

export default models?.GeneralPost ||
	model<GeneralPostInterface>("GeneralPost", GeneralPostSchema);
