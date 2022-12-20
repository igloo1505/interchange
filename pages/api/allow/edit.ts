import nc from "next-connect";
import AllowAccess from "../../../models/AllowAccess";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";
import multer from "multer";
import bcrypt from "bcrypt";

const handler = nc();
handler.use(multer().any());

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
	// console.log(`req.body: ${req.body}`.bgGreen.black);
	try {
		if (!req.body.id && !req.body.ids) {
			let errorResponse: ErrorResponse = {
				error: "No data passed to update",
				displayMessage: "Something went wrong updating that permitted email.",
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		let ids: any[] = req.body?.ids ? req.body.ids : [req.body.id];

		let updatedAllows: any[] = [];
		for (const _id of ids) {
			let currentAccess = await AllowAccess.findById(_id);
			if (!currentAccess) {
				return res
					.status(500)
					.json({ success: false, error: "User not found." });
			}
			if (req.body.password && req.body.password !== currentAccess.password) {
				let salt = await bcrypt.genSalt(10);
				let hashedPassword = await bcrypt.hash(req.body.password, salt);
				req.body.password = hashedPassword;
			}
			let _allow = await AllowAccess.findByIdAndUpdate(_id, req.body, {
				new: true,
			});
			updatedAllows.push(_allow);
		}

		let returnData = updatedAllows.map((v) => {
			return v.toObject({ getters: true, virtuals: true });
		});
		res.json({ response: returnData, success: true });
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Something went wrong updating that contact.",
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
