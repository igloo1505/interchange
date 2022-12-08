import nc from "next-connect";
import Hours from "../../../models/Hours";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";
import multiparty from "multiparty";
import multer from "multer";

const handler = nc();
// const upload = uploadMiddleware("patron");
// handler.use(upload);

handler.post(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
	try {
		const form = new multiparty.Form();
		const _data: any = await new Promise((resolve, reject) => {
			form.parse(req, function (err, fields, files) {
				if (err) reject({ err });
				resolve({ fields, files });
			});
		});
		console.log("_data: ", _data);
		let contact = new Hours({
			...req.body,
		});
		if (!contact) {
			let errorResponse: ErrorResponse = {
				error: "Failed creating Contact model.",
				displayMessage: "Sorry. Something went wrong.",
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		let savedContact = await contact.save();

		res.json({
			result: savedContact.toObject({
				getters: true,
				virtuals: true,
			}),
			success: true,
		});
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Sorry. Something went wrong.",
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
