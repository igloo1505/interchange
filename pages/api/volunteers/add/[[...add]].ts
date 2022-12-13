import nc from "next-connect";
import Volunteer from "../../../../models/Volunteer";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../../../types/ErrorResponse";
import connectDB from "../../../../utils/connectMongo";
import "colors";
import { parsePhone } from "../../../../utils/utilityFunctions";
import {
	multerUpload_middleware,
	getImageFromReq,
} from "../../../../utils/imageHandler";
const handler = nc();
handler.use(multerUpload_middleware.any());

handler.post(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
	try {
		let images = await getImageFromReq(req, "Volunteer");
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
		let volunteer = new Volunteer({
			...props,
		});
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
