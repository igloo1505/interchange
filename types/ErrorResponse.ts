import { NextApiResponse } from "next";

export type ErrorResponse = {
	displayMessage?: string;
	error: string | any;
	statusCode?: number;
	consoleMessage?: string;
};

const grievances = [
	"Lordy Lordy",
	"Goodness grief",
	"Oh. My. Lord.",
	"Oh Lord",
	"Pray for this application",
	"Jeepers Creepers",
];

export const sendError = (data: ErrorResponse, res: NextApiResponse) => {
	return res.status(data.statusCode || 500).json({
		displayMessage: data.displayMessage
			? `${
					grievances[Math.floor(Math.random() * grievances.length)]
			  }, ${data.displayMessage
					?.slice(0, 1)
					.toLowerCase()}${data.displayMessage?.slice(
					1,
					data.displayMessage.length - 1
			  )}`
			: null,
		consoleMessage: data.consoleMessage,
		error: data.error,
		success: false,
	});
};
