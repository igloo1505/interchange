import * as Types from "./ReduxTypes";
import { createReducer } from "@reduxjs/toolkit";
import initState from "./initialState";
const initialState = initState.global;

const appReducer = createReducer(initialState, (builder) => {
	builder.addCase(
		"POPULATE_GLOBAL_DATA",
		(state, action: Types.POPULATE_GLOBAL_DATA) => {
			return {
				...state,
				...action.payload,
			};
		}
	);
});

export default appReducer;
