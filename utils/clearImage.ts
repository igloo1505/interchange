import axios from "axios";
import { Schema } from "mongoose";

interface clearImageInterface {
	id: Schema.Types.ObjectId;
	resource: string;
	filename?: string;
}
export const clearImage = async ({
	id,
	resource,
	filename,
}: clearImageInterface) => {
	let res = await axios.post(
		"/api/clearImage",
		{
			id,
			resource,
			filename,
		},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return res;
};

export const setPrimaryImageIndex = async ({
	id,
	resource,
	index,
}: {
	id: string;
	resource: string;
	index: number;
}) => {
	let res = await axios.post(
		"/api/setPrimaryImageIndex",
		{
			id,
			resource,
			index,
		},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return res;
};
