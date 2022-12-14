import nc from "next-connect";
import AllowAccess from "../../../models/AllowAccess";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let permitted = [];
		let ids = req.body.id
			? [req.body.id]
			: req.body.ids
			? [...req.body.ids]
			: [];
		for (var i = 0; i < ids.length; i++) {
			let contact = await AllowAccess.findById(ids[i]);
			permitted.push(
				contact.toObject({
					getters: true,
					virtuals: true,
				})
			);
		}
		if (permitted.length === 0) {
			let errorResponse: ErrorResponse = {
				error: "contact not found",
				displayMessage: `contact${
					ids.length > 1 && "s"
				} was not found. It may have already been deleted.`,
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		for (let i = 0; i < permitted.length; i++) {
			const v = permitted[i];
			await AllowAccess.findByIdAndRemove(v.id || v._id);
		}

		let response = {
			response: permitted,
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
