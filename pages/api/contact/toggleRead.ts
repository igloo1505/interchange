import nc from "next-connect";
import Contact from "../../../models/Contact";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";

const handler = nc();
// const upload = uploadMiddleware("patron");
// handler.use(upload);

handler.post(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
	try {
		let { id, value } = req.body;
		await Contact.findByIdAndUpdate(id, {
			read: value,
		});
		return res.status(200).json({ success: true });
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
