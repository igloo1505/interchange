import nc from "next-connect";
import GeneralPost from "../../../models/GeneralPost";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";
const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let generalPosts = [];
		let ids = req.body.id
			? [req.body.id]
			: req.body.ids
			? [...req.body.ids]
			: [];
		console.log("ids: ".red, ids);
		for (var i = 0; i < ids.length; i++) {
			let general = await GeneralPost.findById(ids[i]);
			generalPosts.push(general);
		}
		if (generalPosts.length === 0) {
			let errorResponse: ErrorResponse = {
				error: "General Post not found",
				displayMessage: `General Post${
					ids.length > 1 ? "s were" : " was"
				} not found. It may have already been deleted.`,
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		for (let i = 0; i < generalPosts.length; i++) {
			const v = generalPosts[i];
			debugger;
			await v.clearImages();
			await GeneralPost.findByIdAndDelete(v.id || v._id);
		}

		let response = {
			response: generalPosts.forEach((v) =>
				v.toObject({
					getters: true,
					virtuals: true,
				})
			),
			success: true,
		};

		console.log("response: ", response);
		res.json(response);
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Something went wrong removing that post.",
			statusCode: 500,
		};
		sendError(errorResponse, res);
	}
});

export default connectDB(handler);
