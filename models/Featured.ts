import { Schema, models, model } from "mongoose";
import { removeImage } from "../utils/imageHandler";
interface FeaturedInterface {
	description: string;
	location?: string;
	url?: string;
	title: string;
	images: string[];
	autoExpire?: (() => Date) | Date | string;
	datePosted: () => Date;
}

const FeaturedSchema = new Schema<FeaturedInterface>(
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
			type: [String],
			required: true,
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
				for (let i = 0; i < this.images.length; i++) {
					const fileName = this.images[i];
					await removeImage(fileName);
				}
			},
		},
	}
);

export default models?.Featured ||
	model<FeaturedInterface>("Featured", FeaturedSchema);
