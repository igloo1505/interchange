import nc from "next-connect";
import Patron from "../../../models/Patron";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../types/ErrorResponse";
import connectDB from "../../../utils/connectMongo";
import "colors";
import {
	multerUpload_middleware,
	multerFileType,
} from "../../../utils/imageHandler";
import { NextFunction } from "express-serve-static-core";
import multiparty from "multiparty";
import path from "path";
import { parsePhone } from "../../../utils/utilityFunctions";

const handler = nc();
// const upload = uploadMiddleware("patron");
handler.use(multerUpload_middleware.any());

handler.post(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
	try {
		let images = req.files?.map((f: multerFileType) => `${f.filename}`);
		let props = {
			...req.body,
			images: images,
		};
		if (props.phone) {
			let parsedPhone = parsePhone(props.phone);
			console.log("parsedPhone: ", parsedPhone);
			if (!parsedPhone) {
				let errorMessage: ErrorResponse = {
					error: "Invalid phone number",
					displayMessage: "You should probably check that phone number.",
					consoleMessage: `Invalid phone number: this.phone=${props.phone} parsedPhone=${parsedPhone}`,
					statusCode: 500,
				};
				return sendError(errorMessage, res);
			}
			props.phone = parsedPhone;
		}
		// let file = req?.file as CustomFileResult;
		// const { mimetype, originalname, image, placeholder, bucket } = file;
		// let x = await upload();
		let patron = new Patron({
			...props,
		});
		// let imageUrl = await upload(req);
		let savedpatron = await patron.save();
		res.json({
			result: savedpatron.toObject({
				getters: true,
				virtuals: true,
			}),
			success: true,
		});
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Something went wrong adding that patron.",
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
