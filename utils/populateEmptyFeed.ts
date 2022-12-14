import { globalDataInterface } from "../state/initialState";

export const populateEmptyFeed = (data: globalDataInterface) => {
	console.log("data: ", data);
	let flat = [...data.generalPosts, ...data.volunteers, ...data.patrons];
	let sorted = flat.sort((a, b) => {
		/// @ts-ignore
		let _a = a.datePosted || a.createdAt;
		/// @ts-ignore
		let _b = b.datePosted || b.createdAt;
		return _b - _a;
	});
	return sorted.slice(0, sorted.length >= 10 ? 10 : sorted.length);
};
