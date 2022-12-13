import nc from "next-connect";
import GeneralPost from "../../../models/GeneralPost";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";
import handleFilter from "../../../utils/handleFilter";
import { filterInvalid } from "../../../utils/checkIsValid";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(
		`stringified req.query: ${JSON.stringify(req.query, null, 2)}`.cyan
	);
	try {
		let generalPosts: any[] = [];
		const filter = handleFilter(req);
		let total = await GeneralPost.count();
		if (!req?.query.id) {
			generalPosts = await GeneralPost.find(filter)
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
			let x = await GeneralPost.findById(req.query.id);
			generalPosts.push(x);
		}
		if (req?.query.ids && typeof req?.query.ids !== "undefined") {
			let ids: string[] | string = req.query.ids;
			if (typeof ids === "string") ids = [ids];
			ids.map(async (_id) => {
				let x = await GeneralPost.findById(_id);
				generalPosts.push(x);
			});
		}
		let { _data, deleteCount } = await filterInvalid(generalPosts);
		let data = _data.map((v) => {
			return v.toObject({ getters: true, virtuals: true });
		});

		let result = {
			response: data,
			total: total - deleteCount,
			success: true,
		};
		console.log(`returning: ${JSON.stringify(result, null, 2)}`.bgBlue.white);
		res.json(result);
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Something went wrong retrieving patrons.",
			statusCode: 500,
		};
		sendError(errorResponse, res);
	}
});

export default connectDB(handler);
