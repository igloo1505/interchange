import nc from "next-connect";
// import Volunteer from "../../models/Volunteer";
import Volunteer from "../../models/Volunteer";
import Patron from "../../models/Patron";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../types/ErrorResponse";
import connectDB from "../../utils/connectMongo";
import "colors";
import fs from "fs";

import Featured from "../../models/Featured";
import GeneralPost from "../../models/GeneralPost";

const handler = nc();
let modelMap = {
	volunteers: Volunteer,
	patrons: Patron,
	featured: Featured,
	generalPost: GeneralPost,
};

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	// console.log(`req.body: ${req.body}`.bgGreen.black);
	try {
		let { id, resource, index } = req.body;
		let m: any = modelMap[resource];
		let x = await m.findById(id);
		if (!x) {
			let _e: ErrorResponse = {
				error: "Model not found",
				consoleMessage: `Could not locate resource=${resource} id=${id}`,
				statusCode: 500,
			};
			return sendError(_e, res);
		}

		let updated = await m.findByIdAndUpdate(
			id,
			{
				primaryImageIndex: index,
			},
			{
				new: true,
			}
		);

		res.json({ response: updated, success: true });
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Something went wrong updating that volunteer.",
			statusCode: 500,
		};
		sendError(errorResponse, res);
	}
});

export default connectDB(handler);
