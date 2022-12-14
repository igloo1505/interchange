import axios, { methodEnum } from "../utils/useAxios";
import ToastConfig from "../types/ToastConfig";
import store from "./store";
import * as Types from "./ReduxTypes";
import { Action } from "@reduxjs/toolkit";
import { ContactInterface } from "../models/Contact";
import { globalDataInterface } from "./initialState";
import { populateEmptyFeed } from "../utils/populateEmptyFeed";

// export const showToast = (): Types.SHOW_TOAST => ({
// 	type: "SHOW_TOAST",
// 	payload: toastConfig,
// });

export const toggleColumnRight = (
	val?: boolean | null
): Types.TOGGLE_COLUMN_RIGHT_OPEN => ({
	type: "TOGGLE_COLUMN_RIGHT_OPEN",
	payload: val,
});

export const toggleDrawer = (shouldShow?: boolean): Types.TOGGLE_DRAWER => ({
	type: "TOGGLE_DRAWER",
	payload: shouldShow,
});
export const setHideRightColumn = (
	shouldShow?: boolean
): Types.SET_HIDE_COLUMN_RIGHT => ({
	type: "SET_HIDE_COLUMN_RIGHT",
	payload: shouldShow,
});

export const hideToast = (): Types.HIDE_TOAST => ({
	type: "HIDE_TOAST",
});

export const setDimensions = (
	h: Types.dimensionsInterface
): Types.SET_DIMENSIONS => ({
	type: "SET_DIMENSIONS",
	payload: h,
});

export const submitNewContact = async (data: FormData) => {
	let res = await axios({
		method: methodEnum.post,
		url: "/api/contact/add",
		data: data,
		headers: { "Content-Type": "multipart/form-data" },
	});
	if (res?.data.success) {
		store.dispatch({
			type: "SUBMIT_NEW_CONTACT",
			payload: res.data,
		});
		return true;
	}
	if (!res?.data.success) {
		store.dispatch({
			type: "SUBMIT_NEW_FAIL",
			payload: res.data,
		});
		return false;
	}
};

export const toggleRead = async (id: string, value: boolean) => {
	let res = await axios({
		method: methodEnum.post,
		url: "/api/contact/toggleRead",
		data: {
			id: id,
			value: value,
		},
	});
	if (res.data.success) {
		return true;
	}
	if (!res.data.success) {
		return false;
	}
};

export const populateGlobal = (
	data: globalDataInterface
): Types.POPULATE_GLOBAL_DATA => ({
	type: "POPULATE_GLOBAL_DATA",
	payload: data,
});

export const setFeedDataIndependently = (data?: {
	data: { data: any[]; page: number };
}) => {
	/// @ts-ignore
	let _data = data ? data : populateEmptyFeed(null, true, null);
	store.dispatch({
		type: "SET_FEED_INDEPENDENTLY",
		payload: {
			..._data,
		},
	});
};

export const filterFeed = async (
	query: string,
	_page?: number
	/// @ts-ignore
): Types.FILTER_FEED => {
	let page = _page || store.getState().global.feed.page;
	let res = await axios({
		method: methodEnum.post,
		url: "/api/FilterFeed",
		data: {
			search: query,
			page: page,
			perPage: 10,
		},
	});
	/// @ts-ignore
	if (res.data.success) {
		/// @ts-ignore
		return store.dispatch({
			type: "FILTER_FEED",
			payload: {
				data: res.data?.results,
				total: res.data?.total,
				query: query,
				page: _page,
			},
		});
	}
	if (!res.data.success) {
		console.log("Error");
		console.log(res);
	}
};

/// @ts-ignore
export const setFilterPage = (page: number): Types.SET_FILTER_PAGE => {
	store.dispatch({
		type: "SET_FILTER_PAGE",
		payload: page,
	});
};
