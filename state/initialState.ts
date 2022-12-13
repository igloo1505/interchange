import { FeaturedInterface } from "../models/Featured";
import { GeneralPostInterface } from "../models/GeneralPost";
import { PatronInterface } from "../models/Patron";
import { VolunteerInterface } from "../models/Volunteer";
import ToastConfig from "../types/ToastConfig";
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
	featuredPosts: FeaturedInterface[];
	generalPosts: GeneralPostInterface[];
	volunteers: VolunteerInterface[];
	patrons: PatronInterface[];
}

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
	global: {} as globalDataInterface,
};

export default initialState;
