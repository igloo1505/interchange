import nc from "next-connect";
import Featured from "../../../models/Featured";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";
import {
	multerUpload_middleware,
	multerFileType,
	getImageFromReq,
} from "../../../utils/imageHandler";

const handler = nc();
handler.use(multerUpload_middleware.any());

handler.post(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
	try {
		console.log(`req: ${req}`.red);
		debugger;
		let images = await getImageFromReq(req, "FeaturedPost");
		let featured = new Featured({
			...req.body,
			images: images,
		});
		console.log("featured: ", featured);
		if (!featured) {
			let errorResponse: ErrorResponse = {
				error: "Failed creating Featured Event.",
				displayMessage: "Sorry. Something went wrong.",
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		let savedFeaturedEvent = await featured.save();

		console.log("savedFeaturedEvent: ", savedFeaturedEvent);

		res.json({
			result: savedFeaturedEvent.toObject({
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
