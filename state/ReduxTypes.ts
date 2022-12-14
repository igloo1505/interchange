import { globalDataInterface } from "./initialState";
import { VolunteerInterface } from "../models/Volunteer";
import { PatronInterface } from "../models/Patron";
import { FeaturedInterface } from "../models/Featured";
import { GeneralPostInterface } from "../models/GeneralPost";
import ToastConfig from "../types/ToastConfig";

export type SHOW_TOAST = { type: "SHOW_TOAST"; payload: ToastConfig };

export type TOGGLE_DRAWER = { type: "TOGGLE_DRAWER"; payload?: boolean };

export type HIDE_TOAST = { type: "HIDE_TOAST" };

export type SET_IS_LOADING = { type: "SET_IS_LOADING"; payload?: boolean };

export type SET_HIDE_COLUMN_RIGHT = {
	type: "SET_HIDE_COLUMN_RIGHT";
	payload?: boolean;
};

export interface dimensionsInterface {
	navbar: {
		height: number;
	};
	viewport: {
		width: number;
		height: number;
	};
	columnRight: {
		width: number;
	};
	scrollbar: number;
}

export type SET_DIMENSIONS = {
	type: "SET_DIMENSIONS";
	payload: dimensionsInterface;
};
export type TOGGLE_COLUMN_RIGHT_OPEN = {
	type: "TOGGLE_COLUMN_RIGHT_OPEN";
	payload?: boolean | null;
};

export type SUBMIT_NEW_CONTACT = {
	type: "SUBMIT_NEW_CONTACT";
	payload: any;
};
export type SUBMIT_NEW_FAIL = {
	type: "SUBMIT_NEW_FAIL";
	payload: any;
};

// Populate
export type POPULATE_GLOBAL_DATA = {
	type: "POPULATE_GLOBAL_DATA";
	payload: globalDataInterface;
};

export type SHOW_DONATION_DEMO_TOAST = {
	type: "SHOW_DONATION_DEMO_TOAST";
	payload: number;
};
export type FILTER_FEED = {
	type: "FILTER_FEED";
	payload: Array<
		| VolunteerInterface
		| PatronInterface
		| FeaturedInterface
		| GeneralPostInterface
	>;
};

export type SET_FILTER_PAGE = {
	type: "SET_FILTER_PAGE";
	payload: number;
};
