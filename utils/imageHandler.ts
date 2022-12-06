import { NextApiRequest, NextApiResponse } from "next";
import { db } from "./initFirebase";
import multer, { DiskStorageOptions, Multer, MulterError } from "multer";
import { uuid } from "uuidv4";
import path from "path";
import { NextFunction } from "express-serve-static-core";

// const fileBuffer = await sharp(file.buffer)
// 	.resize({ height: 1920, width: 1080, fit: "contain" })
// 	.toBuffer();

export interface CustomFileResult extends Partial<Multer> {
	image: string;
	placeholder: string;
	bucket?: string;
}

export const multerUpload = async (
	req: NextApiRequest | any,
	res: NextApiResponse | any,
	cb: NextFunction
) => {
	let filename = `${uuid()}`;
	let options: DiskStorageOptions = {
		destination: function (req, file, cb) {
			cb(null, "./public/uploads/");
		},
		filename: function (req, file, cb) {
			cb(null, `${filename}${path.extname(file.originalname)}`);
		},
	};
	const upload = multer({
		storage: multer.diskStorage(options),
	});
	const uploader = await upload.single("image[rawFile]");
	await uploader(req, res, cb);
	return filename;
};

// export const upload = async (req: NextApiRequest): string => {
// 	// let req = multerUpload.single();
// 	return "";
// };
