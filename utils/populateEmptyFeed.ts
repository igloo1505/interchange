import { globalDataInterface } from "../state/initialState";
import store from "../state/store";

export const getFeedTotalLocally = () => {
	let data = store.getState().global;
	let total =
		data?.generalPosts?.length +
		data?.volunteers?.length +
		data?.patrons?.length;
	return total;
};

export const populateEmptyFeed = (
	_data: globalDataInterface | null,
	surpass: boolean
) => {
	let data = surpass ? store.getState().global : _data;
	let add = {
		gen: data?.generalPosts && data?.generalPosts.length > 0,
		vol: data?.volunteers && data?.volunteers.length > 0,
		pat: data?.patrons && data?.patrons.length > 0,
	};
	let flat = [];
	if (add.gen) {
		flat = [...flat, ...data?.generalPosts];
	}
	if (add.vol) {
		flat = [...flat, ...data?.volunteers];
	}
	if (add.pat) {
		flat = [...flat, ...data?.patrons];
	}
	let sorted = flat.sort((a, b) => {
		/// @ts-ignore
		let _a = a.datePosted || a.createdAt;
		/// @ts-ignore
		let _b = b.datePosted || b.createdAt;
		return _b - _a;
	});
	return {
		data: sorted.slice(0, sorted.length >= 10 ? 10 : sorted.length),
		total: flat.length,
	};
};
