// import { db } from "./initFirebase";
import multer, { Multer } from "multer";
import { uuid } from "uuidv4";
import path from "path";
import fs from "fs";

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

export const multerUpload_middleware = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, "./public/uploads");
		},
		filename: function (req, file, cb) {
			let filename = `${uuid()}`;
			cb(null, `${filename}${path.extname(file.originalname)}`);
		},
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
