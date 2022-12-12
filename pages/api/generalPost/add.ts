import nc from "next-connect";
import GeneralPost from "../../../models/GeneralPost";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";
import {
	multerUpload_middleware,
	multerFileType,
} from "../../../utils/imageHandler";

const handler = nc();
handler.use(multerUpload_middleware.any());

handler.post(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
	try {
		console.log(`req: ${req}`.red);
		debugger;
		let images = req.files?.map((f: multerFileType) => `${f.filename}`);
		let general = new GeneralPost({
			...req.body,
			images: images,
		});

		if (!general) {
			let errorResponse: ErrorResponse = {
				error: "Failed creating Featured Event.",
				displayMessage: "Sorry. Something went wrong.",
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		let savedGeneralPost = await general.save();

		console.log("savedGeneralPost: ", savedGeneralPost);

		res.json({
			result: savedGeneralPost.toObject({
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
