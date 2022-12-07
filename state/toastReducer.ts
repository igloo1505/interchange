// // import { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";
// import { AnyAction } from "redux";
import * as Types from "./ReduxTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";
import initState from "./initialState";
import ToastConfig from "../types/ToastConfig";
const initialState = initState.UI.toast;

const UIReducer = createReducer(initialState, (builder) => {
	builder.addCase(
		"SHOW_TOAST",
		(state: typeof initialState, action: Types.SHOW_TOAST) => {
			return {
				...state,
				message: action.payload.message,
				type: action.payload.type,
				delay: action.payload.delay,
			};
		}
	);
	builder.addCase("HIDE_TOAST", () => {
		return {
			...initialState,
		};
	});
	builder.addCase(
		"SUBMIT_NEW_CONTACT",
		(state: typeof initialState, action: Types.SUBMIT_NEW_CONTACT) => {
			let _toast = new ToastConfig(
				"success",
				"Thank you. Someone will be in touch.",
				500000
			);
			return {
				...state,
				_toast,
			};
		}
	);
});

export default UIReducer;
