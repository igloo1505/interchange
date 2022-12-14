import nc from "next-connect";
import AllowAccess from "../../../models/AllowAccess";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";
import { filterInvalid } from "../../../utils/checkIsValid";

const handler = nc();

handler.get(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
	try {
		let allows: any[] = [];
		if (!req?.query.id) {
			allows = await AllowAccess.find()
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
			let x = await AllowAccess.findById(req.query.id);
			allows.push(x);
		}
		if (req?.query.ids && typeof req?.query.ids !== "undefined") {
			let ids: string[] | string = req.query.ids;
			if (typeof ids === "string") ids = [ids];
			ids.map(async (_id) => {
				let x = await AllowAccess.findById(_id);
				allows.push(x);
			});
		}
		let total = await AllowAccess.count();
		let { _data, deleteCount } = await filterInvalid(allows);
		let data = _data.map((v) => {
			return v.toObject({ getters: true, virtuals: true });
		});
		let result = { response: data, total: total - deleteCount, success: true };
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
