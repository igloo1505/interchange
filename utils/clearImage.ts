import axios from "axios";
import { Schema } from "mongoose";

interface clearImageInterface {
	id: Schema.Types.ObjectId;
	resource: string;
	filename: string;
	path: string;
}
export const clearImage = async ({
	id,
	resource,
	filename,
	path,
}: clearImageInterface) => {
	let res = await axios.post(
		"/api/clearImage",
		{
			id,
			resource,
			filename,
			path,
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
	path,
}: {
	id: string;
	resource: string;
	index: number;
	path: string;
}) => {
	let res = await axios.post(
		"/api/setPrimaryImageIndex",
		{
			id,
			resource,
			index,
			path,
		},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return res;
};
