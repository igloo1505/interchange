import nc from "next-connect";
import Volunteer from "../../../../models/Volunteer";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../../types/ErrorResponse";
import connectDB from "../../../../utils/connectMongo";
import "colors";

const handler = nc();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(`req.body: ${req.body}`.bgGreen.black);
	try {
		/// @ts-ignore
		let ids: any[] = req.body?.ids ? req.body.ids : [req.body.id];
		console.log("ids: ", ids);
		if (!ids) {
			let errorResponse: ErrorResponse = {
				error: "No ids passed to update",
				displayMessage: "Something went wrong updating that volunteer.",
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		let data: any = req.body.data;
		if (!data) {
			let errorResponse: ErrorResponse = {
				error: "No data passed to update",
				displayMessage: "Something went wrong updating that volunteer.",
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		let updatedVolunteers: any[] = [];
		// ids.map(async (_id: string) => {

		// 	console.log(`_volunteer: ${_volunteer}`.cyan);
		// 	// updatedVolunteers.push(_volunteer);
		// 	return _volunteer;
		// });

		for (const _id of ids) {
			let _volunteer = await Volunteer.findByIdAndUpdate(_id, data, {
				new: true,
			});
			updatedVolunteers.push(_volunteer);
		}

		console.log("updatedVolunteers: ", ids);
		let returnData = updatedVolunteers.map((v) => {
			return v.toObject({ getters: true, virtuals: true });
		});
		res.json({ response: returnData, success: true });
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
