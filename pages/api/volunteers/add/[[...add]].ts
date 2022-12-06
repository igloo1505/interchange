import nc from "next-connect";
import Volunteer from "../../../../models/Volunteer";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../../types/ErrorResponse";
import connectDB from "../../../../utils/connectMongo";
import "colors";
import { multerUpload } from "../../../../utils/imageHandler";
import { NextFunction } from "express-serve-static-core";
import multiparty from "multiparty";
import path from "path";
import { parsePhone } from "../../../../utils/utilityFunctions";

const handler = nc();
// const upload = uploadMiddleware("Volunteer");
// handler.use(upload);

handler.post(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
	try {
		const nextFunc: NextFunction = (err) => {
			if (err) {
				console.log("There was an error uploading the image.");
			}
			console.log("Upload success!".bgMagenta.white);
		};
		let imageUrl = await multerUpload(req, res, nextFunc);
		console.log("imageUrl: ", imageUrl);
		const form = new multiparty.Form();
		const data: any = await new Promise((resolve, reject) => {
			form.parse(req, function (err, fields, files) {
				if (err) reject({ err });
				resolve({ fields, files });
			});
		});
		let _ext = path.extname(data.fields["image[title]"][0]);
		if (_ext) imageUrl = `${imageUrl}${_ext}`;
		let props =
			req.body?.image && imageUrl
				? {
						...req.body,
						image: imageUrl,
				  }
				: { ...req.body };
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
		let volunteer = new Volunteer({
			...props,
		});
		await volunteer.vali;
		// let imageUrl = await upload(req);
		let savedVolunteer = await volunteer.save();
		res.json({
			result: savedVolunteer.toObject({
				getters: true,
				virtuals: true,
			}),
			success: true,
		});
	} catch (error) {
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Something went wrong adding that volunteer.",
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
