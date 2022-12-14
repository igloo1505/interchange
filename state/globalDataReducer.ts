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
	builder.addCase("SET_FILTER_PAGE", (state, action: Types.SET_FILTER_PAGE) => {
		return {
			...state,
			feed: {
				...state.feed,
				page: action.payload,
			},
		};
	});
});

export default appReducer;
