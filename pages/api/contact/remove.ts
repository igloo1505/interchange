import nc from "next-connect";
import Contact from "../../../models/Contact";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let contacts = [];
		let ids = req.body.id
			? [req.body.id]
			: req.body.ids
			? [...req.body.ids]
			: [];
		console.log("ids: ".red, ids);
		for (var i = 0; i < ids.length; i++) {
			let contact = await Contact.findById(ids[i]);
			/// @ts-ignore
			contacts.push(
				/// @ts-ignore
				contact.toObject({
					getters: true,
					virtuals: true,
				})
			);
		}
		if (contacts.length === 0) {
			let errorResponse: ErrorResponse = {
				error: "contact not found",
				displayMessage: `contact${
					ids.length > 1 && "s"
				} was not found. It may have already been deleted.`,
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}
		await contacts.forEach(
			/// @ts-ignore
			async (v) => await Contact.findByIdAndRemove(v.id || v._id)
		);

		let response = {
			response: contacts,
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
