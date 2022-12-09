import axios, { methodEnum } from "../utils/useAxios";
import ToastConfig from "../types/ToastConfig";
import store from "./store";
import * as Types from "./ReduxTypes";
import { Action } from "@reduxjs/toolkit";
import { ContactInterface } from "../models/Contact";
import { globalDataInterface } from "./initialState";

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
