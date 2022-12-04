import nc from "next-connect";
// import Volunteer from "../../../models/Volunteer";
import Volunteer from "../../../../models/Volunteer";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../../types/ErrorResponse";
import { splitByLinebreak } from "../../../../utils/utilityFunctions";
import connectDB from "../../../../utils/connectMongo";
import "colors";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(`req.body: ${req.body}`.bgGreen.black);
	let splitString: string[] = splitByLinebreak(req.body.description);

	try {
		let volunteer = new Volunteer({
			...req.body,
			description: splitString,
		});
		console.log("volunteer: ", volunteer);
		let savedVolunteer = await volunteer.save();

		console.log("savedVolunteer: ", savedVolunteer);

		res.json({
			result: savedVolunteer.toObject({
				getters: true,
				virtuals: true,
			}),
			success: true,
		});
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Something went wrong adding that volunteer.",
			statusCode: 500,
		};
		sendError(errorResponse, res);
	}
});

export default connectDB(handler);
