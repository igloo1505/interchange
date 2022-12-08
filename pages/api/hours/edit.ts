import nc from "next-connect";
import Hours from "../../../models/Hours";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";
import multiparty from "multiparty";

const handler = nc();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
	// console.log(`req.body: ${req.body}`.bgGreen.black);
	try {
		const form = new multiparty.Form();
		await new Promise((resolve, reject) => {
			form.parse(req, function (err, fields, files) {
				if (err) reject({ err });
				resolve({ fields, files });
			});
		});
		if (!req.body.id && !req.body.ids) {
			let errorResponse: ErrorResponse = {
				error: "No data passed to update",
				displayMessage: "Something went wrong updating that hour.",
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		let ids: any[] = req.body?.ids ? req.body.ids : [req.body.id];
		if (!ids) {
			let errorResponse: ErrorResponse = {
				error: "No ids passed to update",
				displayMessage: "Something went wrong updating that hour.",
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}

		let updatedHours: any[] = [];

		for (const _id of ids) {
			let _hour = await Hours.findByIdAndUpdate(_id, req.body, {
				new: true,
			});
			updatedHours.push(_hour);
		}

		let returnData = updatedHours.map((v) => {
			return v.toObject({ getters: true, virtuals: true });
		});
		res.json({ response: returnData, success: true });
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Something went wrong updating that hour model.",
			statusCode: 500,
		};
		sendError(errorResponse, res);
	}
});

export default connectDB(handler);

export const config = {
	api: {
		bodyParser: false,
	},
};
