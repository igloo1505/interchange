import { MouseEventHandler } from "react";
import { createAction } from "@reduxjs/toolkit";
import ToastConfig from "../types/ToastConfig";
import { number } from "react-admin";
import { ContactInterface } from "../models/Contact";

export type SHOW_TOAST = { type: "SHOW_TOAST"; payload: ToastConfig };

export type TOGGLE_DRAWER = { type: "TOGGLE_DRAWER"; payload?: boolean };

export type HIDE_TOAST = { type: "HIDE_TOAST" };

export type SET_IS_LOADING = { type: "SET_IS_LOADING"; payload?: boolean };

export interface dimensionsInterface {
	navbar: {
		height: number;
	};
	viewport: {
		width: number;
		height: number;
	};
}

export type SET_DIMENSIONS = {
	type: "SET_DIMENSIONS";
	payload: dimensionsInterface;
};

export type SUBMIT_NEW_CONTACT = {
	type: "SUBMIT_NEW_CONTACT";
	payload: any;
};
export type SUBMIT_NEW_FAIL = {
	type: "SUBMIT_NEW_FAIL";
	payload: any;
};
