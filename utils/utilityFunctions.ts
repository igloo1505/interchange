import { KeyboardEvent } from "react";

;

export const numberOnlyKeyDown = (e: KeyboardEvent) => {
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
	];
	if (Number.isNaN(parseInt(e.key)) && allowedKeys.indexOf(e.key) < 0) {
		e.preventDefault();
		e.stopPropagation();
		return console.log("disallow", e.key);
	}
};
