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

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
	// console.log(`req.body: ${req.body}`.bgGreen.black);
	try {
		/// @ts-ignore
		let images = req.files?.map((f: multerFileType) => `${f.filename}`);
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
		let updateGeneralPosts: any[] = [];

		for (const _id of ids) {
			let _general = await GeneralPost.findByIdAndUpdate(_id, props, {
				new: true,
			});
			updateGeneralPosts.push(_general);
		}
		let returnData = updateGeneralPosts.map((v) => {
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
