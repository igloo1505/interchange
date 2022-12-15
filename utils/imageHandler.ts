// import { db } from "./initFirebase";
import multer, { Multer } from "multer";
import fs from "fs";
const FirebaseStorage = require("multer-firebase-storage");
import Volunteer from "../models/Volunteer";
import Patron from "../models/Patron";
import Featured from "../models/Featured";
import GeneralPost from "../models/GeneralPost";
import { NextApiRequest } from "next";
import { initFirebase } from "./initFirebase";

export interface ImageInterface {
	publicUrl: string;
	path: string;
}

export interface CustomFileResult extends Partial<Multer> {
	image: string;
	placeholder: string;
	bucket?: string;
}

export const acceptMimeTypes = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/webm",
];

// export const multerUpload_middleware = multer({
// 	storage: multer.diskStorage({
// 		destination: function (req, file, cb) {
// 			cb(null, "./public/uploads");
// 		},
// 		filename: function (req, file, cb) {
// 			let filename = `${uuid()}`;
// 			cb(null, `${filename}${path.extname(file.originalname)}`);
// 		},
// 	}),
// 	fileFilter(req, file, callback) {
// 		console.log("fileFilter: ", file);
// 		if (acceptMimeTypes.indexOf(file.mimetype) >= 0) {
// 			return callback(null, true);
// 		}
// 		return callback(null, false);
// 	},
// });
export const multerUpload_middleware = multer({
	storage: FirebaseStorage({
		bucketName: "interchange-4d029.appspot.com",
		credentials: {
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			/// @ts-ignore
			privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
		},
		public: true,
	}),
	fileFilter(req, file, callback) {
		console.log("fileFilter: ", file);
		if (acceptMimeTypes.indexOf(file.mimetype) >= 0) {
			return callback(null, true);
		}
		return callback(null, false);
	},
});

export interface multerFileType {
	destination: string;
	encoding: string;
	fieldname: string;
	filename: string;
	mimetype: string;
	originalname: string;
	path: string;
	size: number;
}

export const removeImage = async (filename: string) => {
	debugger;
	let p = `./public/uploads/${filename}`;
	console.log("p: ", p);
	console.log("fs.existsSync(p): ", fs.existsSync(p));
	if (fs.existsSync(p)) {
		await fs.unlink(p, (err) => console.log("error", err));
	}
	return;
};

export const getImageFromReq = async (
	req: any,
	model?: string,
	returnModel: boolean = false
) => {
	let modelMap = {
		["Volunteer"]: Volunteer,
		["Patron"]: Patron,
		["GeneralPost"]: GeneralPost,
		["FeaturedPost"]: Featured,
	};
	let images = req?.files?.map((f: multerFileType) => {
		/// @ts-ignore
		return { publicUrl: `${f.publicUrl}`, path: `${f.path}` };
	});
	/// @ts-ignore
	let isInMap = Object.keys(modelMap).indexOf(model) >= 0;
	debugger;
	if (!isInMap || !req?.body?.id) {
		return images;
	}
	if (isInMap && req.body?.id) {
		/// @ts-ignore
		let m = await modelMap[model].findById(req.body.id);
		if (!m) return images;
		let val = Array.isArray(m?.images) ? [...m.images, ...images] : images;
		if (returnModel) {
			return { images: val, model: m };
		}
		return val;
	}
};

export const handleUpdateWithImage = async (
	req: NextApiRequest,
	model: string
	/// @ts-ignore
): any => {
	debugger;
	let modelMap = {
		["Volunteer"]: Volunteer,
		["Patron"]: Patron,
		["GeneralPost"]: GeneralPost,
		["FeaturedPost"]: Featured,
	};
	let _m = modelMap[model];
	let body = req?.body;
	let { images, model: _model } = await getImageFromReq(req, model, true);
	let props = {
		...body,
		images: images,
	};
	debugger;
	let _x = await _m.findByIdAndUpdate(
		req.body?.id || req.body?._id || _model._id,
		{
			...props,
		},
		{
			new: true,
		}
	);
	return _x;
};

export const clearAllImages = async (model: any) => {
	let storage = initFirebase();
	if (!storage) return;
	for (let i = 0; i < model.images.length; i++) {
		const path = model.images[i].path;

		let file = storage.bucket().file(path);
		await file.delete();
	}
};
