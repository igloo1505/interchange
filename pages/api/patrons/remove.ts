import nc from "next-connect";
import Patron from "../../../models/Patron";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let patrons = [];
		let ids = req.body.id
			? [req.body.id]
			: req.body.ids
			? [...req.body.ids]
			: [];
		console.log("ids: ".red, ids);
		for (var i = 0; i < ids.length; i++) {
			let patron = await Patron.findById(ids[i]);
			patrons.push(patron);
		}
		if (patrons.length === 0) {
			let errorResponse: ErrorResponse = {
				error: "Patron not found",
				displayMessage: `Patron${
					ids.length > 1 && "s"
				} was not found. It may have already been deleted.`,
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		for (let i = 0; i < patrons.length; i++) {
			const v = patrons[i];
			await v.clearImages();
			await Patron.findByIdAndRemove(v.id || v._id);
		}

		let response = {
			response: patrons.map((v) =>
				v.toObject({
					getters: true,
					virtuals: true,
				})
			),
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
