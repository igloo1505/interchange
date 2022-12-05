import nc from "next-connect";
import Volunteer from "../../../../models/Volunteer";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../../types/ErrorResponse";
import connectDB from "../../../../utils/connectMongo";
import "colors";
import { parse } from "querystring";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let volunteers = [];
		let ids = req.body.id
			? [req.body.id]
			: req.body.ids
			? [...req.body.ids]
			: [];
		console.log("ids: ".red, ids);
		for (var i = 0; i < ids.length; i++) {
			let volunteer = await Volunteer.findById(ids[i]);
			volunteers.push(
				volunteer.toObject({
					getters: true,
					virtuals: true,
				})
			);
		}
		if (volunteers.length === 0) {
			let errorResponse: ErrorResponse = {
				error: "Volunteer not found",
				displayMessage: `Volunteer${
					ids.length > 1 && "s"
				} was not found. It may have already been deleted.`,
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		await volunteers.forEach(
			async (v) => await Volunteer.findByIdAndRemove(v.id || v._id)
		);

		let response = {
			response: volunteers,
			success: true,
		};
		console.log("response: ", response);
		res.json(response);
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Something went wrong removing that volunteer.",
			statusCode: 500,
		};
		sendError(errorResponse, res);
	}
});

export default connectDB(handler);
