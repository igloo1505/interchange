import nc from "next-connect";
import Volunteer, { VolunteerInterface } from "../../../../models/Volunteer";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../../types/ErrorResponse";
import connectDB from "../../../../utils/connectMongo";
import "colors";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(
		`stringified req.query: ${JSON.stringify(req.query, null, 2)}`.cyan
	);
	try {
		let volunteers: any[] = [];
		if (!req?.query.id) {
			volunteers = await Volunteer.find()
				/// @ts-ignore
				.skip((Number(req.query?.page) - 1) * Number(req?.query?.perPage) || 0)
				/// @ts-ignore
				.limit(Number(req?.query?.perPage) || null)
				.collation({ locale: "en" })
				/// @ts-ignore
				.sort({
					[`${
						req.query?.sortField === "id" ? "name.last" : req.query?.sortField
					}`]: `${req.query?.sortOrder}`.toLowerCase(),
				});
		}
		if (req?.query.id && typeof req?.query.id !== "undefined") {
			let x = await Volunteer.findById(req.query.id);
			volunteers.push(x);
		}
		if (req?.query.ids && typeof req?.query.ids !== "undefined") {
			let ids: string[] | string = req.query.ids;
			if (typeof ids === "string") ids = [ids];
			ids.map(async (_id) => {
				let x = await Volunteer.findById(_id);
				volunteers.push(x);
			});
		}
		let total = await Volunteer.count();

		let data = volunteers.map((v) => {
			return v.toObject({ getters: true, virtuals: true });
		});
		let result = { response: data, total: total, success: true };
		console.log(`returning: ${JSON.stringify(result, null, 2)}`.bgBlue.white);
		res.json(result);
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Something went wrong retrieving volunteers.",
			statusCode: 500,
		};
		sendError(errorResponse, res);
	}
});

export default connectDB(handler);
