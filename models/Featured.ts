import { Schema, models, model } from "mongoose";
import { clearAllImages } from "../utils/imageHandler";
import checkIsValid from "../utils/checkIsValid";
export interface FeaturedInterface {
	description: string;
	location?: string;
	primaryImageIndex?: number;
	url?: string;
	title: string;
	images?: { path: string; publicUrl: string }[];
	autoExpire?: (() => Date) | Date | string;
	_id?: string;
	id?: string;
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

export default models?.Featured ||
	model<FeaturedInterface>("Featured", FeaturedSchema);
