import { globalDataInterface } from "../state/initialState";
import store from "../state/store";
const PER_PAGE = 10;
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
	surpass: boolean,
	page: number
): any => {
	// debugger;
	let data = surpass ? store.getState().global : _data;
	if (!page) page = 1;
	let add = {
		gen: data?.generalPosts && data?.generalPosts.length > 0,
		vol: data?.volunteers && data?.volunteers.length > 0,
		pat: data?.patrons && data?.patrons.length > 0,
	};
	let flat = [];
	if (add.gen) {
		///@ts-ignore
		flat = [...flat, ...data?.generalPosts];
	}
	if (add.vol) {
		///@ts-ignore
		flat = [...flat, ...data?.volunteers];
	}
	if (add.pat) {
		///@ts-ignore
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
		data: sorted.slice(
			(page - 1) * PER_PAGE,
			sorted.length >= page * PER_PAGE ? page * PER_PAGE : sorted.length
		),
		total: flat.length,
		...(page && { page: page }),
	};
};
