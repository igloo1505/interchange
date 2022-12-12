import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../../types/ErrorResponse";
import connectDB from "../../../../utils/connectMongo";
import "colors";
import {
	multerUpload_middleware,
	handleUpdateWithImage,
} from "../../../../utils/imageHandler";

const handler = nc();
handler.use(multerUpload_middleware.any());

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
	// console.log(`req.body: ${req.body}`.bgGreen.black);
	try {
		let ids: any[] = req.body?.ids ? req.body.ids : [req.body.id];
		if (!ids) {
			let errorResponse: ErrorResponse = {
				error: "No ids passed to update",
				displayMessage: "Something went wrong updating that volunteer.",
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		let updatedVolunteers: any[] = [];
		for (const _id of ids) {
			let _volunteer = await handleUpdateWithImage(req, "Volunteer");
			updatedVolunteers.push(_volunteer);
		}

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

export const config = {
	api: {
		bodyParser: false,
	},
};
