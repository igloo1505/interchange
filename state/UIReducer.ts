// // import { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";
// import { AnyAction } from "redux";
import * as Types from "./ReduxTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";
import initState from "./initialState";
import ToastConfig from "../types/ToastConfig";
const initialState = initState.UI;

const UIReducer = createReducer(initialState, (builder) => {
	builder.addCase("TOGGLE_DRAWER", (state, action: Types.TOGGLE_DRAWER) => {
		return {
			...state,
			drawer: {
				isOpen:
					typeof action.payload === "undefined"
						? !state.drawer.isOpen
						: action.payload,
			},
		};
	});
	builder.addCase("SET_DIMENSIONS", (state, action: Types.SET_DIMENSIONS) => {
		return {
			...state,
			dimensions: {
				...state.dimensions,
				...action.payload,
			},
		};
	});
});

export default UIReducer;
