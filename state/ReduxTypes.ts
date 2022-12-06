import { MouseEventHandler } from "react";
import { createAction } from "@reduxjs/toolkit";
import ToastConfig from "../types/ToastConfig";

export type SHOW_TOAST = { type: "SHOW_TOAST"; payload: ToastConfig };

export type TOGGLE_DRAWER = { type: "TOGGLE_DRAWER"; payload?: boolean };

export type HIDE_TOAST = { type: "HIDE_TOAST" };

export type SET_IS_LOADING = { type: "SET_IS_LOADING"; payload?: boolean };
