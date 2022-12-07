import ToastConfig from "../types/ToastConfig";

const initialState = {
	UI: {
		toast: {} as ToastConfig,
		drawer: {
			isOpen: false,
		},
		dimensions: {
			navbar: {
				height: null as unknown as number,
			},
			viewport: {
				width: null as unknown as number,
				height: null as unknown as number,
			},
		},
	},
	app: {
		isLoading: false,
		error: null,
	},
};

export default initialState;
