import nc from "next-connect";
import Featured from "../../../models/Featured";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";
const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let featureds = [];
		let ids = req.body.id
			? [req.body.id]
			: req.body.ids
			? [...req.body.ids]
			: [];
		console.log("ids: ".red, ids);
		for (var i = 0; i < ids.length; i++) {
			let featured = await Featured.findById(ids[i]);
			/// @ts-ignore
			featureds.push(featured);
		}
		if (featureds.length === 0) {
			let errorResponse: ErrorResponse = {
				error: "Featured Event not found",
				displayMessage: `Featured Event${
					ids.length > 1 ? "s were" : " was"
				} not found. It may have already been deleted.`,
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		for (let i = 0; i < featureds.length; i++) {
			const v = featureds[i];
			debugger;
			/// @ts-ignore
			await v.clearImages();
			/// @ts-ignore
			await Featured.findByIdAndDelete(v.id || v._id);
		}

		let response = {
			response: featureds.forEach((v) =>
				/// @ts-ignore
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
			displayMessage: "Something went wrong removing that volunteer.",
			statusCode: 500,
		};
		sendError(errorResponse, res);
	}
});

export default connectDB(handler);
