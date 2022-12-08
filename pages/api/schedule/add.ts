import nc from "next-connect";
import Hours from "../../../models/Hours";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";
import multiparty from "multiparty";
import multer from "multer";
import Daily from "../../../models/Daily";
import { string } from "yup";
import { Model, Schema } from "mongoose";
let days = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];

const handler = nc();
// const upload = uploadMiddleware("patron");
// handler.use(upload);

handler.post(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
	try {
		const form = new multiparty.Form();
		const _data: any = await new Promise((resolve, reject) => {
			form.parse(req, function (err, fields, files) {
				if (err) reject({ err });
				resolve({ fields, files });
			});
		});
		interface MInterface {
			key: string;
			model: typeof Daily;
		}
		let dailyModels: MInterface[] = [];
		let fields = _data.fields;
		debugger;

		const parseDate = (key: string) => {
			// if (!fields[`${key}[open]`][0] || !fields[`${key}[close]`][0])
			let o = new Date(fields?.[`${key}[open]`]?.[0]) || false;
			let c = new Date(fields?.[`${key}[close]`]?.[0]) || false;
			if (o && c) {
				let _o = `${
					o.getHours() > 12 ? o.getHours() - 12 : o.getHours()
				}:${o.getHours()} ${o.getHours() > 12 ? "pm" : "am"}`;
				let _c = `${
					c.getHours() > 12 ? c.getHours() - 12 : c.getHours()
				}:${c.getHours()} ${c.getHours() > 12 ? "pm" : "am"}`;
				let newDaily = new Daily({
					open: _o,
					close: _c,
				});
				dailyModels.push({
					key: key,
					model: newDaily,
				});
			}
		};

		for (let z = 0; z < days.length; z++) {
			parseDate(days[z]);
		}

		console.log("_data: ", _data);
		let assembled = {};
		for (let i = 0; i < dailyModels.length; i++) {
			let m = dailyModels[i];
			/// @ts-ignore
			let savedDaily = await m.model.save();
			/// @ts-ignore
			assembled[m.key] = savedDaily._id;
		}
		console.log("assembled: ", assembled);
		let newHourModel = new Hours(assembled);

		if (!newHourModel) {
			let errorResponse: ErrorResponse = {
				error: "Failed creating Schedule model.",
				displayMessage: "Sorry. Something went wrong.",
				statusCode: 500,
			};
			return sendError(errorResponse, res);
		}

		let savedHourModel = await newHourModel.save();

		res.json({
			result: savedHourModel.toObject({
				getters: true,
				virtuals: true,
			}),
			success: true,
		});
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

export const config = {
	api: {
		bodyParser: false,
	},
};
