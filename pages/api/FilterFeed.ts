import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import GeneralPost from "../../models/GeneralPost";
import Featured from "../../models/Featured";
import Volunteer from "../../models/Volunteer";
import Patron from "../../models/Patron";
import { sendError, ErrorResponse } from "../../types/ErrorResponse";
import connectDB from "../../utils/connectMongo";

const handler = nc();

const getTotal = (arr: any[]) => {
	let t = 0;
	for (let i = 0; i < arr.length; i++) {
		const arr2: any[] = arr[i];
		t += arr2.length;
	}
	return t;
};

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	let { search, page, perPage } = req.body;
	debugger;
	try {
		let generalPosts = await GeneralPost.find({
			$or: [
				{ title: { $regex: search, $options: "ix" } },
				{ description: { $regex: search, $options: "ix" } },
				{ location: { $regex: search, $options: "ix" } },
				{ url: { $regex: search, $options: "ix" } },
			],
		});
		let featureds = await Featured.find({
			$or: [
				{ title: { $regex: search, $options: "ix" } },
				{ description: { $regex: search, $options: "ix" } },
				{ location: { $regex: search, $options: "ix" } },
				{ url: { $regex: search, $options: "ix" } },
			],
		});
		let volunteers = await Volunteer.find({
			$or: [
				{ "name.first": { $regex: search, $options: "ix" } },
				{ "name.last": { $regex: search, $options: "ix" } },
				{ regularJob: { $regex: search, $options: "ix" } },
				{ description: { $regex: search, $options: "ix" } },
			],
		});
		let patrons = await Patron.find({
			$or: [
				{ "name.first": { $regex: search, $options: "ix" } },
				{ "name.last": { $regex: search, $options: "ix" } },
				{ quote: { $regex: search, $options: "ix" } },
				{ regularJob: { $regex: search, $options: "ix" } },
				{ description: { $regex: search, $options: "ix" } },
			],
		});
		let total = getTotal([generalPosts, featureds, volunteers, patrons]);
		let flat = [...generalPosts, ...featureds, ...volunteers, ...patrons].sort(
			(a, b) => {
				let _a = a.createdAt || a.datePosted;
				let _b = b.createdAt || b.datePosted;
				return _a - _b;
			}
		);
		let start = (page - 1) * perPage;
		let _finish = (page - 1) * perPage + perPage;
		let finish = _finish <= flat.length ? _finish : flat.length;
		let data = flat.slice(start, finish);
		console.log(`data: ${JSON.stringify(data, null, 2)}`.magenta);
		res.json({
			results: data,
			success: true,
		});
	} catch (error) {
		let e: ErrorResponse = {
			error: error,
			consoleMessage: "An error occurred filtering the main feed.",
		};
		return sendError(e, res);
	}
});

export default connectDB(handler);
