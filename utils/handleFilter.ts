import { NextApiRequest } from "next";
import qs from "querystring";

const handleFilter = (req: NextApiRequest): object => {
	if (req.query.filter === "") {
		console.log("Returning filter {}");
		return {};
	}
	let _filter = { ...qs.parse(req.query.filter) };
	console.log("query123: ", _filter);
	if (typeof _filter !== "object") {
		return {};
	}
	let filter: any = {};

	if (_filter["name[first]"]) {
		filter["name.first"] = { $regex: _filter["name[first]"], $options: "gi" };
	}
	if (_filter["name[last]"]) {
		filter["name.last"] = { $regex: _filter["name[last]"], $options: "gi" };
	}
	if (_filter.email) {
		filter.email = { $regex: _filter.email, $options: "gi" };
	}
	console.log("returning filter: ", filter);
	return filter;
};

export default handleFilter;
