import ToastConfig from "../types/ToastConfig";

const initialState = {
	UI: {
		toast: {} as ToastConfig,
		drawer: {
			isOpen: false,
			columnRightOpen: false,
			hideColumnRight: true,
		},
		dimensions: {
			navbar: {
				height: null as unknown as number,
			},
			viewport: {
				width: null as unknown as number,
				height: null as unknown as number,
			},
			columnRight: {
				width: null as unknown as number,
			},
			scrollbar: 0,
		},
	},
	app: {
		isLoading: false,
		error: null,
	},
	global: {
		hours: {},
	},
};

export default initialState;

export interface globalDataInterface {
	hours: {
		mon?: {
			open: string;
			close: string;
		};
		tue?: {
			open: string;
			close: string;
		};
		wed?: {
			open: string;
			close: string;
		};
		thur?: {
			open: string;
			close: string;
		};
		fri?: {
			open: string;
			close: string;
		};
		sat?: {
			open: string;
			close: string;
		};
		sun?: {
			open: string;
			close: string;
		};
	};
}
