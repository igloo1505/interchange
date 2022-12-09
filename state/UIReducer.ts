// // import { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";
// import { AnyAction } from "redux";
import * as Types from "./ReduxTypes";
import { createReducer } from "@reduxjs/toolkit";
import initState from "./initialState";
const initialState = initState.UI;

const UIReducer = createReducer(initialState, (builder) => {
	/// @ts-ignore
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
	/// @ts-ignore
	builder.addCase(
		"TOGGLE_COLUMN_RIGHT_OPEN",
		(state, action: Types.TOGGLE_COLUMN_RIGHT_OPEN) => {
			return {
				...state,
				drawer: {
					...state.drawer,
					columnRightOpen:
						typeof action.payload === "undefined"
							? !state.drawer.columnRightOpen
							: action.payload,
				},
			};
		}
	);
	builder.addCase("SET_DIMENSIONS", (state, action: Types.SET_DIMENSIONS) => {
		return {
			...state,
			dimensions: {
				...state.dimensions,
				...action.payload,
			},
		};
	});
	builder.addCase(
		"SET_HIDE_COLUMN_RIGHT",
		(state, action: Types.SET_HIDE_COLUMN_RIGHT) => {
			return {
				...state,
				drawer: {
					...state.drawer,
					hideColumnRight:
						typeof action?.payload === "boolean"
							? action?.payload
							: !state.drawer.hideColumnRight,
				},
			};
		}
	);
});

export default UIReducer;
