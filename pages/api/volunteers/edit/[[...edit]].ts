import nc from "next-connect";
import Volunteer from "../../../../models/Volunteer";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../../types/ErrorResponse";
import connectDB from "../../../../utils/connectMongo";
import "colors";
import {
	multerFileType,
	multerUpload_middleware,
} from "../../../../utils/imageHandler";
import multiparty from "multiparty";
import path from "path";

const handler = nc();
handler.use(multerUpload_middleware.any());

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
	// console.log(`req.body: ${req.body}`.bgGreen.black);
	try {
		let images = req?.files?.map((f: multerFileType) => `${f.filename}`);
		let props = {
			...req.body,
			images: images,
		};
		console.log("Props", props);
		let ids: any[] = props?.ids ? props.ids : [props.id];
		console.log("ids: ", ids);
		if (!ids) {
			let errorResponse: ErrorResponse = {
				error: "No ids passed to update",
				displayMessage: "Something went wrong updating that volunteer.",
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}

		// let data: any = req.body.data;
		if (!props) {
			let errorResponse: ErrorResponse = {
				error: "No data passed to update",
				displayMessage: "Something went wrong updating that volunteer.",
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		let updatedVolunteers: any[] = [];

		for (const _id of ids) {
			let _volunteer = await Volunteer.findByIdAndUpdate(_id, props, {
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

export const config = {
	api: {
		bodyParser: false,
	},
};
