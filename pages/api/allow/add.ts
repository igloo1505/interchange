import AllowAccess from "../../../models/AllowAccess";
import nc from "next-connect";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";

const handler = nc();
handler.use(multer().none());

handler.post(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
	try {
		const { email, autoExpire } = req.body;
		if (!email) {
			let _e: ErrorResponse = {
				error: "Email not found in req.body",
				consoleMessage: "Error occurred while adding new allowable user.",
			};
			return sendError(_e, res);
		}
		let newAllowable = new AllowAccess({
			email: email,
			...(autoExpire && { autoExpire: autoExpire }),
		});
		let saved = await newAllowable.save();
		res.json({
			result: saved.toObject({
				getters: true,
				virtuals: true,
			}),
			success: true,
		});
	} catch (error) {
		let _e: ErrorResponse = {
			error: error,
			consoleMessage: "Error occurred while adding new allowable user.",
		};
		sendError(_e, res);
	}
});

export default connectDB(handler);

export const config = {
	api: {
		bodyParser: false,
	},
};
