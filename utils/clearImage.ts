import axios from "axios";
import { Schema } from "mongoose";

interface clearImageInterface {
	id: Schema.Types.ObjectId;
	resource: string;
}
export const clearImage = async ({ id, resource }: clearImageInterface) => {
	let res = await axios.post(
		"/api/clearImage",
		{
			id,
			resource,
		},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return res;
};
