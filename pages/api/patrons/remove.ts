import nc from "next-connect";
import Patron from "../../../models/Patron";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	console.log("req.body: ", req.body);
	// const { id } = req.body;
	try {
		let patron = new Patron(req.body);
		let savedPatron = await patron.save();
		res.json({ contact: savedPatron, success: true });
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "something went wrong adding that patron.",
			statusCode: 500,
		};
		sendError(errorResponse, res);
	}
});

export default handler;
