import nc from "next-connect";
// import Volunteer from "../../models/Volunteer";
import Volunteer from "../../models/Volunteer";
import Patron from "../../models/Patron";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, sendError } from "../../types/ErrorResponse";
import connectDB from "../../utils/connectMongo";
import "colors";
import Featured from "../../models/Featured";
import { initFirebase } from "../../utils/initFirebase";
import { Storage } from "firebase-admin/lib/storage/storage";
import * as admin from "firebase-admin";
import { ImageInterface } from "../../utils/imageHandler";

const handler = nc();
let modelMap = {
	volunteers: Volunteer,
	patrons: Patron,
	featured: Featured,
};

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	// console.log(`req.body: ${req.body}`.bgGreen.black);
	try {
		let { id, resource, filename, path } = req.body;
		console.log("path: ", path);
		let m: any = modelMap[resource];
		let x = await m.findById(id);
		if (!x) {
			let _e: ErrorResponse = {
				error: "Model not found",
				consoleMessage: `Could not locate resource=${resource} id=${id}`,
				statusCode: 500,
			};
			return sendError(_e, res);
		}
		if (!x.image && !x.images) {
			let _e: ErrorResponse = {
				error: "Model does not have an image",
				consoleMessage: `Current model does not have image path resource=${resource} id=${id}`,
				statusCode: 500,
			};
			return sendError(_e, res);
		}
		const storage = await initFirebase();
		if (!storage) {
			let _e: ErrorResponse = {
				error: "Storage object not found",
				consoleMessage: "Storage not found",
				statusCode: 500,
			};
			return sendError(_e, res);
		}
		let file = storage.bucket().file(path);
		console.log("file: ", file);
		await file.delete();
		let updated = await m.findByIdAndUpdate(
			id,
			{
				images: x.images.filter((z: ImageInterface) => z.path !== path),
			},
			{
				new: true,
			}
		);
		console.log("data: ${data}".cyan);
		// await deleteObject(imgRef);

		res.json({ response: updated, success: true });
	} catch (error) {
		console.log("error: ", error);
		let errorResponse: ErrorResponse = {
			error: error,
			displayMessage: "Something went wrong updating that volunteer.",
			statusCode: 500,
		};
		sendError(errorResponse, res);
	}
});

export default connectDB(handler);
