import ToastConfig from "../types/ToastConfig";

const initialState = {
	UI: {
		toast: {} as ToastConfig,
		drawer: {
			isOpen: false,
		},
	},
	app: {
		isLoading: false,
		error: null,
	},
};

export default initialState;
