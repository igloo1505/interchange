import nc from "next-connect";
import connectDB from "../../utils/connectMongo";
import { seedAll } from "../../seed/seeder";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let allSeeded: any[] = await seedAll();
		for (let i = 0; i < allSeeded.length; i++) {
			const s = allSeeded[i];
			console.log(JSON.stringify(s, null, 2));
		}
		res.json({ success: true, data: allSeeded });
	} catch (error) {
		console.log("error", error);
	}
});

export default connectDB(handler);
