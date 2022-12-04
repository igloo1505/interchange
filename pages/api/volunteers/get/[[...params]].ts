import nc from "next-connect";
import Volunteer from "../../../../models/Volunteer";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../../types/ErrorResponse";
import { splitByLinebreak } from "../../../../utils/utilityFunctions";
import connectDB from "../../../../utils/connectMongo";
import { parse } from "query-string";
import "colors";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(`req.body: ${req.body}`.bgGreen.black);
	console.log(`req.query: ${req.query}`.red);
	console.log(`stringified req.query: ${JSON.stringify(req.query)}`.red);
	try {
		let volunteers = await Volunteer.find();
		let total = await Volunteer.count();
		console.log("volunteers: ", volunteers);
		console.log("Array.isArray(volunteers): ", Array.isArray(volunteers));
		if (!Array.isArray(volunteers)) {
			console.log("here...");
			volunteers = [volunteers];
		}

		let data = volunteers.map((v) => {
			return v.toObject({ getters: true, virtuals: true });
		});
		let result = { result: { data, total }, success: true };
		console.log(`returning: ${result}`.blue);
		res.json(result);
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Something went wrong retrieving volunteers.",
			statusCode: 500,
		};
		sendError(errorResponse, res);
	}
});

export default connectDB(handler);
