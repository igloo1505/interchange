const mongoose = require("mongoose");
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import "colors";
import { IncomingMessage, OutgoingMessage } from "http";
import * as firebase from "./initFirebase";

const connectDB =
	(handler: NextApiHandler) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		if (mongoose.connections[0].readyState) {
			return handler(req, res);
		}
		return mongoose
			.connect(process.env.MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(async () => {
				console.log("MongoDB connected".blue);
				return handler(req, res);
			});
	};

export default connectDB;

export const connectServerSide = (
	req: IncomingMessage,
	res: OutgoingMessage
) => {
	if (mongoose.connections[0].readyState) {
		return { req, res };
	}
	return mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(async () => {
			console.log("MongoDB connected".blue);
			return { req, res };
		});
};


export const connectMongo_minimal = (): boolean => {
	if (mongoose.connections[0].readyState) {
		return true
	}
	return mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(async () => {
			return true
		});	
}