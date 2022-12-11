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
			featureds.push(featured);
		}
		if (featureds.length === 0) {
			let errorResponse: ErrorResponse = {
				error: "Featured event not found",
				displayMessage: `Featured event${
					ids.length > 1 && "s"
				} was not found. It may have already been deleted.`,
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		for (let i = 0; i < featureds.length; i++) {
			const v = featureds[i];
			await v.clearImages();
			await v.findByIdAndRemove(v.id || v._id);
		}

		let response = {
			response: featureds.forEach((v) =>
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
