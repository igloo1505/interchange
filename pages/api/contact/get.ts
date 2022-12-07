import nc from "next-connect";
import Contact from "../../../models/Contact";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";

const handler = nc();

handler.get(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
	try {
		let contacts: any[] = [];
		if (!req?.query.id) {
			contacts = await Contact.find()
				/// @ts-ignore
				.skip((Number(req.query?.page) - 1) * Number(req?.query?.perPage) || 0)
				/// @ts-ignore
				.limit(Number(req?.query?.perPage) || null)
				.collation({ locale: "en" })
				/// @ts-ignore
				.sort({
					[`${
						req.query?.sortField === "id" ? "received" : req.query?.sortField
					}`]: `${req.query?.sortOrder}`.toLowerCase(),
				});
		}
		if (req?.query.id && typeof req?.query.id !== "undefined") {
			let x = await Contact.findById(req.query.id);
			contacts.push(x);
		}
		if (req?.query.ids && typeof req?.query.ids !== "undefined") {
			let ids: string[] | string = req.query.ids;
			if (typeof ids === "string") ids = [ids];
			ids.map(async (_id) => {
				let x = await Contact.findById(_id);
				contacts.push(x);
			});
		}
		let total = await Contact.count();
		let data = contacts.map((v) => {
			return v.toObject({ getters: true, virtuals: true });
		});
		let result = { response: data, total: total, success: true };
		console.log(`returning: ${JSON.stringify(result, null, 2)}`.bgBlue.white);
		res.json(result);
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
