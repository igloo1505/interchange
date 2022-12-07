const handleFilter = (_filter: any = {}) => {
	let keys = Object.keys(_filter);
	let filter: any = {};
	// _filter.name && (filter.name = { $regex: new RegExp(_filter.name, "gi") });
	// _filter.email && (filter.email = { $regex: new RegExp(_filter.email, "gi") });
	// if (_filter.name) {
	// 	filter.name = { $regex: _filter.name, $options: "gi" };
	// }
	if (_filter.name.first) {
		if (!filter.name) {
			filter.name = {};
		}
		filter.name.first = { $regex: _filter.name, $options: "gi" };
	}
	if (_filter.name.last) {
		if (!filter.name) {
			filter.name = {};
		}
		filter.name.last = { $regex: _filter.name, $options: "gi" };
	}
	if (_filter.email) {
		filter.email = { $regex: _filter.email, $options: "gi" };
	}
	console.log("returning filter: ", filter);
	return filter;
};

export default handleFilter;
