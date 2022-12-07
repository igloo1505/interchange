interface detailsInterface {
	name: string;
	address: {
		main: {
			pantry: string;
			mailing: string;
		};
	};
	city: string;
	state: string;
	zip: number;
	phone: {
		value: number;
		display: string;
	};
	mapsHref: string;
}

const details: detailsInterface = {
	name: "Interchange Food Pantry",
	address: {
		main: {
			pantry: "130 E. Juneau Ave.",
			mailing: "1105 N. Waverly Place",
		},
	},
	city: "Milwaukee",
	state: "WI",
	zip: 53202,
	phone: {
		value: 14145512184,
		display: "(414) 551-2184",
	},
	mapsHref:
		"https://www.google.com/maps/place/Interchange+Food+Pantry/@43.0459119,-87.9120784,20.1z/data=!4m13!1m7!3m6!1s0x8805190cef8ac63f:0x9ed11f85840891af!2s130+E+Juneau+Ave,+Milwaukee,+WI+53202!3b1!8m2!3d43.0460713!4d-87.9120661!3m4!1s0x8805190ce564bf31:0xdab5a9226b2adc0b!8m2!3d43.0459852!4d-87.9121041",
};

export default details;
