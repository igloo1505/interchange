const mongoose = require("mongoose");
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import "colors";

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
