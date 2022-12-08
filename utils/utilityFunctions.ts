import { KeyboardEvent } from "react";

export const numberOnlyKeyDown = (extraKeys: string[]) => {
	let allowedKeys = [
		"Tab",
		"Backspace",
		"Shift",
		"ArrowLeft",
		"ArrowRight",
		"ArrowUp",
		"ArrowDown",
		"Meta",
		"Control",
		"Alt",
		"CapsLock",
		...extraKeys,
	];
	return (e: KeyboardEvent) => {
		if (Number.isNaN(parseInt(e.key)) && allowedKeys.indexOf(e.key) < 0) {
			e.preventDefault();
			e.stopPropagation();
			return console.log("disallow", e.key);
		}
	};
};

export const parsePhone = (val: string) => {
	let _v = val.replaceAll("-", "");
	const checkParse = (x: string) => {
		if (Number.isNaN(parseInt(x))) {
			return false;
		}
		return true;
	};
	let p = checkParse(_v);
	if (!p) {
		return false;
	}
	14145303108;
	if (_v.length === 7) {
		_v = `1414${_v}`;
	}
	if (_v.length === 10) {
		_v = `1${_v}`;
	}
	if (_v.length === 11 && checkParse(_v)) {
		return parseInt(_v);
	}
};

export enum pageEnum {
	about = "About",
	contact = "Contact",
	volunteer = "Volunteer",
	donate = "Donate",
	hoursAndLocation = "HoursAndLocation",
	resources = "Resources",
}

export const dayKeys = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];
export const dayValues = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];
