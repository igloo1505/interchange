// // import { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";
// import { AnyAction } from "redux";
import * as Types from "./ReduxTypes";
import { createReducer } from "@reduxjs/toolkit";
import initState from "./initialState";
const initialState = initState.app;

const appReducer = createReducer(initialState, (builder) => {
	builder.addCase("SET_IS_LOADING", (state, action: Types.SET_IS_LOADING) => {
		return {
			...state,
			isLoading: action.payload || true,
		};
	});
});

export default appReducer;
