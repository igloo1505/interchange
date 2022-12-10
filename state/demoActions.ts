import * as Types from "./ReduxTypes";

export const notifyDemoDonation = (
	amount: number
): Types.SHOW_DONATION_DEMO_TOAST => ({
	type: "SHOW_DONATION_DEMO_TOAST",
	payload: amount,
});
