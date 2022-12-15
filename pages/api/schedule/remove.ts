import nc from "next-connect";
import Hours from "../../../models/Hours";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";
import { ObjectId } from "mongodb";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let hours = [];
		let ids = req.body.id
			? [req.body.id]
			: req.body.ids
			? [...req.body.ids]
			: [];
		console.log("ids: ".red, ids);
		for (var i = 0; i < ids.length; i++) {
			let hour = await Hours.findById(ids[i]);
			hours.push(
				/// @ts-ignore
				hour.toObject({
					getters: true,
					virtuals: true,
				})
			);
		}
		if (hours.length === 0) {
			let errorResponse: ErrorResponse = {
				error: "hour not found",
				displayMessage: `hour${
					ids.length > 1 && "s"
				} was not found. It may have already been deleted.`,
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		// await hours.forEach(

		// );
		for (let i = 0; i < hours.length; i++) {
			const h = hours[i];
			// await h.clearSubdocs();
			/// @ts-ignore
			let _h = await Hours.findById(h.id);
			await _h.clearSubdocs();
			// await Hours.findByIdAndRemove(h.id || h._id);
			await _h.remove();
		}

		let response = {
			response: hours,
			success: true,
		};
		console.log("response: ", response);
		res.json(response);
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Something went wrong removing that hour model.",
			statusCode: 500,
		};
		sendError(errorResponse, res);
	}
});

export default connectDB(handler);
